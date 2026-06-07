import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import axios from "axios";

import { ALL_CARS_POOL } from "@/utils/mockData";
import BudgetStep from "@/components/recommend/BudgetStep";
import FamilySizeStep from "@/components/recommend/FamilySizeStep";
import EnvironmentStep from "@/components/recommend/EnvironmentStep";
import FuelPrefStep from "@/components/recommend/FuelPrefStep";
import PriorityStep from "@/components/recommend/PriorityStep";
import RecommendationResults from "@/components/recommend/RecommendationResults";

const AIRecommendation = () => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(15);
  const [familySize, setFamilySize] = useState(5);
  const [environment, setEnvironment] = useState("Mixed");
  const [fuelPref, setFuelPref] = useState("No Preference");
  const [priority, setPriority] = useState("Safety");

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      calculateRecommendations();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateRecommendations = async () => {
    setLoading(true);
    let carPool = ALL_CARS_POOL;
    try {
      const res = await axios.get("http://localhost:3000/api/v1/car");
      if (res.data.success && res.data.cars.length > 0) {
        carPool = res.data.cars;
      }
    } catch (e) {
      console.log("Could not load fresh cars pool, using local defaults.");
    }

    const scoredList = carPool.map((car) => {
      let score = 0;

      // Price mapping
      if (car.price <= budget) {
        score += 25;
      } else {
        const diff = car.price - budget;
        const deduction = Math.min(25, diff * 0.3);
        score += (25 - deduction);
      }

      // Seating capacity mapping
      if (car.seatingCapacity >= familySize) {
        score += 20;
        if (car.seatingCapacity === familySize) score += 5;
      } else {
        score += 5;
      }

      // Environment terrain mapping
      if (environment === "City") {
        if (car.category === "EV" || car.fuelType === "Electric" || car.mileage > 15) {
          score += 20;
        } else {
          score += 10;
        }
      } else if (environment === "Highway") {
        if (car.horsepower > 200 || car.category === "Sports" || car.category === "Luxury") {
          score += 20;
        } else {
          score += 10;
        }
      } else {
        score += 18;
      }

      // Fuel mapping
      if (fuelPref === "No Preference" || car.fuelType === fuelPref) {
        score += 15;
      } else {
        score += 5;
      }

      // Priority mapping
      if (priority === "Safety") {
        score += car.safetyRating * 4;
      } else if (priority === "Performance") {
        const hpBonus = Math.min(20, (car.horsepower / 600) * 20);
        score += hpBonus;
      } else if (priority === "Economy") {
        const mileageBonus = car.fuelType === "Electric" ? 20 : Math.min(20, (car.mileage / 20) * 20);
        score += mileageBonus;
      } else if (priority === "Luxury") {
        if (car.category === "Luxury" || car.category === "SUV") {
          score += 20;
        } else {
          score += 10;
        }
      }

      const matchPercentage = Math.min(99, Math.round(score));

      // Calculate matching reasons
      const reasons = [];
      if (car.price <= budget) {
        reasons.push(`Perfect fit for your ₹ ${budget} Lakh budget limit.`);
      } else {
        reasons.push(`Highly premium specs worth the slight ₹ ${Math.round(car.price - budget)} Lakh stretch.`);
      }

      if (priority === "Safety" && car.safetyRating >= 4) {
        reasons.push(`Top-tier ${car.safetyRating}-Star NCAP safety index guarantees family reassurance.`);
      }
      if (priority === "Performance" && car.horsepower > 300) {
        reasons.push(`High output engine producing ${car.horsepower} Horsepower matches your speed requirements.`);
      }
      if (priority === "Economy" && (car.fuelType === "Electric" || car.mileage > 12)) {
        reasons.push(`Extremely efficient fuel running helps reduce daily commuting service overheads.`);
      }
      if (car.seatingCapacity >= familySize) {
        reasons.push(`Spacious ${car.seatingCapacity}-seater interior comfortably accommodates all ${familySize} family members.`);
      }

      return {
        ...car,
        matchPercentage,
        reasons: reasons.slice(0, 2),
        suitabilityScore: Math.round(matchPercentage * 0.95),
      };
    });

    scoredList.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setTimeout(() => {
      setRecommendations(scoredList.slice(0, 3));
      setStep(6);
      setLoading(false);
    }, 1200);
  };

  const handleRetake = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">

        {step < 6 && (
          <div className="space-y-4 mb-10 text-center select-none">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" /> BigBoyToys AI Matchmaker
            </span>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${(step / 5) * 100}%` }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              ></div>
            </div>
            <span className="text-xs text-slate-500 font-semibold block">Step {step} of 5</span>
          </div>
        )}

        {/* Step components */}
        {step === 1 && (
          <BudgetStep
            budget={budget}
            setBudget={setBudget}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 2 && (
          <FamilySizeStep
            familySize={familySize}
            setFamilySize={setFamilySize}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}

        {step === 3 && (
          <EnvironmentStep
            environment={environment}
            setEnvironment={setEnvironment}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}

        {step === 4 && (
          <FuelPrefStep
            fuelPref={fuelPref}
            setFuelPref={setFuelPref}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}

        {step === 5 && (
          <PriorityStep
            priority={priority}
            setPriority={setPriority}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}

        {loading && (
          <div className="bg-slate-900 border border-slate-850 p-16 rounded-3xl text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400 animate-spin">
              <Sparkles size={28} />
            </div>
            <div className="space-y-2 animate-pulse">
              <h3 className="font-extrabold text-xl text-white">BigBoyToys AI Evaluating Listings...</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Our algorithm is matching ex-showroom prices, safety parameters, seating configurations, and engine details against your priorities...
              </p>
            </div>
          </div>
        )}

        {step === 6 && (
          <RecommendationResults
            recommendations={recommendations}
            priority={priority}
            handleRetake={handleRetake}
          />
        )}

      </div>
    </div>
  );
};

export default AIRecommendation;
