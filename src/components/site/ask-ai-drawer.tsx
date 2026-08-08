import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Send, Sparkles, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { services } from "@/lib/data/services";

type Message =
  | { id: string; role: "user" | "assistant"; content: string; type: "text" }
  | { id: string; role: "assistant"; type: "lead-form"; submitted: boolean };

interface AskAIDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AskAIDrawer({ open, onClose }: AskAIDrawerProps) {
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Messages log
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      type: "text",
      content:
        "Hi! I'm the Meridian Systems assistant. I can answer questions about our ERP, mobile apps, database architecture, DevOps, or AI workflows. What are you looking to build?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<"none" | "rate-limit" | "generic">("none");

  // Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [leadTouched, setLeadTouched] = useState<Record<string, boolean>>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [hasTriggeredForm, setHasTriggeredForm] = useState(false);

  const validateLeadEmail = (val: string) => {
    if (!val.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return "Invalid email format.";
    return "";
  };

  const handleLeadEmailBlur = () => {
    setLeadTouched((prev) => ({ ...prev, email: true }));
    const error = validateLeadEmail(leadForm.email);
    setLeadErrors((prev) => ({ ...prev, email: error }));
  };

  const handleLeadEmailChange = (val: string) => {
    setLeadForm((prev) => ({ ...prev, email: val }));
    if (leadTouched["email"]) {
      const error = validateLeadEmail(val);
      setLeadErrors((prev) => ({ ...prev, email: error }));
    }
  };

  // Determine current service slug from URL path
  const pathParts = location.pathname.split("/");
  const currentServiceSlug = pathParts[1] === "services" && pathParts[2] ? pathParts[2] : undefined;
  const currentService = currentServiceSlug
    ? services.find((s) => s.slug === currentServiceSlug)
    : undefined;

  // Suggested Prompts based on page context
  const getSuggestedPrompts = () => {
    if (currentService) {
      return [
        `What is the timeline for ${currentService.name}?`,
        `What tech stack do you use for ${currentService.name}?`,
        `I need a custom quote for ${currentService.name}`,
      ];
    }
    return [
      "Do you do mobile app development?",
      "What is your typical cloud migration timeline?",
      "How do I book a systems consultation?",
    ];
  };

  // Auto-scroll to bottom of chat log
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus trap and escape key handler
  useEffect(() => {
    if (!open) return;

    // Focus input on open
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  // Check user input for buying intent
  const detectBuyingIntent = (text: string): boolean => {
    const query = text.toLowerCase();
    const pricingKeywords = [
      "price",
      "pricing",
      "cost",
      "how much",
      "quote",
      "rates",
      "budget",
      "pricing details",
      "estimate",
    ];
    const directKeywords = [
      "talk to",
      "contact",
      "hire",
      "get in touch",
      "schedule",
      "book a",
      "call you",
      "consultation",
      "email you",
    ];

    if (pricingKeywords.some((kw) => query.includes(kw))) return true;
    if (directKeywords.some((kw) => query.includes(kw))) return true;

    // Specific timeline query
    if (
      query.includes("timeline") &&
      (query.includes("my") || query.includes("our") || query.includes("specific"))
    ) {
      return true;
    }

    return false;
  };

  // Handle message send
  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setApiError("none");
    const userMessageId = `msg-${Date.now()}`;
    const newMessages = [
      ...messages,
      { id: userMessageId, role: "user" as const, type: "text" as const, content: text },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    // Intent detection (only trigger form once per session)
    const matchesIntent = detectBuyingIntent(text);
    const shouldTriggerForm = matchesIntent && !hasTriggeredForm;

    try {
      // Build API request message body
      const apiMessages = newMessages
        .filter((m) => m.type === "text")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content as string,
        }));

      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          slug: currentServiceSlug,
        }),
      });

      if (res.status === 429) {
        setApiError("rate-limit");
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("API failed");
      }

      const data = (await res.json()) as { text: string };

      if (shouldTriggerForm) {
        setHasTriggeredForm(true);
        // Pre-fill form details
        setLeadForm((prev) => ({
          ...prev,
          message: text,
          projectType: currentService ? currentService.slug : "cloud",
        }));

        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            type: "text",
            content: data.text,
          },
          {
            id: `form-${Date.now()}`,
            role: "assistant",
            type: "lead-form",
            submitted: false,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            type: "text",
            content: data.text,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setApiError("generic");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Lead Capture Form
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadTouched((prev) => ({ ...prev, email: true }));
    const error = validateLeadEmail(leadForm.email);
    if (error) {
      setLeadErrors((prev) => ({ ...prev, email: error }));
      return;
    }

    setIsSubmittingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          project_type: leadForm.projectType,
          message: leadForm.message,
          source: "ask_ai",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit lead");
      }

      // Mark form as submitted
      setMessages((prev) =>
        prev.map((msg) => (msg.type === "lead-form" ? { ...msg, submitted: true } : msg)),
      );

      // Assistant acknowledges form submission
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-confirm-${Date.now()}`,
          role: "assistant",
          type: "text",
          content: "Thanks — someone from our team will follow up shortly.",
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit form. Please try again or use our contact page.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Ask AI Panel"
    >
      {/* Overlay backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-[1px] transition-opacity animate-fade-in"
      />

      {/* Drawer content */}
      <div
        ref={drawerRef}
        className="relative z-50 flex h-full w-full flex-col border-l border-border bg-background shadow-2xl transition-transform animate-slide-in-right sm:max-w-md md:max-w-[480px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-sky" />
            <span className="font-display font-semibold text-foreground text-[15px]">
              Ask AI Assistant
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Ask AI panel"
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-secondary-foreground hover:text-foreground transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Chat Area */}
        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scrollbar-thin"
        >
          {messages.map((msg) => {
            if (msg.type === "text") {
              const isUser = msg.role === "user";
              return (
                <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-4 text-[14px] leading-[1.5] ${
                      isUser
                        ? "bg-surface text-foreground border border-border"
                        : "bg-surface/40 text-foreground border border-border/80"
                    }`}
                  >
                    {!isUser && (
                      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-sky uppercase">
                        <Sparkles size={10} />
                        Meridian AI
                      </div>
                    )}
                    <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
                </div>
              );
            }

            // Lead Capture Form
            if (msg.type === "lead-form") {
              return (
                <div key={msg.id} className="flex justify-start w-full">
                  <div className="w-full max-w-[90%] rounded-lg border border-sky/30 bg-surface/30 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={13} className="text-sky" />
                      <h4 className="text-[13.5px] font-semibold">Consultation Lead Capture</h4>
                    </div>

                    {msg.submitted ? (
                      <div className="rounded border border-border bg-background p-3 text-[13px] text-center text-secondary-foreground font-medium">
                        Details submitted successfully!
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="space-y-4" noValidate>
                        <div>
                          <label
                            htmlFor="lead-name"
                            className="text-[11.5px] font-medium text-secondary-foreground"
                          >
                            Full name
                          </label>
                          <input
                            id="lead-name"
                            type="text"
                            placeholder="Alex Moreau"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className="mt-1 h-[36px] w-full rounded-md border border-border bg-background px-3 text-[13px] outline-none focus-visible:border-sky"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lead-email"
                            className="text-[11.5px] font-medium text-secondary-foreground"
                          >
                            Work email *
                          </label>
                          <input
                            id="lead-email"
                            type="email"
                            placeholder="alex@company.com"
                            value={leadForm.email}
                            onChange={(e) => handleLeadEmailChange(e.target.value)}
                            onBlur={handleLeadEmailBlur}
                            className={`mt-1 h-[36px] w-full rounded-md border bg-background px-3 text-[13px] outline-none transition-colors focus-visible:border-sky ${
                              leadTouched["email"] && leadErrors["email"]
                                ? "border-destructive focus-visible:border-destructive"
                                : "border-border"
                            }`}
                          />
                          {leadTouched["email"] && leadErrors["email"] && (
                            <p className="mt-1 text-[11.5px] text-destructive font-semibold">
                              {leadErrors["email"]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="lead-project"
                            className="text-[11.5px] font-medium text-secondary-foreground"
                          >
                            Project Type
                          </label>
                          <select
                            id="lead-project"
                            value={leadForm.projectType}
                            onChange={(e) =>
                              setLeadForm({ ...leadForm, projectType: e.target.value })
                            }
                            className="mt-1 h-[36px] w-full rounded-md border border-border bg-background px-3 text-[13px] outline-none focus-visible:border-sky text-foreground"
                          >
                            <option value="cloud">Cloud Infrastructure</option>
                            <option value="data">Database & Data Platform</option>
                            <option value="ai">AI Automation & Workflows</option>
                            <option value="enterprise-erp">Enterprise ERP</option>
                            <option value="custom-website-development">Website Development</option>
                            <option value="web-applications">Web Applications</option>
                            <option value="mobile-apps">Mobile Apps</option>
                            <option value="other">Other Development</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="lead-message"
                            className="text-[11.5px] font-medium text-secondary-foreground"
                          >
                            How can we help?
                          </label>
                          <textarea
                            id="lead-message"
                            rows={3}
                            placeholder="A short description of your project constraint..."
                            value={leadForm.message}
                            onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                            className="mt-1 w-full rounded-md border border-border bg-background p-2.5 text-[13px] outline-none focus-visible:border-sky"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className="btn-base btn-primary with-arrow w-full py-2 text-[12px] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingLead ? (
                            <>
                              <Loader2 size={13} className="animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Submit Details
                              <ArrowRight size={12} className="btn-arrow" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg border border-border/80 bg-surface/30 px-4 py-3 flex items-center gap-1.5 text-secondary-foreground">
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sky animate-bounce"
                    style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sky animate-bounce"
                    style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sky animate-bounce"
                    style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
                  />
                </div>
                <span className="text-[11.5px] font-medium tracking-wide uppercase text-muted-foreground ml-1.5">
                  AI is thinking
                </span>
              </div>
            </div>
          )}

          {/* Error Message Fallback */}
          {apiError === "rate-limit" && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-[13px] text-foreground animate-fade-in">
              <p className="font-semibold text-destructive">Rate limit reached</p>
              <p className="mt-1 text-secondary-foreground text-[12.5px]">
                You've reached the limit for now — try again in a few minutes, or use the{" "}
                <a
                  href="/contact"
                  onClick={onClose}
                  className="text-sky hover:underline font-semibold"
                >
                  contact form
                </a>
                .
              </p>
            </div>
          )}

          {apiError === "generic" && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-[13px] text-foreground animate-fade-in">
              <p className="font-semibold text-destructive">Connection error</p>
              <p className="mt-1 text-secondary-foreground text-[12.5px]">
                Having trouble answering right now — try the{" "}
                <a
                  href="/contact"
                  onClick={onClose}
                  className="text-sky hover:underline font-semibold"
                >
                  contact form
                </a>
                .
              </p>
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length === 1 && !isLoading && (
          <div className="px-5 pb-3">
            <p className="text-[11.5px] font-semibold text-secondary-foreground mb-2">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {getSuggestedPrompts().map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-left text-[12px] font-medium text-foreground hover:border-sky transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="border-t border-border bg-background p-4"
        >
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              maxLength={1000}
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="h-[42px] w-full rounded-md border border-border bg-background pl-3 pr-12 text-[14px] outline-none focus-visible:border-sky disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="absolute right-1.5 grid h-[30px] w-[30px] place-items-center rounded-md bg-navy text-navy-foreground hover:bg-navy/95 transition-colors disabled:opacity-30 cursor-pointer"
            >
              <Send size={13} />
            </button>
          </div>
          <div className="mt-2 text-right text-[10px] text-muted-foreground">
            {inputValue.length}/1000 chars
          </div>
        </form>
      </div>
    </div>
  );
}
