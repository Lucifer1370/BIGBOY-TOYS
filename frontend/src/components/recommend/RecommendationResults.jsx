import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const RecommendationResults = ({ recommendations, priority, handleRetake }) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-3 text-left">
          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Match Outcomes Complete
          </span>
          <h2 className="text-3xl font-black text-white">Your Best-Fit Matches!</h2>
          <p className="text-slate-400 text-xs max-w-md">
            BigBoyToys AI successfully evaluated all vehicles based on your selected priority of <span className="text-blue-400 font-extrabold">{priority}</span>.
          </p>
        </div>

        <button
          onClick={handleRetake}
          className="px-5 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Re-run Matchmaker
        </button>
      </div>

      <div className="space-y-6">
        {recommendations.map((car, idx) => (
          <div
            key={car._id || idx}
            className="bg-slate-900 border border-slate-850 hover:border-blue-500/30 rounded-3xl p-6 md:p-8 grid md:grid-cols-12 gap-8 shadow-xl items-center relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 text-xs px-4 py-1.5 rounded-full font-black border border-amber-400/20 shadow-md">
              🔥 {car.matchPercentage}% Match
            </div>

            <div className="md:col-span-4">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-44 object-cover rounded-2xl shadow-md border border-slate-850"
              />
            </div>

            <div className="md:col-span-8 space-y-4 text-left">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                  Rank #{idx + 1} • {car.brand} {car.category}
                </span>
                <h3 className="font-extrabold text-2xl text-white mt-1">{car.name}</h3>
                <span className="text-xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent mt-1 block">₹ {car.price} Lakh*</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">AI Suitability Score:</span>
                  <span className="text-indigo-400">{car.suitabilityScore} / 100</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                  <div
                    style={{ width: `${car.suitabilityScore}%` }}
                    className="bg-gradient-to-r from-indigo-500 to-teal-500 h-full rounded-full"
                  ></div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-850/60 p-4 rounded-xl space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold block">Why this fits your lifestyle:</span>
                {car.reasons.map((re, rIdx) => (
                  <div key={rIdx} className="flex gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{re}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to={`/car/${car._id}`}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:scale-105"
                >
                  Inspect Vehicle Details <ChevronRight size={14} className="stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationResults;
