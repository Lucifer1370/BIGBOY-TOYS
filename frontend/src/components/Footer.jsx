import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 flex items-center justify-center text-white border border-amber-500/30 shadow-md">
                <span className="bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-black text-xl italic tracking-wider">
                  B
                </span>
              </div>

              <h2 className="text-2xl font-black bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent flex items-baseline select-none">
                BigBoy
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-black ml-1">
                  Toys
                </span>
              </h2>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              Your elite companion for premium luxury vehicles, smart spec comparisons, AI compatibility matchmakers, and on-road expense calculations.
            </p>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Bhopal, Madhya Pradesh</p>
              <p>Email: support@bigboytoys.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Pages
            </h3>

            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home Catalog
                </Link>
              </li>

              <li>
                <Link to="/explorer" className="hover:text-blue-400 transition">
                  Explore Vehicles
                </Link>
              </li>

              <li>
                <Link to="/ai-recommend" className="hover:text-blue-400 transition">
                  AI Matchmaker
                </Link>
              </li>

              <li>
                <Link to="/showrooms" className="hover:text-blue-400 transition">
                  Showrooms Locator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-lg text-gray-400">

              <a href="#" aria-label="Facebook">
                <FaFacebookF className="hover:text-blue-500 transition" />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>

              <a href="#" aria-label="Pinterest">
                <FaPinterest className="hover:text-red-500 transition" />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter className="hover:text-sky-500 transition" />
              </a>

            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>

            <p className="text-xs text-gray-400 mb-4">
              Subscribe for exclusive luxury vehicle launches and dealer news.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-l-xl outline-none text-xs text-white"
              />

              <button className="px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-r-xl text-white text-xs font-bold transition duration-300">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 mt-10 pt-6 text-center text-xs text-gray-500">
          © 2026 <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-extrabold">BigBoy Toys</span>. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;