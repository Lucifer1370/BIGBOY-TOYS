import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";

const FuelPrefStep = ({ fuelPref, setFuelPref, handleNextStep, handlePrevStep }) => {
  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mx-auto">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">What is your fuel engine preference?</h2>
        <p className="text-slate-400 text-xs">We structure options matching your carbon footprint and running economy plans.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {["Petrol", "Diesel", "Electric", "Hybrid", "No Preference"].map((fuel) => (
          <button
            key={fuel}
            type="button"
            onClick={() => setFuelPref(fuel)}
            className={`p-5 border rounded-2xl font-black text-sm transition flex flex-col items-center gap-2 cursor-pointer ${
              fuelPref === fuel
                ? "bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-500/20"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
            } ${fuel === "No Preference" ? "col-span-2" : ""}`}
          >
            <span className="text-base font-extrabold uppercase">{fuel}</span>
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

export default FuelPrefStep;
