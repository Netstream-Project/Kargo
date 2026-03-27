import "./globals.css";

export const metadata = {
  title: "KARGO - Logistics Management",
  description: "Enterprise container and fleet management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}