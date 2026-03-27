import Link from "next/link";

export default function ContainerCard({ id, status, updatedAt, photoCount }) {
  // Automatically apply the correct colors based on the container's status
  const getStatusStyles = (statusText) => {
    switch (statusText.toLowerCase()) {
      case 'in transit':
        return 'bg-secondary-fixed text-on-secondary-fixed-variant';
      case 'delayed':
        return 'bg-error-container text-on-error-container';
      case 'manifested':
        return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
      case 'cleared':
        return 'bg-surface-container-highest text-on-surface-variant';
      default:
        return 'bg-surface-container-highest text-on-surface-variant';
    }
  };

  return (
    <Link href="/containers/report">
    <div className="group bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden">
      {/* Decorative background curve */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150"></div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-start justify-between">
          {/* Note: Added fontVariationSettings to make the folder icon solid */}
          <span 
            className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors" 
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            folder_open
          </span>
          <span className={`${getStatusStyles(status)} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
            {status}
          </span>
        </div>
        
        <div>
          <h3 className="text-xl font-headline font-bold text-tertiary tracking-tight">{id}</h3>
          <p className="text-xs text-outline font-medium mt-1">{updatedAt}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-outline">image</span>
            <span className="text-xs font-bold text-on-surface-variant">{photoCount} Photos</span>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-secondary translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}