import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="d-flex">
          <Sidebar />
          <main className="flex-grow-1 p-3">
            {children}  
          </main>
        </div>
      </body>
    </html>
  );
}

