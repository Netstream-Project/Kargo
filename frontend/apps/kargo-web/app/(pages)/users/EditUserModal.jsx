"use client";
import React, { useState, useEffect } from "react";

export default function EditUserModal({ isOpen, onClose, onSave, user }) {
  // Local state to handle the form changes
  const [formData, setFormData] = useState({ role: "", status: "" });

  // Whenever the modal opens with a new user, populate the form
  useEffect(() => {
    if (user) {
      setFormData({ role: user.role, status: user.status });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#142026]/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#142026] px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="font-headline text-2xl font-black tracking-tight uppercase">Edit Personnel</h2>
            <p className="text-[#bbc8d0] text-xs font-bold uppercase tracking-widest mt-1">
              {user.name} // {user.uid}
            </p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Functional Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 appearance-none cursor-pointer focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] font-bold text-sm text-[#142026]"
            >
              <option value="INSPECTOR">Inspector</option>
              <option value="MANAGER">Manager</option>
              <option value="TERMINAL ADMIN">Terminal Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#43474f] uppercase tracking-wider block">Network Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 appearance-none cursor-pointer focus:ring-0 focus:border-b-2 focus:border-[#3a5f94] font-bold text-sm text-[#142026]"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="ON LEAVE">On Leave</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 flex justify-end gap-4 border-t border-slate-100 mt-8">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 font-headline text-xs font-bold uppercase tracking-widest text-[#43474f] hover:bg-[#e8e8e8] transition-colors rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#460003] text-white px-8 py-3 rounded-lg font-headline text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-[#6e0009] active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}