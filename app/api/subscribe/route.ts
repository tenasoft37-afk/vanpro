import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend('re_LhA4CSUG_2DDK3TLSrPvHwfEoBpEuH8y7');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tenasoft37@gmail.com',
      subject: 'New Newsletter Subscription',
      html: `<p>You have a new newsletter subscription from: <strong>${email}</strong></p>`
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Subscription successful",
        id: result.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { 
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
