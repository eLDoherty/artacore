"use client"; // Declare this component as a Client Component

import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter, useSearchParams } from 'next/navigation';
import './add.scss';
import '../../../globals.scss';

async function updateData(id: number, title: string, content: string) {
    const response = await fetch(`/admin/posts/api/post/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
        throw new Error('Failed to update article');
    }

    return response.json();
}

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const articleId = searchParams?.get('id');

    console.log("articleID:" + articleId);

    const fetchPost = async (id: string) => {
        try {
            const response = await fetch(`/admin/posts/api/post?id=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }

            
            const data = await response.json();

            console.log(data);
            if (data.article) {
                setTitle(data.article.title);
                setContent(data.article.content);
            } else {
                console.error('Failed to fetch article data:', data);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsClient(true);
        if (articleId) {
            fetchPost(articleId);
        } else {
            setLoading(false);
        }
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (articleId) {
                const response = await updateData(Number(articleId), title, content);
                router.push('/admin/posts');
            }
        } catch (error) {
            alert('Error updating article: ' + error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="arta-inner-content arta-space">
            <div className="arta-container">
                <h2>Edit Article</h2>
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
                    <button type="submit">Update Article</button>
                </form>
            </div>
        </div>
    );
}
