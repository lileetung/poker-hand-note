import Navbar from "@/components/Navbar";

export default function ProfitTracker() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">損益紀錄</h1>
        {/* Add your profit tracker content here */}
        <div className="bg-[#1A1A1A] rounded-lg p-6">
          <p className="text-gray-400">即將推出更多功能...</p>
        </div>
      </div>
    </div>
  );
} 