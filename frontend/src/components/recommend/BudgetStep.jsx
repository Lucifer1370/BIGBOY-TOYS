import React from "react";
import { CircleDollarSign, ChevronRight } from "lucide-react";

const BudgetStep = ({ budget, setBudget, handleNextStep }) => {
  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto">
          <CircleDollarSign size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">What is your ex-showroom budget limit?</h2>
        <p className="text-slate-400 text-xs">We will highlight premium vehicles optimized to fit your budget plans.</p>
      </div>

      <div className="space-y-4 pt-4 text-center">
        <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          ₹ {budget} Lakh
        </span>
        <input
          type="range"
          min="5"
          max="80"
          step="1"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-500 font-bold">
          <span>₹ 5 Lakh</span>
          <span>₹ 80 Lakh</span>
        </div>
      </div>

      <button
        onClick={handleNextStep}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-1"
      >
        Continue <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default BudgetStep;
