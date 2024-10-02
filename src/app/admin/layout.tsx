// src/app/admin/layout.tsx
import Link from 'next/link';
import '../globals.scss';
import './layout.scss';

export const metadata = {
    title: 'Artacore - CMS',
    description: 'Admin dashboard Artacore',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header className='artaheader'>
                    <div className="arta-fullwidth">
                        <h1>Artacore V1 CMS</h1>
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
                    <aside className='arta-sidebar'>
                        <h2>Admin Menu</h2>
                        <nav>
                            <ul>
                                <li><Link href="/admin">Dashboard</Link></li>
                                <li><Link href="/admin/posts">Posts</Link></li>
                                <li><Link href="/admin/pages">Pages</Link></li>
                                <li><Link href="/admin/files">File Manager</Link></li>
                            </ul>
                        </nav>
                    </aside>
                    {children}
                </main>
                <footer className='artafooter'>
                    <p>&copy;2024 Powered By Artacode. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
