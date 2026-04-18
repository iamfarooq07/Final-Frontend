import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Modern Sidebar Icons (SVG)
  const Icons = {
    Home: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
    Stats: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
    Logout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] text-slate-900 font-sans">

      {/* 1. SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col p-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic">N</div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Nova.</span>
        </div>

        <nav className="flex-1 space-y-2">
          {['Overview', 'Analytics', 'Projects', 'Settings'].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
              {i === 0 ? <Icons.Home /> : <Icons.Stats />}
              {item}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all mt-auto"
        >
          <Icons.Logout /> Logout
        </button>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase italic">Dashboard <span className="text-blue-600">/</span> Overview</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 leading-none">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.email}</p>
            </div>
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`} className="w-10 h-10 rounded-xl border-2 border-slate-100" />
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Welcome Message */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hello {user?.name.split(' ')[0]} 👋</h1>
              <p className="text-slate-500 font-medium mt-1">Here's what's happening with your projects today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: 'Total Projects', value: '12', color: 'bg-blue-600' },
                { label: 'Completed', value: '08', color: 'bg-green-500' },
                { label: 'In Progress', value: '04', color: 'bg-amber-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
                    <div className={`w-10 h-2 rounded-full ${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Table Area */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-black text-slate-900 italic uppercase">Recent Activity</h4>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
              </div>

              {/* Placeholder for Table */}
              <div className="space-y-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-slate-400 shadow-sm">#{item}</div>
                      <div>
                        <p className="font-black text-slate-800 text-sm italic uppercase">Project Alpha-0{item}</p>
                        <p className="text-xs text-slate-500 font-medium">Updated 2 hours ago</p>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}