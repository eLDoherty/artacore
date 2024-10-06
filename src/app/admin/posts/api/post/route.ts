import { NextResponse } from 'next/server';
import { insert, query } from '@/app/lib/db';

export async function POST(request: Request) {
    console.log('POST request received');

    const body = await request.json();
    const { title, content } = body;
    const user_id = 1;

    try {
        const result = await insert('articles', { title, content, user_id });
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ success: false, error: 'Failed to insert data' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    console.log('GET request received');

    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('id');

    try {
        if (articleId) {
            const article = await query('SELECT * FROM articles WHERE id = ?', [articleId]);
            if (article) {
                return NextResponse.json({ success: true, article: article });
            } else {
                return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
            }
        } else {
            const articles = await query('SELECT * FROM articles');
            return NextResponse.json({ success: true, articles });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
    }
}
