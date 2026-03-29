import ContainerCard from "../../components/containers/ContainerCard";

export default function ContainersPage() {
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

  return (
    <div className="px-10 pb-20 mt-8">
      {/* Responsive Grid Setup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {mockContainers.map((container) => (
          <ContainerCard
            key={container.id}
            id={container.id}
            status={container.status}
            updatedAt={container.updatedAt}
            photoCount={container.photoCount}
          />
        ))}
      </div>
    </div>
  );
}