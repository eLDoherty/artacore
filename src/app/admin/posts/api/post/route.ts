import { NextResponse } from 'next/server';
import { insert } from '@/app/lib/db'; // Ensure this path is correct

export async function POST(request: Request) {
    console.log('POST request received'); // Debug log

    const body = await request.json();
    console.log('Request Body:', body); // Debug log

    const { title, content } = body;
    const user_id = 1;
    
    try {
        const result = await insert('articles', { title, content, user_id});
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ success: false, error: 'Failed to insert data' }, { status: 500 });
    }
}
