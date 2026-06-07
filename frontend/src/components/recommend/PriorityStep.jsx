import React from "react";
import { Award, Sparkles } from "lucide-react";

const PriorityStep = ({ priority, setPriority, handleNextStep, handlePrevStep }) => {
  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center mx-auto">
          <Award size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">What is your absolute top priority?</h2>
        <p className="text-slate-400 text-xs">We customize algorithm score weightings to match what you value most.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {[
          { name: "Safety", detail: "NCAP Stars, Airbags, ADAS safe" },
          { name: "Performance", detail: "Horsepower power, Twin-Turbo, Speed" },
          { name: "Economy", detail: "Mileage, Lower fuel running overheads" },
          { name: "Luxury", detail: "Cabin space, Cushioned suspension ride" },
        ].map((prio) => (
          <button
            key={prio.name}
            type="button"
            onClick={() => setPriority(prio.name)}
            className={`p-6 border rounded-2xl font-black text-sm transition flex flex-col items-center gap-2 cursor-pointer ${
              priority === prio.name
                ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-500/20"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
            }`}
          >
            <span className="text-base font-extrabold uppercase">{prio.name}</span>
            <span className="text-[10px] text-slate-500 font-bold block text-center leading-relaxed">
              {prio.detail}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex-1 py-3.5 bg-slate-950 border border-slate-800 text-slate-400 font-bold rounded-xl text-xs uppercase cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs uppercase cursor-pointer flex items-center justify-center gap-1"
        >
          Find AI Recommendations <Sparkles size={14} className="animate-spin" />
        </button>
      </div>
    </div>
  );
};

export default PriorityStep;
