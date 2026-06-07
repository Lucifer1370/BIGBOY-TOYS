import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, Check, RefreshCw, Star, Info, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare, toggleWishlistLocal } from "@/redux/compareSlice";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL, FALLBACK_CAR_IMAGE } from "@/utils/config";

import { MOCK_EXPLORER_CARS } from "@/utils/mockData";

const BRANDS = ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "MG", "BMW", "Mercedes", "Audi", "Renault", "Honda", "Toyota", "Skoda", "Volkswagen", "BYD"];
const CATEGORIES = ["SUV", "Sedan", "Hatchback", "Luxury", "Sports", "EV"];
const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];

const Explorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { compareList, wishlist } = useSelector((store) => store.compare);
  const { user } = useSelector((store) => store.user);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [maxPrice, setMaxPrice] = useState(80);
  const [minSafety, setMinSafety] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  const fetchFilteredCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedFuel) params.append("fuelType", selectedFuel);
      if (selectedTransmission) params.append("transmission", selectedTransmission);
      if (maxPrice < 80) params.append("maxPrice", maxPrice);
      if (minSafety > 0) params.append("minSafety", minSafety);
      if (sortBy) params.append("sort", sortBy);

      const res = await axios.get(`${API_BASE_URL}/api/v1/car?${params.toString()}`);
      if (res.data.success && res.data.cars.length > 0) {
        setCars(res.data.cars);
      } else {
        let filtered = MOCK_EXPLORER_CARS.filter((c) => {
          if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.brand.toLowerCase().includes(search.toLowerCase())) return false;
          if (selectedBrand && c.brand !== selectedBrand) return false;
          if (selectedCategory && c.category !== selectedCategory) return false;
          if (selectedFuel && c.fuelType !== selectedFuel) return false;
          if (selectedTransmission && c.transmission !== selectedTransmission) return false;
          if (c.price > maxPrice) return false;
          if (c.safetyRating < minSafety) return false;
          return true;
        });

        if (sortBy === "priceAsc") filtered.sort((a, b) => a.price - b.price);
        if (sortBy === "priceDesc") filtered.sort((a, b) => b.price - a.price);
        if (sortBy === "rating") filtered.sort((a, b) => b.safetyRating - a.safetyRating);

        setCars(filtered);
      }
    } catch (error) {
      console.log("Error fetching cars, using local filtered mock:", error);
      let filtered = MOCK_EXPLORER_CARS.filter((c) => {
        if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.brand.toLowerCase().includes(search.toLowerCase())) return false;
        if (selectedBrand && c.brand !== selectedBrand) return false;
        if (selectedCategory && c.category !== selectedCategory) return false;
        if (selectedFuel && c.fuelType !== selectedFuel) return false;
        if (selectedTransmission && c.transmission !== selectedTransmission) return false;
        if (c.price > maxPrice) return false;
        if (c.safetyRating < minSafety) return false;
        return true;
      });

      if (sortBy === "priceAsc") filtered.sort((a, b) => a.price - b.price);
      if (sortBy === "priceDesc") filtered.sort((a, b) => b.price - a.price);
      if (sortBy === "rating") filtered.sort((a, b) => b.safetyRating - a.safetyRating);

      setCars(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredCars();
  }, [search, selectedBrand, selectedCategory, selectedFuel, selectedTransmission, maxPrice, minSafety, sortBy]);

  const handleReset = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedFuel("");
    setSelectedTransmission("");
    setMaxPrice(80);
    setMinSafety(0);
    setSortBy("");
    setSearchParams({});
  };

  const handleAddToCompareList = (car) => {
    const exists = compareList.find((c) => c._id === car._id);
    if (exists) {
      toast.error("Car is already in the comparison list!");
      return;
    }
    if (compareList.length >= 3) {
      toast.error("You can compare up to 3 cars at the same time!");
      return;
    }
    dispatch(addToCompare(car));
    toast.success(`${car.name} added to comparison! Click the GitCompare icon in Navbar to view.`);
  };

  const handleToggleWishlist = async (car) => {
    if (!user) {
      dispatch(toggleWishlistLocal(car));
      toast.success(`${car.name} updated in temporary wishlist!`);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/wishlist`,
        { carId: car._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(toggleWishlistLocal(car));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not update wishlist on database");
    }
  };

  const isCarSaved = (carId) => {
    return wishlist.some((c) => c._id === carId || c === carId);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Smart Car Explorer</h1>
          <p className="text-slate-400 text-sm mt-2">Filter and inspect ex-showroom prices, safety parameters, transmission structures, and direct compatibility indexes.</p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 border border-slate-800 hover:border-blue-500/30 rounded-2xl font-bold text-sm text-slate-300 hover:text-white transition cursor-pointer"
          >
            <SlidersHorizontal size={16} className="text-blue-500" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          <div className={`${showMobileFilters ? "block" : "hidden"} lg:block lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit space-y-6 lg:sticky lg:top-24 shadow-xl`}>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="font-extrabold text-lg flex items-center gap-2 text-white">
                <SlidersHorizontal size={18} className="text-blue-500" /> Filters
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Brand or model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-xs text-white placeholder-slate-600 transition"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Budget Max</span>
                <span className="text-blue-400 font-extrabold text-sm normal-case">₹ {maxPrice} Lakh</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>₹ 5 Lakh</span>
                <span>₹ 80 Lakh</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manufacturer</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-xs text-white transition"
              >
                <option value="">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Body Style</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-xs text-white transition"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fuel Type</label>
              <div className="grid grid-cols-2 gap-2">
                {FUELS.map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => setSelectedFuel(selectedFuel === fuel ? "" : fuel)}
                    className={`px-3 py-2 border rounded-xl text-xs font-semibold tracking-wider transition ${selectedFuel === fuel
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gearbox</label>
              <div className="grid grid-cols-2 gap-2">
                {TRANSMISSIONS.map((trans) => (
                  <button
                    key={trans}
                    onClick={() => setSelectedTransmission(selectedTransmission === trans ? "" : trans)}
                    className={`px-3 py-2 border rounded-xl text-xs font-semibold tracking-wider transition ${selectedTransmission === trans
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                  >
                    {trans}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Safety rating</label>
              <div className="flex gap-2">
                {[3, 4, 5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinSafety(minSafety === stars ? 0 : stars)}
                    className={`flex-1 py-2 border rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1 ${minSafety === stars
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                  >
                    <Star size={12} fill={minSafety === stars ? "white" : "none"} /> {stars}★+
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">

            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-3xl shadow-md">
              <span className="text-sm text-slate-400 font-bold">
                Found <span className="text-blue-400 font-extrabold">{cars.length}</span> luxury matches
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-850 outline-none rounded-xl text-xs text-white focus:border-blue-500 transition"
                >
                  <option value="">Latest Arrival</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Safety Rating</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-900 h-96 border border-slate-800 rounded-3xl"></div>
                ))}
              </div>
            ) : cars.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center space-y-4 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center mx-auto text-slate-500 border border-slate-800">
                  <Info size={30} />
                </div>
                <h3 className="font-extrabold text-xl text-white">No Vehicles Match Your Filter</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Try relaxing your budget, picking a different fuel type, or clicking the reset button above.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {cars.map((car, index) => {
                  const saved = isCarSaved(car._id);
                  return (
                    <div
                      key={car._id || index}
                      className="bg-slate-900 border border-slate-855 hover:border-blue-500/30 rounded-3xl shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-52 object-cover"
                          onError={(e) => { e.target.src = FALLBACK_CAR_IMAGE; }}
                        />

                        <button
                          onClick={() => handleToggleWishlist(car)}
                          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border cursor-pointer transition ${saved
                              ? "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20"
                              : "bg-slate-950/80 border-slate-700/60 text-slate-300 hover:text-white"
                            }`}
                        >
                          <Star size={16} fill={saved ? "currentColor" : "none"} />
                        </button>

                        <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                          {car.category}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
                            <span>{car.brand}</span>
                            <span className="text-yellow-400 flex items-center gap-0.5">
                              {car.safetyRating}★ NCAP
                            </span>
                          </div>
                          <h3 className="font-extrabold text-xl text-white mt-1.5">{car.name}</h3>

                          <div className="flex flex-wrap gap-2 mt-4 text-[10px] font-bold tracking-wide text-slate-400">
                            <span className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-850">
                              {car.fuelType}
                            </span>
                            <span className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-850">
                              {car.transmission}
                            </span>
                            <span className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-850">
                              {car.seatingCapacity} Seater
                            </span>
                            <span className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-855">
                              {car.mileage} {car.fuelType === "Electric" ? "km/range" : "km/l"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Ex-Showroom Price</span>
                            <span className="text-lg font-black text-blue-400">₹ {car.price} Lakh*</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddToCompareList(car)}
                              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/80 transition cursor-pointer"
                              title="Add to Comparison Matrix"
                            >
                              <Plus size={16} />
                            </button>
                            <Link
                              to={`/car/${car._id}`}
                              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                            >
                              Analyze Specs
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Explorer;
