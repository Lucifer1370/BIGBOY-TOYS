import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCompare, clearCompare } from "@/redux/compareSlice";
import { Link } from "react-router-dom";
import { Trash2, GitCompare, ArrowRight, Gauge, Shield, Zap, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { FALLBACK_CAR_IMAGE } from "@/utils/config";

const Compare = () => {
  const dispatch = useDispatch();
  const { compareList } = useSelector((store) => store.compare);

  const handleRemove = (id, name) => {
    dispatch(removeFromCompare(id));
    toast.success(`Removed ${name} from comparisons.`);
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    toast.success("Cleared all comparisons.");
  };

  const renderCompareChart = (title, key, maxLimit, unit = "") => {
    if (compareList.length === 0) return null;

    return (
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-md">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Zap size={14} className="text-blue-500" /> {title} Comparison
        </h4>
        <div className="space-y-3">
          {compareList.map((car, idx) => {
            const val = Number(car[key]) || 0;
            const percent = Math.min(100, (val / maxLimit) * 100);
            return (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">{car.name}</span>
                  <span className="text-blue-400 font-bold">{val} {unit}</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                  <div
                    style={{ width: `${percent}%` }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getWinnerIndex = (key, lowerIsBetter = false) => {
    if (compareList.length < 2) return -1;
    let winningVal = lowerIsBetter ? Infinity : -Infinity;
    let winnerIdx = -1;

    compareList.forEach((car, idx) => {
      const val = Number(car[key]) || 0;
      if (lowerIsBetter) {
        if (val < winningVal) {
          winningVal = val;
          winnerIdx = idx;
        }
      } else {
        if (val > winningVal) {
          winningVal = val;
          winnerIdx = idx;
        }
      }
    });
    return winnerIdx;
  };

  if (compareList.length === 0) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center rounded-full mx-auto">
            <GitCompare size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-2xl text-white">Compare List Empty</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore our smart catalog, select vehicles, and add them to compare up to 3 cars side-by-side.
            </p>
          </div>
          <Link
            to="/explorer"
            className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-blue-500/10"
          >
            Explore Vehicles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const mileageWinner = getWinnerIndex("mileage");
  const priceWinner = getWinnerIndex("price", true);
  const safetyWinner = getWinnerIndex("safetyRating");
  const hpWinner = getWinnerIndex("horsepower");

  const gridColsClass = compareList.length === 1 
    ? "md:grid-cols-1" 
    : compareList.length === 2 
      ? "md:grid-cols-2" 
      : "md:grid-cols-3";

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Vehicle Comparison Matrix</h1>
            <p className="text-slate-400 text-sm mt-2">Evaluate and compare specifications, pricing tiers, safety stars, and maintenance costs.</p>
          </div>
          <button
            onClick={handleClearAll}
            className="px-5 py-2.5 bg-slate-900 hover:bg-red-950 hover:text-red-300 border border-slate-800 hover:border-red-900 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 w-fit"
          >
            <Trash2 size={14} /> Clear Selection
          </button>
        </div>

        <div className={`grid gap-6 grid-cols-1 ${gridColsClass}`}>
          {compareList.map((car, idx) => (
            <div
              key={car._id || idx}
              className="bg-slate-900 border border-slate-850 p-6 rounded-3xl relative shadow-xl space-y-4"
            >
              <button
                onClick={() => handleRemove(car._id, car.name)}
                className="absolute top-4 right-4 p-2 bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-400 rounded-full border border-slate-800 hover:border-red-900 cursor-pointer transition"
                title="Remove vehicle"
              >
                <Trash2 size={14} />
              </button>

              <img
                src={car.image}
                alt={car.name}
                className="w-full h-44 object-cover rounded-2xl"
                onError={(e) => { e.target.src = FALLBACK_CAR_IMAGE; }}
              />

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
                  {car.brand} {car.category}
                </span>
                <h3 className="font-extrabold text-xl text-white">{car.name}</h3>
                <span className="text-lg font-black text-blue-400 block">₹ {car.price} Lakh*</span>
              </div>

              <Link
                to={`/car/${car._id}`}
                className="block text-center py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition"
              >
                Inspect Specs Details
              </Link>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {renderCompareChart("Horsepower Strength", "horsepower", 200, "BHP")}
          {renderCompareChart("Top Speed Velocity", "topSpeed", 200, "km/h")}
          {renderCompareChart("Service Overhead", "maintenanceCostPerYear", 20000, "INR / Yr")}
          {renderCompareChart("Energy Efficiency", "mileage", 500, "")}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400 animate-pulse" />
            <h4 className="text-sm font-extrabold text-white">Full Specifications Comparison Matrix</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300 text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase bg-slate-950/30">
                  <th className="px-6 py-4">Specification Parameter</th>
                  {compareList.map((car, idx) => (
                    <th key={idx} className="px-6 py-4 font-extrabold text-white">
                      {car.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/80">
                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Ex-Showroom Price</td>
                  {compareList.map((car, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-3.5 font-bold ${
                        idx === priceWinner ? "text-emerald-400 bg-emerald-950/10" : ""
                      }`}
                    >
                      ₹ {car.price} Lakh {idx === priceWinner && "🏆 (Best Price)"}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Fuel Structure</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="px-6 py-3.5">
                      {car.fuelType}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Gearbox Shift</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="px-6 py-3.5">
                      {car.transmission}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">NCAP Safety Standard</td>
                  {compareList.map((car, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-3.5 font-bold ${
                        idx === safetyWinner ? "text-emerald-400 bg-emerald-950/10" : ""
                      }`}
                    >
                      <span className="text-yellow-400 font-extrabold">{car.safetyRating}★</span> Stars
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Mileage / Range</td>
                  {compareList.map((car, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-3.5 font-bold ${
                        idx === mileageWinner ? "text-emerald-400 bg-emerald-950/10" : ""
                      }`}
                    >
                      {car.mileage} {car.fuelType === "Electric" ? "km per full charge" : "km/l"}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Engine Output</td>
                  {compareList.map((car, idx) => (
                    <td
                      key={idx}
                      className={`px-6 py-3.5 font-bold ${
                        idx === hpWinner ? "text-emerald-400 bg-emerald-950/10" : ""
                      }`}
                    >
                      {car.horsepower} BHP
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-850/20">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">Cabin Seating Capacity</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="px-6 py-3.5">
                      {car.seatingCapacity} Seater
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Compare;
