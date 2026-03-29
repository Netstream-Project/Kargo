import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-slate-200/50 px-4 py-2 rounded-md flex items-center gap-2">
        <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
        <input className="bg-transparent outline-none text-sm w-48" placeholder="Search manifest..." />
      </div>
      <button className="p-2 bg-slate-900 text-white rounded-md">
        <span className="material-symbols-outlined text-sm">filter_list</span>
      </button>
      <Link href="/containers/new">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4A0404] text-white rounded-md font-bold text-sm">
          <span className="material-symbols-outlined text-sm">add</span>
          New Container
        </button>
      </Link>
    </div>
  );
}