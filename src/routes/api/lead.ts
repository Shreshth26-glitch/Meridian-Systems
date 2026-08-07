import { createFileRoute } from "@tanstack/react-router";
import pool from "../../lib/db";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            name?: string;
            first_name?: string;
            last_name?: string;
            email?: string;
            project_type?: string;
            company?: string;
            job_title?: string;
            phone?: string;
            message?: string;
            marketing_opt_in?: boolean;
            source?: string;
          };

          const {
            name,
            first_name,
            last_name,
            email,
            project_type,
            company,
            job_title,
            phone,
            message,
            marketing_opt_in = false,
            source = "ask_ai",
          } = body;

          // 1. Validation
          if (!email || typeof email !== "string") {
            return new Response(JSON.stringify({ error: "Email is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Simple email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: "Invalid email format." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Combine name if split fields are present
          const fullName =
            name ||
            (first_name || last_name ? `${first_name || ""} ${last_name || ""}`.trim() : null);

          // 2. Insert into the database
          await pool.query(
            `INSERT INTO leads (
              name, email, project_type, message, source, 
              first_name, last_name, company, job_title, phone, marketing_opt_in
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              fullName,
              email,
              project_type || null,
              message || null,
              source,
              first_name || null,
              last_name || null,
              company || null,
              job_title || null,
              phone || null,
              marketing_opt_in,
            ]
          );

          return new Response(JSON.stringify({ success: true, message: "Lead captured successfully." }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("Lead API Route Error:", error);
          return new Response(JSON.stringify({ error: "Internal server error." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
