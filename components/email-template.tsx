import type React from "react"
interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, subject, message }) => (
  <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h1 style={{ color: "#8b5cf6", marginBottom: "24px" }}>New Contact Form Submission</h1>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Subject:</strong> {subject}
    </p>
    <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "4px" }}>
      <p>
        <strong>Message:</strong>
      </p>
      <p>
        {message.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  </div>
)
