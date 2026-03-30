"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ContainerCard from "../../components/containers/ContainerCard";

export default function ContainersPage() {
  const [containers, setContainers] = useState([]);
  
  // 1. Grab the search query from the URL
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

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

    window.addEventListener('kargo_update', loadContainers);
    return () => window.removeEventListener('kargo_update', loadContainers);
  }, []);

  // 2. FILTER LOGIC: Only keep containers that match the search query
  const filteredContainers = containers.filter((container) => 
    container.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    container.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-10 pb-20 mt-8">
      {/* Responsive Grid Setup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        
        {/* Render the FILTERED list */}
        {filteredContainers.map((container, idx) => (
          <ContainerCard
            key={idx}
            id={container.id}
            status={container.status}
            updatedAt={container.updatedAt}
            photoCount={container.photoCount}
          />
        ))}

        {/* Empty State if search finds nothing */}
        {filteredContainers.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
             <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
             <p className="font-bold text-lg">No containers found matching "{searchQuery}"</p>
          </div>
        )}

      </div>
    </div>
  );
}