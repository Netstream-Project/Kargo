"use client";
import React, { useState, useEffect } from "react";
// 👉 ADDED THESE IMPORTS (Crucial to prevent crash)
import { useSearchParams, useRouter } from "next/navigation"; 
import ContainerCard from "../../components/containers/ContainerCard";

export default function ContainersPage() {
  const [containers, setContainers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  
  // 👉 INITIALIZED HOOKS
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Params for Search and Approval
  const searchQuery = searchParams.get("q") || "";
  const isApproved = searchParams.get("approved");

  // --- EFFECT: SUCCESS TOAST LOGIC ---
  useEffect(() => {
    if (isApproved === "true") {
      setShowToast(true);
      
      const timer = setTimeout(() => {
        setShowToast(false);
        // Clean up URL so it doesn't show again on refresh
        router.replace("/containers");
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isApproved, router]);

  // Mock data representing your API payload
  const mockContainers = [
    { id: "KRG-44102", status: "In Transit", updatedAt: "Updated 2h ago", photoCount: 8 },
    { id: "KRG-89211", status: "Delayed", updatedAt: "Updated 15m ago", photoCount: 24 },
    { id: "KRG-33094", status: "Manifested", updatedAt: "Created yesterday", photoCount: 12 },
    { id: "KRG-11200", status: "In Transit", updatedAt: "Updated 5h ago", photoCount: 5 },
    { id: "KRG-77621", status: "Cleared", updatedAt: "Closed 2 days ago", photoCount: 42 },
    { id: "KRG-44209", status: "In Transit", updatedAt: "Updated 1h ago", photoCount: 16 },
    { id: "KRG-55012", status: "In Transit", updatedAt: "Updated 12m ago", photoCount: 3 },
    { id: "KRG-22108", status: "Manifested", updatedAt: "Updated 3h ago", photoCount: 9 },
    { id: "KRG-90034", status: "Delayed", updatedAt: "Alert triggered 40m ago", photoCount: 15 },
  ];

  // Load from local storage so the modal and this page can share data
  useEffect(() => {
    const loadContainers = () => {
      const saved = localStorage.getItem("kargo_containers");
      if (saved) {
        setContainers(JSON.parse(saved));
      } else {
        setContainers(mockContainers);
        localStorage.setItem("kargo_containers", JSON.stringify(mockContainers));
      }
    };

    loadContainers();

    // Listen for updates from the modal
    window.addEventListener('kargo_update', loadContainers);
    return () => window.removeEventListener('kargo_update', loadContainers);
  }, []);

  // Filter the containers based on the search query
  const filteredContainers = containers.filter((container) => {
    return (
      container.id.toLowerCase().includes(searchQuery) ||
      container.status.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="px-10 pb-20 mt-8">
      {/* 👉 SUCCESS TOAST POPUP */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#142026] text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">check</span>
            </div>
            <div>
              <p className="font-headline font-black uppercase tracking-tight text-sm">Report Approved</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">KRG-44102 Manifest Verified</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 opacity-50 hover:opacity-100">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}
      {/* Responsive Grid Setup */}
      {filteredContainers.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredContainers.map((container, idx) => (
          <ContainerCard
            key={idx}
            id={container.id}
            status={container.status}
            updatedAt={container.updatedAt}
            photoCount={container.photoCount}
          />
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-sm border border-slate-200 border-dashed">
          <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">search_off</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No containers found</h3>
          <p className="text-sm text-slate-500">We couldn't find anything matching "{searchParams.get("q")}"</p>
        </div>
      )}

    </div>
  );
}