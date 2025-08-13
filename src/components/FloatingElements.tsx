export const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/15 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '4s' }} />
      
      {/* Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '1.5s' }} />
      
      {/* Subtle Lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};