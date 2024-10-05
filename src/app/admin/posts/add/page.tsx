"use client"; // Declare this component as a Client Component

import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './add.scss';
import '../../../globals.scss';

async function insertData(title: string, content: string) {
    const response = await fetch('/admin/posts/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
        throw new Error('Failed to save article');
    }

    return response.json();
}

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await insertData(title, content);
            console.log('Article saved:', response);
            router.push('/admin/posts');
        } catch (error) {
            console.error('Error saving article:', error);
        }
    };

    return (
        <div className="arta-inner-content arta-space">
            <div className="arta-container">
                <h2>Add New Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        {isClient && (
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                            />
                        )}
                    </div>
                    <button type="submit">Save Article</button>
                </form>
            </div>
        </div>
    );
}
