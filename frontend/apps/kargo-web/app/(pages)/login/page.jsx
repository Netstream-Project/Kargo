"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    // Navigate the user directly to the containers page
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#f9f9f9] text-[#1a1c1c] font-body overflow-hidden">
      
      {/* --- Left Hero Section: The Kinetic Grid Visual --- */}
      <section className="hidden md:flex md:w-3/5 lg:w-2/3 relative overflow-hidden group">
        {/* Background Port Image */}
        <img 
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop" 
          alt="Industrial shipping port at sunset" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Dark Red/Industrial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#460003]/85 to-[#142026]/70 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <h1 className="font-headline font-black text-6xl text-white tracking-tighter leading-none mb-4">
              KARGO
            </h1>
            <div className="h-1 w-24 bg-[#6e0009]"></div>
          </div>
          
          <div className="max-w-xl">
            <p className="font-headline text-4xl font-light text-white leading-tight mb-8">
              Precision logistics for the <span className="font-bold border-b-4 border-[#6e0009]">modern machine.</span>
            </p>
          
            </div>
          </div>
     
      </section>

      {/* --- Right Form Section: Industrial Precision --- */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white md:bg-[#f9f9f9] relative z-10">
        <div className="w-full max-w-md">
          
          {/* Mobile Branding (Only shows on small screens) */}
          <div className="md:hidden mb-12 flex flex-col items-center">
            <h1 className="font-headline font-black text-4xl text-[#460003] tracking-tighter">KARGO</h1>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-[#3a5f94] mt-2">Industrial Precision</p>
          </div>
          
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-bold text-[#142026] mb-2">Terminal Access</h2>
            <p className="text-[#43474f] font-medium">Please enter your credentials to access the manifest.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            
            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block font-headline text-[10px] font-bold uppercase tracking-widest text-[#43474f] mb-2 ml-1">
                Operator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737780]">
                  <span className="material-symbols-outlined text-xl">alternate_email</span>
                </div>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="operator@kargo.io" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-[#e8e8e8] border-none rounded-lg focus:ring-0 text-[#1a1c1c] placeholder:text-[#737780]/50 transition-all focus:bg-white focus:outline-none" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#3a5f94] transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block font-headline text-[10px] font-bold uppercase tracking-widest text-[#43474f] ml-1">
                  Secure Key
                </label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-[#3a5f94] hover:text-[#460003] transition-colors">
                  Forgot Password
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737780]">
                  <span className="material-symbols-outlined text-xl">lock_open</span>
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••••••" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-[#e8e8e8] border-none rounded-lg focus:ring-0 text-[#1a1c1c] placeholder:text-[#737780]/50 transition-all focus:bg-white focus:outline-none" 
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#3a5f94] transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 rounded border-[#c3c6d1] text-[#3a5f94] focus:ring-[#3a5f94]/20 cursor-pointer" />
              <label htmlFor="remember_me" className="ml-2 block text-sm font-medium text-[#43474f] cursor-pointer">
                Trust this terminal for 30 days
              </label>
            </div>

            {/* Primary Action */}
            <button type="submit" className="w-full py-5 bg-[#460003] hover:bg-[#6e0009] text-white font-headline font-bold uppercase tracking-widest rounded-lg shadow-[0px_12px_32px_rgba(70,0,3,0.15)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
              Sign In
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </form>

        

        </div>
      </section>
      
      {/* Background Decor (Light Mode Visual Soul) */}
      <div className="fixed top-0 right-0 w-1/3 h-screen bg-[#f3f3f3] -z-10 pointer-events-none hidden md:block"></div>
    </main>
  );
}