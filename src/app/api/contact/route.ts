import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, SendGrid, Formspree, etc.)
    // For now, log the contact submission
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Transmission received successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to process transmission' },
      { status: 500 }
    );
  }
}
