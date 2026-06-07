import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ShieldAlert, Sparkles, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

import PersonalInfo from "@/components/profile/PersonalInfo";
import WishlistTab from "@/components/profile/WishlistTab";
import BookingsTab from "@/components/profile/BookingsTab";
import AdminDashboard from "@/components/profile/AdminDashboard";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem("accessToken");

  const [activeTab, setActiveTab] = useState("details");

  if (!user) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-16 text-center animate-none">
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-12 rounded-3xl space-y-4 shadow-xl">
          <ShieldAlert size={40} className="text-red-500 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold">Access Denied</h3>
          <p className="text-slate-400 text-sm">Please login with your account to consult the dashboard console.</p>
          <Link to="/login" className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl text-xs uppercase transition shadow-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-300 text-3xl font-black shadow-inner select-none">
              {user.firstName[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{user.firstName} {user.lastName}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 select-none">
                <Sparkles size={12} className="text-blue-400 animate-pulse" /> Registered as Showroom {user.role === "admin" ? "Console Admin" : "Buyer Partner"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider bg-slate-950/60 p-2.5 rounded-2xl border border-slate-850">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "details" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Account Info
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`px-4 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "wishlist" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Saved Cars
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "bookings" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Booked Drives
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-4 py-2.5 rounded-xl cursor-pointer transition flex items-center gap-1 bg-gradient-to-r ${
                  activeTab === "admin"
                    ? "from-blue-600 to-indigo-600 text-white border border-blue-500/20"
                    : "text-blue-400 hover:text-blue-300 font-semibold animate-pulse"
                }`}
              >
                <LayoutDashboard size={14} /> Admin Dashboard
              </button>
            )}
          </div>
        </div>

        {activeTab === "details" && <PersonalInfo user={user} accessToken={accessToken} />}

        {activeTab === "wishlist" && <WishlistTab accessToken={accessToken} />}

        {activeTab === "bookings" && <BookingsTab accessToken={accessToken} />}

        {activeTab === "admin" && user.role === "admin" && <AdminDashboard accessToken={accessToken} />}

      </div>
    </div>
  );
};

export default Profile;