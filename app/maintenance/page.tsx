import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance | Vanguard Group",
  description: "We are currently performing scheduled maintenance.",
};

export default function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-sans, sans-serif)",
        padding: "2rem",
        textAlign: "center",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      {/* Logo / Brand */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Vanguard Group
        </h1>
        <div
          style={{
            width: "4rem",
            height: "3px",
            background: "linear-gradient(90deg, #c9a84c, #e8c97e)",
            margin: "1rem auto 0",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Icon */}
      <div style={{ marginBottom: "2rem" }}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.85 }}
        >
          <circle cx="32" cy="32" r="31" stroke="#c9a84c" strokeWidth="2" />
          <path
            d="M20 44 L32 20 L44 44"
            stroke="#c9a84c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 38 L40 38"
            stroke="#c9a84c"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="3" fill="#c9a84c" />
        </svg>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 600,
          color: "#c9a84c",
          margin: "0 0 1rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Scheduled Maintenance
      </h2>

      {/* Message */}
      <p
        style={{
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          color: "#a0a0b0",
          maxWidth: "480px",
          lineHeight: 1.75,
          margin: "0 0 2.5rem",
        }}
      >
        We are currently performing scheduled maintenance to improve your
        experience. Our website will be back online shortly. Thank you for your
        patience.
      </p>

      {/* Contact line */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "#606070",
          margin: 0,
        }}
      >
        For urgent inquiries, contact us at{" "}
        <a
          href="mailto:info@vanguardgroup.com"
          style={{
            color: "#c9a84c",
            textDecoration: "none",
            borderBottom: "1px solid rgba(201,168,76,0.4)",
            paddingBottom: "1px",
          }}
        >
          info@vanguardgroup.com
        </a>
      </p>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          fontSize: "0.8rem",
          color: "#404050",
        }}
      >
        &copy; {new Date().getFullYear()} Vanguard Group. All rights reserved.
      </div>
    </div>
  );
}
