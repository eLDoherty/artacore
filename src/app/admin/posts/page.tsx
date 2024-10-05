'use client';
import { useEffect, useState } from 'react';
import '../../globals.scss';

interface Post {
    id: number;
    title: string;
    category: string;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/admin/posts/api/post');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            console.log('Fetched data:', data.articles);
            if (Array.isArray(data.articles)) {
                setPosts(data.articles);
            } else {
                console.error('Fetched data is not an array:', data);
                if (data.articles) {
                    setPosts(data.articles);
                }
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEdit = (id: number) => {
        console.log(`Edit post with ID: ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete post with ID: ${id}`);
    };

    const handleView = (id: number) => {
        console.log(`View post with ID: ${id}`);
    };

    return (
        <div className="arta-pages arta-space">
            <h2>Posts</h2>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <table className="posts-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.category}</td>
                                <td>
                                    <button onClick={() => handleView(post.id)}>View</button>
                                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
