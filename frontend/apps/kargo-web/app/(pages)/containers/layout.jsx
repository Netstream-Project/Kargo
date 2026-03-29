import Sidebar from "../../components/global/Sidebar";
import TopHeader from "../../components/containers/TopHeader";

export default function ContainersLayout({ children, modal }) {
  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="px-10 pt-10 pb-6 flex justify-between items-center">
          <div>
            <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Kargo / Containers
            </nav>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              Containers
            </h1>
          </div>
          <TopHeader />
        </div>
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          {children}
        </div>
      </main>
      {modal}
    </div>
  );
}