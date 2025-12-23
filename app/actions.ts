"use server"

import { z } from "zod"
import { Resend } from "resend"
import { env } from "@/lib/env"
import { escapeHtml } from "@/lib/utils/escape-html"

// Initialize Resend with validated API key
const resend = new Resend(env.RESEND_API_KEY)

export async function sendContactEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // Validate the form data
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
  })

  try {
    // Validate the form data
    const validatedData = schema.parse(formData)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["veeraselvam965@gmail.com"],
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${escapeHtml(validatedData.subject)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6; margin-bottom: 24px;">New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(validatedData.subject)}</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #f3f4f6; border-radius: 4px;">
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(validatedData.message).replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error(error.message)
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}
