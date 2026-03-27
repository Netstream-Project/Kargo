import React from 'react';

export default function ContainerGrid() {
  // DRY Array for our recent containers
  const recentContainers = [
    { id: 'KRG-90210', photos: 12, status: 'normal' },
    { id: 'KRG-88321', photos: 8, status: 'normal' },
    { id: 'KRG-77211', status: 'pending' }, // Error state
    { id: 'KRG-44122', photos: 24, status: 'normal' },
    { id: 'KRG-33900', photos: 5, status: 'normal' },
  ];

  return (
    <section>
      {/* Grid Header & Controls */}
      <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
        <h2 className="font-headline font-extrabold text-2xl tracking-tight text-tertiary">Recent Containers</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-surface-container-high rounded-lg text-outline hover:text-tertiary transition-colors">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="p-2 bg-surface-container-low rounded-lg text-outline hover:text-tertiary transition-colors">
            <span className="material-symbols-outlined">list</span>
          </button>
        </div>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        
        {recentContainers.map((container, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col items-center justify-center transition-all group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-outline-variant/20 h-48">
              
              {/* Icon Logic based on Status */}
              <div className="mb-4">
  {container.status === 'pending' ? (
    <span className="material-symbols-outlined text-[#460003] text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>folder_special</span>
  ) : (
    <span className="material-symbols-outlined text-[#3a5f94] text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>folder</span>
  )}
</div>

              <span className="font-label text-tertiary font-bold tracking-tight text-sm mb-2">{container.id}</span>
              
              {/* Badge Logic */}
              {container.status === 'pending' ? (
                <div className="flex items-center gap-1.5 bg-error-container px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-on-error-container">warning</span>
                  <span className="text-[10px] font-bold text-on-error-container uppercase">Pending</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-secondary-fixed px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-on-secondary-fixed-variant">image</span>
                  <span className="text-[10px] font-bold text-on-secondary-fixed-variant uppercase">{
                    container.photos < 10 ? `0${container.photos}` : container.photos
                  } Photos</span>
                </div>
              )}

            </div>
          </div>
        ))}

        {/* Add New Container Button */}
        <div className="group cursor-pointer">
          <div className="bg-surface border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:bg-surface-container-low hover:border-secondary h-48">
            <span className="material-symbols-outlined text-outline group-hover:text-secondary text-5xl mb-4">create_new_folder</span>
            <span className="font-label text-outline group-hover:text-secondary font-bold tracking-tight text-xs uppercase">New Entry</span>
          </div>
        </div>

      </div>
    </section>
  );
}