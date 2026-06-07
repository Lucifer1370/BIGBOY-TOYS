import React from "react";
import { Users, ChevronRight } from "lucide-react";

const FamilySizeStep = ({ familySize, setFamilySize, handleNextStep, handlePrevStep }) => {
  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mx-auto">
          <Users size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">How many family members travel together?</h2>
        <p className="text-slate-400 text-xs">We evaluate interior seating structures to ensure optimal spacious seating comfort.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {[2, 4, 5, 7].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setFamilySize(num)}
            className={`p-6 border rounded-2xl font-black text-lg transition flex flex-col items-center gap-2 cursor-pointer ${
              familySize === num
                ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
            }`}
          >
            <span className="text-3xl">{num}</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {num === 2 ? "Couples" : num === 7 ? "Joint family" : "Standard"}
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
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default FamilySizeStep;
