import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation Bar */}
      <nav className="bg-[#1A1A1A] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-medium">撲克筆記本</h1>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              會員
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-emerald-400">Poker Notebook 1.0</span> 籌備中
          </h2>
          <p className="text-gray-400 text-xl mb-6">
            更快的記錄速度，更方便的使用體驗。
          </p>
          <button className="bg-emerald-400 text-black px-6 py-3 rounded-md hover:bg-emerald-500 transition-colors">
            了解更多
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Profit Tracker Card */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#242424] transition-all cursor-pointer border border-gray-800">
            <div className="bg-emerald-950 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold mb-1">損益紀錄</h3>
            <p className="text-gray-400 text-sm">記錄您的撲克遊戲收益與支出，追蹤您的遊戲表現。</p>
          </div>

          {/* Hand History Card */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#242424] transition-all cursor-pointer border border-gray-800">
            <div className="bg-blue-950 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
              </svg>
            </div>
            <h3 className="text-base font-bold mb-1">手牌紀錄</h3>
            <p className="text-gray-400 text-sm">記錄重要牌局的細節，分析並改進您的遊戲策略。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
