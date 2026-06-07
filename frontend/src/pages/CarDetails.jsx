import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShieldAlert, Sparkles, User, Calendar, MapPin, Fuel, Shield, CircleDollarSign, Zap, HelpCircle, Check, AlertTriangle, Compass } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import { MOCK_CAR_DETAILS } from "@/utils/mockData";

const SHOWROOMS = [
  "BigBoyToys Elite - Bhopal Center",
  "BigBoyToys Premium - Indore Highway Mall",
  "BigBoyToys Showroom - Mumbai Bandra",
  "BigBoyToys Hub - Delhi Connaught Place"
];

const CarDetails = () => {
  const { carId } = useParams();
  const { user } = useSelector((store) => store.user);

  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [calculatedEmi, setCalculatedEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const [dailyDistance, setDailyDistance] = useState(40);
  const [fuelPrice, setFuelPrice] = useState(105);
  const [monthlyFuelCost, setMonthlyFuelCost] = useState(0);
  const [yearlyFuelCost, setYearlyFuelCost] = useState(0);

  const [selectedShowroom, setSelectedShowroom] = useState(SHOWROOMS[0]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM - 12:00 PM");
  const [bookingPhone, setBookingPhone] = useState(user?.phone || "");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/car/${carId}`);
        if (res.data.success) {
          setCar(res.data.car);
          setReviews(res.data.reviews || []);
          setActiveImage(res.data.car.image);
        } else {
          loadMockDetails();
        }
      } catch (error) {
        console.log("Error loading details, using mock:", error);
        loadMockDetails();
      } finally {
        setLoading(false);
      }
    };

    const loadMockDetails = () => {
      const mockObj = MOCK_CAR_DETAILS[carId] || MOCK_CAR_DETAILS["mock1"];
      setCar(mockObj);
      setActiveImage(mockObj.image);
      setReviews([
        { userName: "Anuj Soni", rating: 5, comment: "Absolutely incredible performance! Worth every single Lakh. The acceleration is mindblowing." },
        { userName: "Rahul Sharma", rating: 4, comment: "Suspension is a bit stiff in the city, but handles like a dream on highways." }
      ]);
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    if (!car) return;
    const principal = (car.price - downPayment) * 100000;
    if (principal <= 0) {
      setCalculatedEmi(0);
      setTotalInterest(0);
      return;
    }
    const r = interestRate / 12 / 100;
    const n = loanTerm * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    setCalculatedEmi(Math.round(emi));
    setTotalInterest(Math.round(totalAmount - principal));
  }, [car, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    if (!car) return;
    const distancePerMonth = dailyDistance * 30.4;
    let fuelUsed;
    if (car.fuelType === "Electric") {
      const costPerMonth = dailyDistance * 30.4 * 1.5;
      setMonthlyFuelCost(Math.round(costPerMonth));
      setYearlyFuelCost(Math.round(costPerMonth * 12));
    } else {
      fuelUsed = distancePerMonth / car.mileage;
      const costPerMonth = fuelUsed * fuelPrice;
      setMonthlyFuelCost(Math.round(costPerMonth));
      setYearlyFuelCost(Math.round(costPerMonth * 12));
    }
  }, [car, dailyDistance, fuelPrice]);

  const handleBookTestDrive = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a test drive!");
      return;
    }
    if (!bookingDate || !bookingPhone) {
      toast.error("Please fill in date and contact phone number!");
      return;
    }
    bookingLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        "http://localhost:3000/api/v1/booking",
        {
          carId: car._id,
          showroomName: selectedShowroom,
          bookingDate,
          bookingTime,
          phone: bookingPhone,
          notes: bookingNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Test Drive booked successfully! Check status in Dashboard.");
        setBookingNotes("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to post a review!");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please enter a review description!");
      return;
    }
    setReviewLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        `http://localhost:3000/api/v1/car/${car._id}/review`,
        {
          rating: reviewRating,
          comment: reviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Review submitted!");
        setReviews([res.data.review, ...reviews]);
        setReviewComment("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Review posting failed");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-16 text-center animate-pulse space-y-4">
        <div className="max-w-md mx-auto h-80 bg-slate-900 rounded-3xl"></div>
        <div className="h-6 w-48 bg-slate-900 mx-auto rounded-md"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen py-16 text-center">
        <p className="text-xl font-bold">Vehicle Details Not Found</p>
      </div>
    );
  }

  const baseServiceCost = car.maintenanceCostPerYear;
  const yearlyMaintenanceCosts = [
    { year: "Year 1", cost: baseServiceCost, parts: "General Service, Oil Filter" },
    { year: "Year 2", cost: Math.round(baseServiceCost * 1.15), parts: "Brake Fluid, Spark plugs" },
    { year: "Year 3", cost: Math.round(baseServiceCost * 1.3), parts: "Battery checkup, Alignments" },
    { year: "Year 4", cost: Math.round(baseServiceCost * 1.65), parts: "Tyres replacement, Brake pads" },
    { year: "Year 5", cost: Math.round(baseServiceCost * 1.4), parts: "Coolant swap, Suspension tuning" }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 overflow-hidden shadow-2xl">
              <img
                src={activeImage}
                alt={car.name}
                className="w-full h-80 md:h-96 object-cover rounded-2xl"
              />
            </div>

            {car.gallery && car.gallery.length > 0 && (
              <div className="flex gap-4">
                {car.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 rounded-xl border overflow-hidden cursor-pointer transition ${
                      activeImage === img ? "border-blue-500 scale-105" : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-3.5 py-1 rounded-full font-extrabold uppercase tracking-widest">
                  {car.category} Body Style
                </span>
                <span className="text-yellow-400 font-extrabold flex items-center gap-0.5 text-sm">
                  <Star size={16} fill="currentColor" /> {car.safetyRating}.0 NCAP Safety
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{car.name}</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{car.brand} Luxury Engineering</p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">{car.description}</p>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 gap-4 shadow-md">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ex-Showroom Price</span>
                <span className="text-2xl font-black text-white mt-1 block">₹ {car.price} Lakh*</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">On-Road Est. Cost</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">₹ {car.onRoadPrice} Lakh*</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl">
                <Fuel size={20} className="text-blue-400 mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Fuel System</span>
                <span className="font-extrabold text-sm text-white mt-1 block">{car.fuelType}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl">
                <Zap size={20} className="text-indigo-400 mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Horsepower</span>
                <span className="font-extrabold text-sm text-white mt-1 block">{car.horsepower} BHP</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl">
                <Shield size={20} className="text-purple-400 mx-auto mb-2" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">ADAS Safe</span>
                <span className="font-extrabold text-sm text-white mt-1 block">{car.adas ? "Enabled" : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              <Check size={20} /> Advantages & Pros
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              {car.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span> <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/30 p-8 rounded-3xl space-y-4">
            <h3 className="text-lg font-black text-rose-400 flex items-center gap-2">
              <AlertTriangle size={20} /> Disadvantages & Cons
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              {car.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span> <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-lg">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <CircleDollarSign className="text-blue-500" /> EMI Loan Calculator
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <label className="text-slate-400 font-bold uppercase tracking-widest">Down Payment (₹ Lakh)</label>
                <input
                  type="number"
                  min="0"
                  max={car.price - 1}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.min(car.price - 1, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-xl text-white outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 font-bold uppercase tracking-widest">Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  min="4"
                  max="20"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-xl text-white outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest">
                <span>Loan Term</span>
                <span className="text-blue-400 font-extrabold">{loanTerm} Years</span>
              </div>
              <div className="flex gap-2">
                {[3, 5, 7].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setLoanTerm(yr)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      loanTerm === yr
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-850/60 p-6 rounded-2xl flex items-center justify-between shadow-inner">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated Monthly EMI</span>
                <span className="text-3xl font-black text-blue-400 mt-1 block">₹ {calculatedEmi.toLocaleString("en-IN")}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Interest Payable</span>
                <span className="text-sm font-bold text-slate-300 mt-1 block">₹ {totalInterest.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-lg">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Compass className="text-indigo-500" /> Daily Running Expenses
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <label className="text-slate-400 font-bold uppercase tracking-widest">Daily Distance (km)</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={dailyDistance}
                  onChange={(e) => setDailyDistance(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-xl text-white outline-none focus:border-blue-500 transition"
                />
              </div>

              {car.fuelType !== "Electric" && (
                <div className="space-y-2">
                  <label className="text-slate-400 font-bold uppercase tracking-widest">Fuel Rate (₹/L)</label>
                  <input
                    type="number"
                    min="50"
                    max="200"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-xl text-white outline-none focus:border-blue-500 transition"
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-850/60 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Monthly Expense</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">₹ {monthlyFuelCost.toLocaleString("en-IN")}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Yearly Fuel Running Cost</span>
                <span className="text-lg font-bold text-slate-300 mt-1 block">₹ {yearlyFuelCost.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-start gap-1">
              <span>* Based on rated mileage of</span>
              <span className="text-slate-400 font-bold">{car.mileage} {car.fuelType === "Electric" ? "km per full charge" : "km/l"}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-lg">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="text-purple-500" /> 5-Year Maintenance Cost Predictor
            </h3>
            <p className="text-xs text-slate-400 mt-1">Estimated annual maintenance schedules and core parts servicing requirements.</p>
          </div>

          <div className="space-y-4">
            {yearlyMaintenanceCosts.map((yrObj, idx) => {
              const maxVal = baseServiceCost * 1.8;
              const percent = (yrObj.cost / maxVal) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300 font-extrabold">{yrObj.year}</span>
                    <span className="text-slate-500 text-[11px]">{yrObj.parts}</span>
                    <span className="text-purple-400 font-bold">₹ {yrObj.cost.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                    <div
                      style={{ width: `${percent}%` }}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-lg">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Calendar className="text-teal-500" /> Book an Official Test Drive
            </h3>
            <p className="text-xs text-slate-400 mt-1">Book an appointment at your closest BigBoyToys partner showroom location.</p>
          </div>

          <form onSubmit={handleBookTestDrive} className="grid md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <MapPin size={14} className="text-teal-400" /> Showroom Dealer
              </label>
              <select
                value={selectedShowroom}
                onChange={(e) => setSelectedShowroom(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-teal-500 transition"
              >
                {SHOWROOMS.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Calendar size={14} className="text-teal-400" /> Scheduled Date
              </label>
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                Preferred Time Slot
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-teal-500 transition"
              >
                <option value="10:00 AM - 12:00 PM">Morning (10 AM - 12 PM)</option>
                <option value="12:00 PM - 02:00 PM">Noon (12 PM - 2 PM)</option>
                <option value="02:00 PM - 04:00 PM">Afternoon (2 PM - 4 PM)</option>
                <option value="04:00 PM - 06:00 PM">Evening (4 PM - 6 PM)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Mobile Contact Phone</label>
              <input
                type="text"
                placeholder="Enter 10 digit mobile..."
                required
                value={bookingPhone}
                onChange={(e) => setBookingPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Special Requests / Notes</label>
              <input
                type="text"
                placeholder="E.g. Requesting home test-drive delivery..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="md:col-span-3 pt-2">
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-teal-500/20 cursor-pointer"
              >
                {bookingLoading ? "Booking Schedule..." : "Secure Test Drive Slot"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-lg">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Star className="text-yellow-500" /> Customer Ratings & Reviews
          </h3>

          <form onSubmit={handlePostReview} className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs">
            <h4 className="font-extrabold text-white text-sm">Add Your Experience</h4>
            
            <div className="flex gap-2 items-center">
              <span className="text-slate-400 font-bold">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setReviewRating(num)}
                    className="p-1 text-yellow-400 cursor-pointer transition hover:scale-110"
                  >
                    <Star size={20} fill={num <= reviewRating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Review Comments</label>
              <textarea
                placeholder="Share your driving experiences, handling feedback, suspension comfort..."
                required
                rows="3"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-blue-500 transition text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={reviewLoading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          <div className="space-y-4 pt-2">
            {reviews.length === 0 ? (
              <p className="text-slate-500 text-sm">No reviews added for this car yet. Be the first to add your review!</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="p-5 bg-slate-950/60 border border-slate-850 rounded-2xl flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold shrink-0">
                    <User size={16} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-white">{rev.userName}</span>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{rev.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarDetails;
