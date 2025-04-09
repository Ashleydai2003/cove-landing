'use client';

import { Libre_Bodoni, Berkshire_Swash } from 'next/font/google'
import { useState, ChangeEvent } from 'react'
import { notion } from '@/lib/notion';

interface FormData {
  fullName: string;
  phoneNumber: string;
  city: string;
  age: string;
}

interface FormErrors {
  fullName: boolean;
  phoneNumber: boolean;
  city: boolean;
  age: boolean;
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
  const [buttonAnimationComplete, setButtonAnimationComplete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    city: '',
    age: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    fullName: false,
    phoneNumber: false,
    age: false,
    city: false
  });

  const validateForm = () => {
    // Count digits in phone number
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '').length;
    
    const newErrors = {
      fullName: !formData.fullName.trim(),
      phoneNumber: !formData.phoneNumber.trim() || phoneDigits < 10,
      age: !formData.age.trim(),
      city: !formData.city.trim()
    };
    setFormErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleButtonClick = async () => {
    if (buttonAnimationComplete && !submitted) {
      if (validateForm()) {
        // Set submitted to true immediately to trigger animations
        setSubmitted(true);
        
        try {
          // Submit to Notion database
          console.log('Client - Attempting to create Notion page...');
          console.log('Client - Form data:', formData);
          
          const response = await fetch('/api/notion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          
          if (!response.ok) {
            console.error('Client - API Error Response:', result);
            throw new Error(result.error || 'Failed to submit form');
          }

          console.log('Client - Success Response:', result);
        } catch (error) {
          console.error('Client - Detailed Notion error:', error);
          if (error instanceof Error) {
            console.error('Client - Error message:', error.message);
            console.error('Client - Error stack:', error.stack);
          }
        }
      } else {
        console.log('Some fields are empty!');
      }
    }
  };

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
    } else if (name === 'fullName') {
      // Only allow letters, spaces, and hyphens for names
      if (value === '' || /^[a-zA-Z\s-]+$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
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
          {/* Logo and subtitle container */}
          <div>
            {/* Title fades in after 1000ms */}
            <h1 className={`${berkshireSwash.className} text-9xl text-[#7a3131ff] dark:text-white text-center opacity-0 fade-in delay-1000 transform -skew-x-12`}>
              cove
            </h1>
            {/* Subtitle fades in too */}
            <p className={`${libreBodoni.className} text-xl text-center text-[#7a3131ff] dark:text-white font-bold opacity-0 fade-in delay-1000`}>
              plug back into community.
            </p>
          </div>
          
          {/* Form or Button container */}
          <div className="mt-10">
            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className={`${libreBodoni.className} px-11 py-3 bg-[#7a3131ff] text-white dark:bg-white dark:text-black rounded-md font-bold hover:bg-[#4a1919] dark:hover:bg-gray-200 transition-colors fade-in delay-1000`} 
              >
                join the waitlist
              </button>
            ) : (
              <div className="relative">
                {!submitted ? (
                  <>
                    <button 
                      onAnimationEnd={() => setButtonAnimationComplete(true)}
                      onClick={handleButtonClick}
                      className={`${libreBodoni.className} px-11 py-3 bg-[#7a3131ff] text-white dark:bg-white dark:text-black rounded-md font-bold float-down absolute ${buttonAnimationComplete ? 'hover:bg-[#3a1010] dark:hover:bg-gray-200 transition-colors duration-300' : ''}`}
                      style={{ transform: buttonAnimationComplete ? 'translateY(300px)' : '' }}
                    >
                      join the waitlist
                    </button>
                    <form className={`flex flex-col gap-4 form-fade-in ${submitted ? 'fade-out' : ''}`}>
                      <p className={`${libreBodoni.className} text-white/80 text-sm text-center mb-2`}>
                        your information is private.
                      </p>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="first and last name"
                        className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border ${formErrors.fullName ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:ring-2 focus:ring-white/50`}
                      />
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="phone number"
                        className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:ring-2 focus:ring-white/50`}
                      />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="city"
                        className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border ${formErrors.city ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:ring-2 focus:ring-white/50`}
                      />
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="age"
                        className={`${libreBodoni.className} px-4 py-2 rounded-md bg-[#7a3131] text-white placeholder-white/70 border ${formErrors.age ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:ring-2 focus:ring-white/50`}
                      />
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 fade-in">
                    <h2 className={`${libreBodoni.className} text-4xl text-[#7a3131ff] dark:text-white text-center`}>
                      you're in!
                    </h2>
                    <p className={`${libreBodoni.className} text-xl text-center text-[#7a3131ff] dark:text-white`}>
                      stay tuned for a message from us.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
