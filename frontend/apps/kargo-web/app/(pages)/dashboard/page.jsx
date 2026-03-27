import Sidebar from '../../components/global/Sidebar';
import TopHeader from '../../components/global/TopHeader';
import ContainerGrid from '../../components/containers/ContainerGrid';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      
      {/* 1. Add the Sidebar back in */}
      <Sidebar />
      
      {/* 2. Wrap the content in a <main> tag that adds a 64-unit margin to the left */}
     <main className="flex-grow px-12 pb-12 pt-8 w-full">
        <TopHeader />
        <ContainerGrid />
      </main>
      
    </div>
  );
}