import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { GitCompare, LogOut, User, Menu, X } from 'lucide-react';
import { Button } from '@base-ui/react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { useEffect } from 'react';
import { API_BASE_URL } from '@/utils/config';

const Navbar = () => {
  const { user } = useSelector(store => store.user)
  const { compareList } = useSelector(store => store.compare)
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const Logoutout = async () => {
    try {
      const currentToken = localStorage.getItem("accessToken");
      const res = await axios.post(`${API_BASE_URL}/api/v1/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Logout backend request failed, clearing locally:", error);
    } finally {
      dispatch(setUser(null));
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] border border-amber-500/30 group-hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-500 transform group-hover:scale-105 shrink-0">
            <span className="bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-black text-xl sm:text-2xl italic tracking-wider">
              B
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl tracking-tight flex items-baseline select-none">
            <span className="bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent font-black">
              BigBoy
            </span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-black ml-1">
              Toys
            </span>
          </h1>
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 font-medium text-slate-300">

            <Link to="/">
              <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-sm tracking-wide">
                Home
              </li>
            </Link>

            <Link to="/explorer">
              <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-sm tracking-wide">
                Explore Cars
              </li>
            </Link>

            <Link to="/ai-recommend">
              <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-sm tracking-wide bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-3 py-1 rounded-full border border-blue-500/20 text-blue-300 font-semibold animate-pulse">
                AI Matchmaker
              </li>
            </Link>

            <Link to="/showrooms">
              <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-sm tracking-wide">
                Showrooms
              </li>
            </Link>

            {user && (
              <Link to="/profile">
                <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer text-sm tracking-wide">
                  Dashboard
                </li>
              </Link>
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">

          <Link
            to="/compare"
            className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition group"
            title="Compare vehicles"
          >
            <GitCompare
              size={20}
              className="text-slate-300 group-hover:text-blue-400 transition"
            />

            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] min-w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md border border-slate-900 animate-bounce">
                {compareList.length}
              </span>
            )}
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300">
                    {user.firstName[0]}
                  </div>
                  <span className="text-sm font-medium">Hi, {user.firstName}</span>
                </Link>
                <Button onClick={Logoutout} className="px-4 py-2 bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-900 border border-slate-700 text-slate-300 rounded-xl shadow-md text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5">
                  <LogOut size={14} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 border border-blue-400/20 cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>


          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition cursor-pointer animate-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>


      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-4 absolute left-0 right-0 top-20 shadow-xl z-40 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-4 font-medium text-slate-300">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <li className="hover:text-blue-400 transition-all duration-300 py-2 border-b border-slate-800 text-sm tracking-wide">
                Home
              </li>
            </Link>
            <Link to="/explorer" onClick={() => setMobileMenuOpen(false)}>
              <li className="hover:text-blue-400 transition-all duration-300 py-2 border-b border-slate-800 text-sm tracking-wide">
                Explore Cars
              </li>
            </Link>
            <Link to="/ai-recommend" onClick={() => setMobileMenuOpen(false)}>
              <li className="hover:text-blue-300 transition-all duration-300 py-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-300 font-semibold inline-block text-sm tracking-wide">
                AI Matchmaker
              </li>
            </Link>
            <Link to="/showrooms" onClick={() => setMobileMenuOpen(false)}>
              <li className="hover:text-blue-400 transition-all duration-300 py-2 border-b border-slate-800 text-sm tracking-wide">
                Showrooms
              </li>
            </Link>
            {user && (
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <li className="hover:text-blue-400 transition-all duration-300 py-2 border-b border-slate-800 text-sm tracking-wide">
                  Dashboard
                </li>
              </Link>
            )}
          </ul>

          <div className="pt-4 border-t border-slate-800 sm:hidden">
            {user ? (
              <div className="flex flex-col gap-3 text-left">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300">
                    {user.firstName[0]}
                  </div>
                  <span className="text-sm font-medium">Hi, {user.firstName}</span>
                </div>
                <Button
                  onClick={() => { Logoutout(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 bg-slate-850 hover:bg-red-950 hover:text-red-300 hover:border-red-900 border border-slate-700 text-slate-300 rounded-xl shadow-md text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all duration-300 flex items-center justify-center border border-blue-400/20 cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar