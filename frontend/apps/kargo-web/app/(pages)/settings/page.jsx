"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/global/Sidebar';

export default function SettingsPage() {
  // Simple state to handle the Light/Dark mode toggle UI
  const [theme, setTheme] = useState("light");

  return (
    <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Moved the padding (p-12) to this inner div, just like Bookings */}
        <div className="p-12 max-w-7xl mx-auto w-full min-h-screen">
          
          {/* Header Section */}
          <header className="mb-16">
            <span className="text-[#460003] font-headline font-bold text-sm tracking-[0.2em] uppercase">
              System Configuration
            </span>
            <h2 className="text-5xl font-headline font-black tracking-tighter text-[#142026] mt-2">
              Account Settings
            </h2>
          </header>

        <div className="space-y-12">
          
          {/* --- PROFILE INFORMATION --- */}
          <section>
            <div className="bg-white p-10 shadow-[0px_12px_32px_rgba(26,28,28,0.06)] relative overflow-hidden">
              {/* Left Red Accent Bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#460003]"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-headline font-bold text-[#142026] uppercase tracking-tight">Profile Information</h3>
                <span className="material-symbols-outlined text-[#c3c6d1]">badge</span>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-headline font-bold text-[#737780] uppercase tracking-widest">Full Name</label>
                    <input 
                      className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-4 font-body text-[#1a1c1c] transition-all duration-300" 
                      type="text" 
                      defaultValue="Marcus Chen" 
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-headline font-bold text-[#737780] uppercase tracking-widest">Email Address</label>
                    <input 
                      className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-4 font-body text-[#1a1c1c] transition-all duration-300" 
                      type="email" 
                      defaultValue="marcus.chen@kargo.com" 
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-headline font-bold text-[#737780] uppercase tracking-widest">Phone Number</label>
                    <input 
                      className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-4 font-body text-[#1a1c1c] transition-all duration-300" 
                      type="tel" 
                      defaultValue="+1 234 567 8901" 
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-headline font-bold text-[#737780] uppercase tracking-widest">Security</label>
                    <button className="w-full flex items-center justify-between bg-[#e8e8e8] px-4 py-4 font-body text-[#3a5f94] font-bold hover:bg-[#e2e2e2] transition-colors" type="button">
                      <span>Change Password</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 flex justify-end">
                  <button className="bg-[#460003] text-white px-10 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-[#6e0009] transition-all duration-300 shadow-lg" type="submit">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* --- SYSTEM PREFERENCES --- */}
          <section className="bg-[#f3f3f3] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#142026]"></div>
              <h3 className="text-xl font-headline font-bold text-[#142026] uppercase tracking-tight">System Preferences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Light Mode Selection */}
              <div 
                onClick={() => setTheme("light")}
                className={`relative group cursor-pointer border-2 bg-white p-6 transition-all duration-300 ${theme === 'light' ? 'border-[#460003]' : 'border-transparent hover:border-[#c3c6d1]'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline font-bold text-[#142026]">Light Mode</h4>
                    <p className="text-xs text-[#737780] mt-1 font-body">Optimized for high-latitude daylight operations.</p>
                  </div>
                  {theme === 'light' ? (
                    <div className="w-6 h-6 rounded-full border-4 border-[#460003] flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#460003] rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#c3c6d1]"></div>
                  )}
                </div>
                {/* Mini UI Preview */}
                <div className="h-20 w-full bg-slate-100 rounded flex gap-2 p-2">
                  <div className="w-1/3 bg-white rounded shadow-sm"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                    <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Dark Mode Selection */}
              <div 
                onClick={() => setTheme("dark")}
                className={`relative group cursor-pointer border-2 bg-[#142026] p-6 transition-all duration-300 ${theme === 'dark' ? 'border-[#460003]' : 'border-transparent hover:border-[#737780]'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline font-bold text-white">Dark Mode</h4>
                    <p className="text-xs text-[#919ea5] mt-1 font-body">Reduced eye strain for night-shift terminal control.</p>
                  </div>
                  {theme === 'dark' ? (
                    <div className="w-6 h-6 rounded-full border-4 border-[#460003] flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#460003] rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#737780]"></div>
                  )}
                </div>
                {/* Mini UI Preview */}
                <div className="h-20 w-full bg-slate-900 rounded flex gap-2 p-2">
                  <div className="w-1/3 bg-slate-800 rounded shadow-sm"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-full bg-slate-700 rounded"></div>
                    <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>

            </div>
          </section>
          </div>

        </div>
      </main>
    </div>
  );
}