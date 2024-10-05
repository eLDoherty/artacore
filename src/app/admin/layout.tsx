// src/app/admin/layout.tsx
import Link from 'next/link';
import '@/app/admin/layout.scss';
import '@/app/globals.scss';
import AdminSidebar from './components/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='artacore'>
            <header className='arta-header'>
                <div className="arta-fullwidth">
                    <h1 className="arta-heading">Artacore V1 CMS</h1>
                    <div className="arta-wrapper">
                        <nav>
                            <ul>
                                <li><Link className='white' href="/admin">Dashboard</Link></li>
                                <li><Link className='white' href="/admin/posts">Post</Link></li>
                                <li><Link className='white' href="/admin/pages">Pages</Link></li>
                                <li><Link className='white' href="/admin/files">File Manager</Link></li>
                            </ul>
                        </nav>
                        <div className="user-button">
                            <Link className='white' href="/admin/profile">Hi, User!</Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className='arta-content'>
                <AdminSidebar />
                {children}
            </main>
            <footer className='arta-footer'>
                <p>&copy; 2024 Powered By Artacode. All rights reserved.</p>
            </footer>
        </div>
    );
}
