import React from "react";
import { Sliders, ChevronRight } from "lucide-react";

const EnvironmentStep = ({ environment, setEnvironment, handleNextStep, handlePrevStep }) => {
  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto">
          <Sliders size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">Where is your primary driving environment?</h2>
        <p className="text-slate-400 text-xs">We evaluate gear transmissions and mileage capacities optimized for your roads.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2">
        {["City", "Highway", "Mixed"].map((env) => (
          <button
            key={env}
            type="button"
            onClick={() => setEnvironment(env)}
            className={`p-6 border rounded-2xl font-black text-sm transition flex flex-col items-center gap-2 cursor-pointer ${
              environment === env
                ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
            }`}
          >
            <span className="text-base font-extrabold uppercase">{env}</span>
            <span className="text-[10px] text-slate-500 font-bold leading-relaxed block text-center">
              {env === "City" ? "Daily Commute" : env === "Highway" ? "Long Touring" : "Mixed Roads"}
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

export default EnvironmentStep;
