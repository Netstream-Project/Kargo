"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/global/Sidebar';

export default function UsersPage() {
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  // DRY Array for User Data
  const activeUsers = [
    { name: "Marcus Chen", uid: "UID-8829-KARGO", role: "Inspector", status: "Online", time: "2 mins ago" },
    { name: "Elias Thorne", uid: "UID-4412-KARGO", role: "Manager", status: "Online", time: "14 mins ago" },
    { name: "Sarah Jenkins", uid: "UID-9021-KARGO", role: "Inspector", status: "Offline", time: "1 hour ago" },
    { name: "Robert Lang", uid: "UID-1102-KARGO", role: "Manager", status: "Online", time: "3 hours ago" }
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] relative">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-grow px-12 pb-12 pt-8 w-full">
        
        {/* Top Header */}
        <header className="mb-12 border-b border-[#c3c6d1]/30 pb-4">
          <h1 className="font-headline font-bold text-lg uppercase tracking-tight text-[#930010]">
            Users Management
          </h1>
        </header>

        {/* Action & Search Bar Section */}
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737780]">search</span>
              <input 
                type="text" 
                placeholder="Filter by name, role, or ID..." 
                className="w-full h-14 bg-[#e8e8e8] border-none focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] pl-12 pr-6 text-[#1a1c1c] font-medium placeholder:text-[#737780] transition-all"
              />
            </div>
          </div>
          {/* 👉 OPEN MODAL BUTTON */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-8 bg-[#460003] text-white font-headline font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#6e0009] active:scale-95 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-xl">person_add</span>
            Add User
          </button>
        </section>

        {/* User Inventory Grid */}
        <div className="bg-white shadow-sm border border-[#e2e2e2]">
          
          <div className="p-6 bg-[#29353b] flex justify-between items-center">
            <h3 className="font-headline font-bold text-white uppercase tracking-tighter text-lg">Active Personnel</h3>
            <span className="text-[10px] text-[#d7e4ec] font-bold tracking-[0.2em] uppercase">Auth Level: Terminal Admin</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f3f3] border-b border-[#c3c6d1]/30">
                  <th className="px-8 py-4 font-headline text-[10px] uppercase tracking-widest text-[#737780]">User Identity</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-[#737780]">Functional Role</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-[#737780]">Network Status</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-[#737780]">Last Transmission</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-[#737780] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f3f3]">
                {activeUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-[#f3f3f3]/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-[#1a1c1c] font-body">{user.name}</div>
                      <div className="text-[10px] text-[#737780] uppercase font-mono">{user.uid}</div>
                    </td>
                    <td className="px-6 py-5">
                      {user.role === 'Inspector' ? (
                        <span className="px-3 py-1 bg-[#3a5f94] text-white text-[10px] font-black uppercase tracking-widest rounded-full">{user.role}</span>
                      ) : (
                        <span className="px-3 py-1 bg-[#e2e2e2] text-[#43474f] text-[10px] font-black uppercase tracking-widest rounded-full">{user.role}</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {user.status === 'Online' ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        )}
                        <span className={`text-xs font-bold uppercase ${user.status === 'Online' ? 'text-[#1a1c1c]' : 'text-[#737780]'}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-[#737780] font-medium">{user.time}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[#737780] hover:text-[#460003] transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-[#f3f3f3] border-t border-[#c3c6d1]/30 flex items-center justify-between">
            <span className="text-xs font-medium text-[#737780]">Displaying 1-4 of 28 users</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-white text-[#737780] border border-[#c3c6d1]/50 hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#460003] text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center bg-white text-[#737780] border border-[#c3c6d1]/50 hover:bg-gray-50 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center bg-white text-[#737780] border border-[#c3c6d1]/50 hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#142026]/70 backdrop-blur-sm flex items-center justify-center p-4">
          
          {/* Modal Container */}
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-[0px_12px_32px_rgba(26,28,28,0.15)] overflow-hidden border border-[#c3c6d1]/20">
            
            {/* Modal Header */}
            <div className="bg-[#142026] px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="font-headline text-white text-2xl font-black tracking-tight uppercase">New Entry: User</h2>
                <p className="text-[#bbc8d0] text-xs font-label uppercase tracking-widest mt-1">Logistics Terminal / Registry</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Form Body */}
            <form className="p-8 space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="space-y-8">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Full Name</label>
                  <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all placeholder:text-[#737780]/50" placeholder="e.g. Elena Rodriguez" type="text" required />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Email Address</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all placeholder:text-[#737780]/50" placeholder="name@kargo.ind" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Phone Number</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all placeholder:text-[#737780]/50" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>

                {/* Role Selection (Controlled by State) */}
                <div className="space-y-2">
                  <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Select Role</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all appearance-none cursor-pointer" 
                    required
                  >
                    <option value="" disabled>Choose access level...</option>
                    <option value="inspector">Inspector</option>
                    <option value="management">Management</option>
                  </select>
                </div>

                {/* Conditional Field: Inspector Security PIN */}
                {selectedRole === 'inspector' && (
                  <div className="space-y-2 bg-[#e8e8e8]/50 p-6 rounded-xl border border-[#c3c6d1]/20">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Security PIN (Inspector)</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-4 font-headline text-2xl tracking-[1em] text-center text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all" maxLength="4" placeholder="0000" type="password" required />
                    <p className="text-[10px] text-[#737780] italic">Enter a unique 4-digit code for terminal handheld scanners.</p>
                  </div>
                )}

                {/* Conditional Field: Management Password */}
                {selectedRole === 'management' && (
                  <div className="space-y-2 bg-[#e8e8e8]/50 p-6 rounded-xl border border-[#c3c6d1]/20">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Management Password</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] transition-all" placeholder="Enter secure password" type="password" required />
                  </div>
                )}

              </div>

              {/* Action Footer */}
              <div className="pt-8 flex items-center justify-between border-t border-[#c3c6d1]/20 mt-8">
                <div className="flex items-center gap-2 text-[#737780]">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest">System Protocol 40.2</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-headline text-xs font-bold uppercase tracking-widest text-[#43474f] hover:bg-[#e8e8e8] transition-colors rounded-lg" type="button">
                    Cancel
                  </button>
                  <button className="bg-[#460003] text-white px-10 py-3 rounded-lg font-headline text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-[#6e0009] transition-all flex items-center gap-3" type="submit">
                    <span className="material-symbols-outlined text-base">person_add</span>
                    Add User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}