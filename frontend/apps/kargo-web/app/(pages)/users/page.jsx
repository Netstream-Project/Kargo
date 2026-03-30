"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/global/Sidebar';
import EditUserModal from "./EditUserModal";

export default function UsersPage() {
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [editingUser, setEditingUser] = useState(null); // Tracks who is being edited
  const [showToast, setShowToast] = useState(false);    // Controls the success popup

  const handleSaveUser = (updatedUser) => {
    // 👉 1. Update the table data instantly!
    setUsers(users.map((user) => 
      user.uid === updatedUser.uid ? updatedUser : user
    ));
    
    // 👉 2. Close the modal
    setEditingUser(null); 
    
    // 👉 3. Show the success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  
  // 👉 NEW: State to hold the current search query
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState([
    { name: "Marcus Chen", uid: "UID-8829-KARGO", role: "Inspector", status: "Online", time: "2 mins ago" },
    { name: "Elias Thorne", uid: "UID-4412-KARGO", role: "Manager", status: "Online", time: "14 mins ago" },
    { name: "Sarah Jenkins", uid: "UID-9021-KARGO", role: "Inspector", status: "Offline", time: "1 hour ago" },
    { name: "Robert Lang", uid: "UID-1102-KARGO", role: "Manager", status: "Online", time: "3 hours ago" }
  ]);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    
    const newUser = {
      name: formData.name,
      uid: `UID-${Math.floor(1000 + Math.random() * 9000)}-KARGO`,
      role: selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1),
      status: "Online",
      time: "Just now"
    };

    setUsers([newUser, ...users]); 
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
    setSelectedRole("");
  };

  // 👉 NEW: Filter the users array based on the search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.uid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] relative">
      <Sidebar />

      <main className="flex-grow px-12 pb-12 pt-8 w-full">
        <header className="mb-12 border-b border-[#c3c6d1]/30 pb-4">
          <h1 className="font-headline font-bold text-lg uppercase tracking-tight text-[#930010]">
            Users Management
          </h1>
        </header>

        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737780]">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, role, or ID..." 
                className="w-full h-14 bg-[#e8e8e8] border-none focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] pl-12 pr-6 text-[#1a1c1c] font-medium placeholder:text-[#737780] transition-all" 
              />
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="h-14 px-8 bg-[#460003] text-white font-headline font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#6e0009] active:scale-95 transition-all shadow-lg">
            <span className="material-symbols-outlined text-xl">person_add</span>
            Add User
          </button>
        </section>

        <div className="bg-white shadow-sm border border-[#e2e2e2]">
          <div className="p-6 bg-[#29353b] flex justify-between items-center text-white">
            <h3 className="font-headline font-bold uppercase tracking-tighter text-lg">Active Personnel</h3>
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-[#f3f3f3]/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-[#1a1c1c] font-body">{user.name}</div>
                        <div className="text-[10px] text-[#737780] uppercase font-mono">{user.uid}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 ${user.role.toLowerCase() === 'inspector' ? 'bg-[#3a5f94] text-white' : 'bg-[#e2e2e2] text-[#43474f]'} text-[10px] font-black uppercase tracking-widest rounded-full`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status.toLowerCase() === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                          <span className={`text-xs font-bold uppercase ${user.status.toLowerCase() === 'online' ? 'text-[#1a1c1c]' : 'text-[#737780]'}`}>{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xs text-[#737780]">{user.time}</td>
                      <td className="px-6 py-5 text-right">
                        {/* 👉 THIS triggers the edit modal */}
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="text-[#737780] hover:text-[#460003] transition-colors p-2 hover:bg-slate-100 rounded-md"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-[#737780]">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                      <p className="font-bold text-sm">No personnel found matching "{searchQuery}"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-[#f3f3f3] border-t border-[#c3c6d1]/30 flex items-center justify-between">
            <span className="text-xs font-medium text-[#737780]">
              Displaying {filteredUsers.length > 0 ? 1 : 0}-{filteredUsers.length} of {users.length} users
            </span>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-white text-[#737780] border border-[#c3c6d1]/50 hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#460003] text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center bg-white text-[#737780] border border-[#c3c6d1]/50 hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- ADD USER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#142026]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-[#142026] px-8 py-6 flex justify-between items-center text-white">
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight">New Entry: User</h2>
              <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-outlined">close</span></button>
            </div>

            <form className="p-8 space-y-8" onSubmit={handleAddUser}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Full Name</label>
                  <input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" 
                    placeholder="e.g. Elena Rodriguez" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Email Address</label>
                    <input 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" 
                      placeholder="name@kargo.ind" 
                      type="email" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Phone Number</label>
                    <input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" 
                      placeholder="+27 72 000 0000" 
                      type="tel" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Select Role</label>
                  <select 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.target.value)} 
                    className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 appearance-none focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" 
                    required
                  >
                    <option value="" disabled>Choose access level...</option>
                    <option value="Inspector">Inspector</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                {selectedRole.toLowerCase() === 'inspector' && (
                  <div className="space-y-2 bg-[#e8e8e8]/50 p-6 rounded-xl border border-[#c3c6d1]/20">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Security PIN (Inspector)</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-4 font-headline text-2xl tracking-[1em] text-center focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" maxLength="4" placeholder="0000" type="password" required />
                    <p className="text-[10px] text-[#737780] italic">Enter a unique 4-digit code for terminal handheld scanners.</p>
                  </div>
                )}

                {selectedRole.toLowerCase() === 'manager' && (
                  <div className="space-y-2 bg-[#e8e8e8]/50 p-6 rounded-xl border border-[#c3c6d1]/20">
                    <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Management Password</label>
                    <input className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-[#3a5f94]" placeholder="Enter secure password" type="password" required />
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-[#c3c6d1]/20 flex gap-4 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-xs font-bold uppercase text-[#43474f]">Cancel</button>
                <button type="submit" className="bg-[#460003] text-white px-10 py-3 rounded-lg font-headline text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                  <span className="material-symbols-outlined text-base">person_add</span>
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 👉 NEW: SUCCESS TOAST POPUP */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#142026] text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">check</span>
            </div>
            <div>
              <p className="font-headline font-black uppercase tracking-tight text-sm">Personnel Updated</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Registry changes saved successfully</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 opacity-50 hover:opacity-100">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* 👉 NEW: EDIT USER MODAL */}
      <EditUserModal 
        isOpen={!!editingUser} 
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />
      
    </div>
  );
}