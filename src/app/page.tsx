'use client';

import { Libre_Bodoni, Berkshire_Swash } from 'next/font/google'
import { useState, ChangeEvent } from 'react'

interface FormData {
  fullName: string;
  phoneNumber: string;
  city: string;
  age: string;
}

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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    city: '',
    age: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for age and phone number
    if (name === 'age') {
      // Only allow numbers and limit to 3 digits
      if (value === '' || (/^\d+$/.test(value) && value.length <= 3)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else if (name === 'phoneNumber') {
      // Format phone number as user types
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        const formatted = match[1] + (match[2] ? '-' + match[2] : '') + (match[3] ? '-' + match[3] : '');
        setFormData(prev => ({
          ...prev,
          [name]: formatted
        }));
      }
    } else if (name === 'city') {
      // Allow letters, spaces, and hyphens for city names
      if (value === '' || /^[a-zA-Z\s-]+$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image container */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full bg-[url('/image1.jpg')] animate-backgroundRotate" />
      </div>

      {/* Content container with semi-transparent overlay - fades in after 500ms */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full bg-white/60 dark:bg-[#7a3131ff]/80 opacity-0 fade-in delay-500">
        <div className="flex flex-col items-center">
          {/* Title fades in after 1000ms */}
          <h1 className={`${berkshireSwash.className} text-9xl text-[#7a3131ff] dark:text-white text-center opacity-0 fade-in delay-1000 transform -skew-x-12`}>
            cove
          </h1>
          {/* Subtitle fades in after 1500ms */}
          <p className={`${libreBodoni.className} text-xl text-center text-[#7a3131ff] dark:text-white font-bold opacity-0 fade-in`} style={{ animationDelay: '1500ms' }}>
            plug back into community.
          </p>
          
          {/* Form or Button container */}
          <div className="mt-10">
            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className={`${libreBodoni.className} px-8 py-3 bg-[#7a3131ff] text-white dark:bg-white dark:text-black rounded-md font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors opacity-0 fade-in`} 
                style={{ animationDelay: '2000ms' }}
              >
                join the waitlist
              </button>
            ) : (
              <form className="flex flex-col gap-4 opacity-0 fade-in">
                <p className={`${libreBodoni.className} text-white/80 text-sm text-center mb-2`}>
                  your information is private.
                </p>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="first and last name"
                  className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="phone number"
                  className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="city"
                  className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
                />
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="age"
                  className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
