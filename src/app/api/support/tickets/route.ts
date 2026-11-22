import { NextResponse } from 'next/server';
import { getStoredSupportTickets, saveStoredSupportTickets } from '@/lib/admin/store';
import { SupportTicketItem } from '@/types/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get('registrationId');

    let tickets = getStoredSupportTickets();
    if (regId) {
      tickets = tickets.filter((t) => t.student_registration_id === regId);
    }

    return NextResponse.json({
      success: true,
      total: tickets.length,
      data: tickets,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      student_name,
      student_email,
      student_registration_id,
      category,
      subject,
      description,
      priority,
    } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { success: false, error: 'Subject and description are required' },
        { status: 400 }
      );
    }

    const tickets = getStoredSupportTickets();
    const newTicket: SupportTicketItem = {
      id: `tick_${Date.now()}`,
      ticket_number: `TICK-26-${Math.floor(1000 + Math.random() * 9000)}`,
      student_name: student_name || 'Candidate',
      student_email: student_email || 'candidate@example.com',
      student_registration_id: student_registration_id || 'MW-26-000001',
      category: category || 'general',
      subject,
      description,
      status: 'new',
      priority: priority || 'normal',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      internal_notes: [],
    };

    saveStoredSupportTickets([newTicket, ...tickets]);

    return NextResponse.json({
      success: true,
      message: 'Support ticket submitted successfully. Our team will respond within 2 hours.',
      data: newTicket,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create support ticket' },
      { status: 500 }
    );
  }
}
