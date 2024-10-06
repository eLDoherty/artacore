import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const articleID = searchParams.get('articleID');

    if (!articleID) {
        return NextResponse.json({ success: false, error: 'articleID is required' }, { status: 400 });
    }

    try {
        const categories = await query(`
            SELECT c.id, c.name 
            FROM article_categories ac
            JOIN categories c ON ac.category_id = c.id
            WHERE ac.article_id = ?
        `, [articleID]);

        return NextResponse.json({ success: true, categories });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
    }
}
