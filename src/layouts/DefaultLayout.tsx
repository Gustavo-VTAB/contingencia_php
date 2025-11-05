import Navbar from "../components/Navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
