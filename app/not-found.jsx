import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-visual">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop" 
            alt="Page Not Found" 
            className="not-found-img"
          />
          <div className="visual-overlay"></div>
        </div>
        <div className="not-found-content">
          <span className="error-code">404</span>
          <h1>Lost in the Network?</h1>
          <p>
            It seems the page you are looking for has been moved or doesn't exist. 
            Don't worry, even the strongest connections sometimes drop.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn-primary large">
              Back to Campus
            </Link>
            <Link href="/contact" className="btn-outline large">
              Report Issue
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="decor-circle circle-1"></div>
      <div className="decor-circle circle-2"></div>
    </div>
  )
}
