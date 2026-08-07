import { createFileRoute } from "@tanstack/react-router";
import { services } from "../../lib/data/services";

// In-memory rate limiter cache
const ipCache = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 20;

  const timestamps = ipCache.get(ip) || [];
  // Filter out timestamps older than the window
  const activeTimestamps = timestamps.filter((t) => now - t < windowMs);
  
  if (activeTimestamps.length >= maxRequests) {
    return true;
  }

  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return false;
}

export const Route = createFileRoute("/api/ask-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 1. Check Rate Limiting
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
        if (isRateLimited(ip)) {
          return new Response(JSON.stringify({ error: "Too many requests. Please try again in 10 minutes." }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          // 2. Parse Body and Validate
          const body = (await request.json()) as {
            messages?: Array<{ role: "user" | "assistant"; content: string }>;
            slug?: string;
          };

          if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return new Response(JSON.stringify({ error: "Messages array is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Validate last message length
          const lastMessage = body.messages[body.messages.length - 1];
          if (!lastMessage || !lastMessage.content || lastMessage.content.length > 1000) {
            return new Response(JSON.stringify({ error: "Message content must be present and under 1000 characters." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // 3. Grounding Context
          let contextData = "";
          const slug = body.slug;
          const service = slug ? services.find((s) => s.slug === slug) : null;

          if (service) {
            contextData = `The visitor is currently viewing the page for:
Service Name: ${service.name}
One-liner description: ${service.oneLiner}
Overview: ${service.overview}
Capabilities: ${service.capabilities.join(", ")}
Timeline: ${service.timeline}
Team Size: ${service.teamSize}
Tech Stack: ${service.techStack.join(", ")}
Industries Served: ${service.industriesServed.join(", ")}`;
          } else {
            const condensed = services.map(
              (s) => `* Service: ${s.name}
  Slug: ${s.slug}
  One-liner: ${s.oneLiner}
  Timeline: ${s.timeline}
  Team Size: ${s.teamSize}
  Tech Stack: ${s.techStack.join(", ")}`
            ).join("\n\n");
            contextData = `Here is a summary of all 15 services we offer:\n\n${condensed}`;
          }

          const systemPrompt = `You are the Meridian Systems AI Assistant, a professional, concise, and helpful sales-adjacent assistant.
Your goal is to answer visitor questions about our services.

Here is the exact data for our services:
${contextData}

SYSTEM PROMPT RULES (Strict compliance required):
1. Only state timelines, team sizes, and tech stacks that appear in the provided data. NEVER invent, extrapolate, or estimate numbers, technologies, or capabilities that are not explicitly stated above.
2. If asked something not covered by the data (such as specific pricing, case studies not mentioned, custom guarantees, or discounts), respond honestly that you don't have that detail and offer to connect them with our team.
3. Keep answers concise, clear, and professional. This is a sales-adjacent tool, not a general chatbot.
4. If the user expresses buying intent (e.g. asking about pricing, asking for custom timelines on their project, wanting to talk to someone/get a quote), encourage them to provide their contact information in the lead form that will appear in this chat panel or suggest visiting our contact page.`;

          // 4. API Key Check and Call Anthropic or Mock Fallback
          const apiKey = process.env.ANTHROPIC_API_KEY;
          const isMockKey = !apiKey || apiKey === "mock-anthropic-key-change-me";

          if (isMockKey) {
            // Generate a grounding-accurate mock response for testing/evaluation
            const query = lastMessage.content.toLowerCase();
            let reply = "";

            if (query.includes("mobile") || query.includes("android") || query.includes("ios") || query.includes("app")) {
              reply = "Yes, we build native iOS apps (10–16 weeks using Swift/SwiftUI) and native Android apps (10–16 weeks using Kotlin/Jetpack Compose). We also build Cross-Platform apps (10–18 weeks using React Native). Would you like to connect with our team to discuss your project?";
            } else if (query.includes("erp") || query.includes("enterprise")) {
              reply = "We offer Enterprise ERP Solutions (timeline: 12–20 weeks, using SAP, Odoo, custom REST APIs, and PostgreSQL). This includes modules configuration, data migration, and requirements mapping. Let me know if you would like a scoping call.";
            } else if (query.includes("price") || query.includes("cost") || query.includes("pricing") || query.includes("quote")) {
              reply = "I don't have specific pricing details since pricing depends on project scope, but I can connect you with our team for a custom quote. Please provide your email and project details in the form that will appear next.";
            } else if (query.includes("timeline") || query.includes("time") || query.includes("how long")) {
              if (service) {
                reply = `For our ${service.name}, the typical timeline is ${service.timeline}. For a custom timeline on your specific project, I can connect you with one of our engineers.`;
              } else {
                reply = "Typical timelines range from 6 to 12 weeks for websites to 12 to 20 weeks for Enterprise ERP systems. What kind of project are you looking to build?";
              }
            } else if (service) {
              reply = `Regarding our ${service.name}: it features ${service.oneLiner}. Typical timeline is ${service.timeline} with a team of ${service.teamSize}. Tech stack includes: ${service.techStack.join(", ")}. How can I help you with this service?`;
            } else {
              reply = "Meridian Systems offers custom enterprise software development, including Cloud DevOps, ERP systems, Web Applications, Database Architecture, and AI Automations. Let me know if you want to know more about a specific service or request a consultation.";
            }

            // Simulate slight delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            return new Response(JSON.stringify({ text: reply }), {
              headers: { "Content-Type": "application/json" },
            });
          }

          // Call Anthropic API
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": apiKey || "",
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-3-5-sonnet-20241022",
              max_tokens: 1000,
              system: systemPrompt,
              messages: body.messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            }),
          });

          if (!response.ok) {
            const errBody = await response.text();
            console.error("Anthropic API Error:", errBody);
            return new Response(JSON.stringify({ error: "Failed to communicate with AI provider" }), {
              status: 502,
              headers: { "Content-Type": "application/json" },
            });
          }

          const data = (await response.json()) as {
            content: Array<{ type: "text"; text: string }>;
          };

          const text = data.content?.[0]?.text || "I was unable to generate a response. Please try again.";

          return new Response(JSON.stringify({ text }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("Ask AI Endpoint Error:", error);
          return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
