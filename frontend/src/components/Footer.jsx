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
    <footer className="bg-slate-950 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                S
              </div>

              <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shopix
              </h2>
            </Link>

            <p className="text-sm text-gray-400 leading-6">
              Your one-stop destination for electronics, fashion,
              gadgets and unbeatable deals.
            </p>

            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>Bhopal, Madhya Pradesh</p>
              <p>Email: support@shopix.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Customer Service
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer transition">
                Contact Us
              </li>

              <li className="hover:text-blue-400 cursor-pointer transition">
                Shipping & Returns
              </li>

              <li className="hover:text-blue-400 cursor-pointer transition">
                FAQs
              </li>

              <li className="hover:text-blue-400 cursor-pointer transition">
                Order Tracking
              </li>

              <li className="hover:text-blue-400 cursor-pointer transition">
                Size Guide
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-xl">

              <a href="#">
                <FaFacebookF className="hover:text-blue-500 transition" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>

              <a href="#">
                <FaPinterest className="hover:text-red-500 transition" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-sky-500 transition" />
              </a>

            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and latest products.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-l-xl outline-none"
              />

              <button className="px-5 bg-linear-to-r from-blue-600 to-purple-600 rounded-r-xl text-white font-medium hover:opacity-90">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026 <span className="text-purple-400">Shopix</span>. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;