import Sidebar from "../../components/global/Sidebar";

export default function ContainersLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-container-low text-on-background">
      {/* The Sidebar will sit fixed on the left */}
      <Sidebar />
      
      {/* The main content area will take up the rest of the screen and scroll independently */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}