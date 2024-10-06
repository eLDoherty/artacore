'use client';
import { useEffect, useState } from 'react';
import './page.scss';
import '../../globals.scss';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    category: string;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoriesMap, setCategoriesMap] = useState<{ [key: number]: string }>({});
    const router = useRouter();

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
                fetchCategoriesForPosts(data.articles);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoriesForPosts = async (posts: Post[]) => {
        const newCategoriesMap: { [key: number]: string } = {};
        for (const post of posts) {
            const categoriesString = await fetchCategories(post.id);
            newCategoriesMap[post.id] = categoriesString;
        }
        setCategoriesMap(newCategoriesMap);
    };

    const fetchCategories = async (id: number): Promise<string> => {
        try {
            const response = await fetch('/admin/posts/api/categories?articleID=' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            console.log('Fetched categories:', data.categories);
            if (Array.isArray(data.categories)) {
                return data.categories.map((category: { name: string }) => category.name).join(', ');
            } else if (data.categories) {
                return data.categories.name;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        return "-";
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEdit = (id: number) => {
        router.push('/admin/posts/add?id=' + id);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete post with ID: ${id}`);
    };

    const handleView = (id: number) => {
        console.log(`View post with ID: ${id}`);
    };

    return (
        <div className="arta-pages arta-space">
            <h2 className='arta-title'>Post List</h2>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <table className="arta-list">
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
                                <td>{categoriesMap[post.id] || '-'}</td>
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
