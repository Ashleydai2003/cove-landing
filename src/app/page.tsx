import { Libre_Bodoni, Berkshire_Swash } from 'next/font/google'

const berkshireSwash = Berkshire_Swash({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal']
})

const libreBodoni = Libre_Bodoni({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic']
})

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background image container */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/image1.jpg')] bg-cover bg-center animate-backgroundRotate dark:invert-0" />
      </div>

      {/* Content container with semi-transparent overlay - fades in after 500ms */}
      <div className="relative z-10 flex items-center justify-center min-h-screen bg-white/60 dark:bg-[#7a3131ff]/80 opacity-0 fade-in delay-500">
        <div className="flex flex-col items-center">
          {/* Title fades in after 1000ms */}
          <h1 className={`${berkshireSwash.className} text-9xl text-[#7a3131ff] dark:text-white text-center opacity-0 fade-in delay-1000 transform -skew-x-12`}>
            cove
          </h1>
          {/* Subtitle fades in after 1500ms */}
          <p className={`${libreBodoni.className} text-xl text-center text-[#7a3131ff] dark:text-white font-bold opacity-0 fade-in`} style={{ animationDelay: '1500ms' }}>
            plug back into community.
          </p>
          {/* Button fades in after 2000ms */}
          <button className={`${libreBodoni.className} mt-10 px-8 py-3 bg-[#7a3131ff] text-white dark:bg-white dark:text-black rounded-md font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors opacity-0 fade-in`} style={{ animationDelay: '2000ms' }}>
            <a 
              href="https://forms.gle/Nrd9MM53PktZeYSw6" 
              rel="noopener noreferrer"
            >
              join the waitlist
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
