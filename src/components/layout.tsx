import type { PropsWithChildren } from 'react'
import Header from './Header'
import video1 from '../assets/video1.mp4'

function layout({children}:PropsWithChildren) {
  return (
    
     <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src={video1}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
  
      </div>
    </div>
  )
}

export default layout