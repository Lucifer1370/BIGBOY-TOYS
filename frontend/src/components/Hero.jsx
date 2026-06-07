import React from "react";
import { Button } from "@base-ui/react";
import shopping from "../assets/shopping (1).webp";
const Hero = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-md">
                🔥 Trending Deals 2026
              </span>

              <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight tracking-tight">
                Shop Smart.
                <br />
                Save More.
                <br />
                With <span className="text-yellow-300">Shopix</span>
              </h1>

              <p className="mt-6 text-lg text-blue-100 max-w-lg leading-relaxed">
                Discover the latest electronics, fashion, gadgets and
                accessories at unbeatable prices. Fast delivery, secure payments
                and amazing deals every day.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
                  Shop Now
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-6 rounded-xl transition-all duration-300"
                >
                  View Deals
                </Button>
              </div>

              <div className="flex gap-10 mt-12">
                <div>
                  <h3 className="text-3xl font-bold">10K+</h3>
                  <p className="text-blue-100">Products</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">5K+</h3>
                  <p className="text-blue-100">Customers</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">99%</h3>
                  <p className="text-blue-100">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
                <img
                  src={shopping}
                  alt="Shopping"
                  className="w-full max-w-md lg:max-w-xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
