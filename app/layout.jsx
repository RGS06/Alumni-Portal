import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthProvider } from '../components/AuthContext'
import FeedbackWidget from '../components/FeedbackWidget'

export const metadata = {
  title: 'SMVITM Alumni Portal | Connecting Generations',
  description: 'A unified platform for SMVITM alumni, students, and faculty to collaborate, mentor, and grow together.',
  icons: {
    icon: [
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/web-app-manifest-192x192.png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Coves:wght@700&family=Open+Sans:wght@400;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <FeedbackWidget />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
