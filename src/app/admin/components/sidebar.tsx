"use client";
import Link from 'next/link';
import './sidebar.scss';
import { useState } from 'react';

const AdminSidebar = () => {
    const [isPostsOpen, setIsPostsOpen] = useState(false);

    const togglePostsMenu = () => {
        setIsPostsOpen(!isPostsOpen);
    };

    return (
        <aside className='arta-sidebar'>
            <h2>Admin Menu</h2>
            <nav>
                <ul>
                    <li><Link href="/admin">Dashboard</Link></li>
                    <li>
                        <div className='menu-hasChild'>
                            <Link href="/admin/posts">Post</Link>
                            <button onClick={togglePostsMenu} className="toggle-button">+</button>
                        </div>
                        {isPostsOpen && (
                            <ul className="child-menu">
                                <li><Link href="/admin/posts/add">Add New Post</Link></li>
                                <li><Link href="/admin/posts/categories">Post Categories</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link href="/admin/pages">Pages</Link></li>
                    <li><Link href="/admin/files">File Manager</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
