import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sparkles, Shield, Compass, Star, ChevronRight, Award, Gauge } from "lucide-react";
import axios from "axios";
import Footer from "@/components/Footer";
import { API_BASE_URL, FALLBACK_CAR_IMAGE } from "@/utils/config";

const MOCK_FEATURED_CARS = [
  {
    _id: "mock10",
    name: "Mahindra XUV700",
    brand: "Mahindra",
    price: 14.5,
    onRoadPrice: 16.8,
    category: "SUV",
    fuelType: "Diesel",
    transmission: "Automatic",
    seatingCapacity: 7,
    mileage: 15.0,
    safetyRating: 5,
    image: "/cars/xuv700.jpg",
    engine: "2.2L mHawk Turbocharged Diesel",
    horsepower: 182,
    torque: 450,
    topSpeed: 190,
    airbags: 7,
    adas: true,
    maintenanceCostPerYear: 16000,
  },
  {
    _id: "mock4",
    name: "Tata Nexon EV",
    brand: "Tata",
    price: 14.8,
    onRoadPrice: 15.5,
    category: "EV",
    fuelType: "Electric",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 465,
    safetyRating: 5,
    image: "/cars/nexon-ev.jpg",
    engine: "Permanent Magnet AC Synchronous Motor",
    horsepower: 143,
    torque: 250,
    topSpeed: 150,
    airbags: 6,
    adas: false,
    maintenanceCostPerYear: 8000,
  },
  {
    _id: "mock6",
    name: "Hyundai Creta",
    brand: "Hyundai",
    price: 11.0,
    onRoadPrice: 12.8,
    category: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: 16.8,
    safetyRating: 4,
    image: "/cars/creta.jpg",
    engine: "1.5L MPi Petrol DOHC",
    horsepower: 113,
    torque: 144,
    topSpeed: 170,
    airbags: 6,
    adas: true,
    maintenanceCostPerYear: 11000,
  }
];

const POPULAR_BRANDS = [
  { name: "Maruti Suzuki", logoLetter: "MS", color: "from-blue-600 to-sky-700" },
  { name: "Hyundai", logoLetter: "H", color: "from-slate-700 to-indigo-800" },
  { name: "Tata", logoLetter: "T", color: "from-cyan-600 to-blue-850" },
  { name: "Mahindra", logoLetter: "M", color: "from-red-600 to-orange-700" },
  { name: "Kia", logoLetter: "K", color: "from-rose-800 to-slate-900" },
  { name: "MG", logoLetter: "MG", color: "from-amber-600 to-yellow-800" }
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/car`);
        if (res.data.success && res.data.cars.length > 0) {
          setCars(res.data.cars.slice(0, 3));
        } else {
          setCars(MOCK_FEATURED_CARS);
        }
      } catch (error) {
        console.log("Failed to load cars, using fallbacks:", error);
        setCars(MOCK_FEATURED_CARS);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/explorer?search=${searchQuery}`);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 border-b border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-4.5 py-1.5 rounded-full text-xs font-bold text-amber-400 tracking-wider uppercase">
              <Sparkles size={14} className="text-amber-400 animate-pulse" /> BigBoyToys Elite
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">
              The Smart Way to <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
                Discover Your Drive
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Explore specs, predict actual ownership costs, evaluate EMIs, run head-to-head comparisons, and secure test drives at nearby showrooms. Supported by BigBoyToys.
            </p>

            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search by brand, name, type (e.g. Porsche)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-xl text-sm placeholder-slate-500 text-white transition shadow-lg"
                />
              </div>
              <button type="submit" className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer">
                Explore Now
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5"><Shield size={16} className="text-blue-400" /> NCAP Verified safety</span>
              <span className="flex items-center gap-1.5"><Compass size={16} className="text-indigo-400" /> AI Tailored Recommendations</span>
              <span className="flex items-center gap-1.5"><Gauge size={16} className="text-purple-400" /> Ownership Cost Breakdown</span>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-2xl overflow-hidden hover:scale-105 transition-all duration-500 group">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
              <img
                src="/cars/xuv700.jpg"
                alt="Mahindra XUV700"
                className="w-full h-56 object-cover rounded-2xl drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] group-hover:rotate-1 transition-all duration-500"
              />
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-lg text-white">Mahindra XUV700</h3>
                  <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs px-3 py-1 rounded-full font-bold">SUV</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>2.2L mHawk Turbo Diesel</span>
                  <span className="font-bold text-white text-sm">₹ 14.50 Lakh*</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Search by Manufacturer</h2>
            <p className="text-3xl font-black text-white mt-2">Explore Popular Brands</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {POPULAR_BRANDS.map((brand, i) => (
              <Link
                key={i}
                to={`/explorer?brand=${brand.name}`}
                className="flex flex-col items-center p-6 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-blue-500/40 hover:bg-slate-900/80 transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center text-white text-xl font-black shadow-lg transition-transform group-hover:scale-110`}>
                  {brand.logoLetter}
                </div>
                <span className="mt-4 font-bold text-slate-300 group-hover:text-white transition">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900/30 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase">Selected Showcases</h2>
              <p className="text-4xl font-black text-white mt-2">Trending Vehicles</p>
            </div>
            <Link
              to="/explorer"
              className="mt-4 md:mt-0 flex items-center gap-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 px-4.5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Browse All Cars <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="bg-slate-900/80 border border-slate-800 rounded-3xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <div
                  key={car._id || index}
                  className="group bg-slate-900 border border-slate-800/80 rounded-3xl shadow-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden w-full aspect-video border-b border-slate-800/60">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = FALLBACK_CAR_IMAGE; }}
                    />
                    <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-blue-400 text-[10px] font-extrabold uppercase tracking-widest border border-slate-700/60 px-3 py-1 rounded-full z-10">
                      {car.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{car.brand}</span>
                        <div className="flex items-center gap-0.5 text-yellow-400 text-xs font-bold">
                          <Star size={14} fill="currentColor" /> {car.safetyRating}.0 NCAP
                        </div>
                      </div>
                      <h3 className="font-extrabold text-xl text-white mt-1.5">{car.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2">{car.description || `Experience the ultimate ${car.brand} refinement. Designed with specifications built for efficiency and speed.`}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Ex-Showroom Price</span>
                        <span className="text-lg font-extrabold text-blue-400">₹ {car.price} Lakh*</span>
                      </div>
                      <Link
                        to={`/car/${car._id}`}
                        className="px-4 py-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 border border-slate-700/80 cursor-pointer"
                      >
                        Analyze Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-950 border-b border-slate-800/80 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest text-red-500 uppercase">Intelligent Decisions</h2>
            <p className="text-4xl font-black text-white mt-2">Why Select BigBoyToys?</p>
            <p className="text-slate-400 mt-4">We empower car buyers with live calculation metrics, safety rating indices, and direct comparison systems.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-slate-900 border border-slate-800/80 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Sparkles size={24} />
              </div>
              <h3 className="font-extrabold text-lg text-white">AI Compatibility Match</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Take our quick lifestyle wizard. We evaluate fuel preferences, seating, and highways to recommend vehicles with exact suitability metrics.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800/80 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Gauge size={24} />
              </div>
              <h3 className="font-extrabold text-lg text-white">5-Yr Ownership Costs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Understand maintenance, fuel running costs, insurance, and RTO charges up to 5 years down the line before making a down payment.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800/80 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Award size={24} />
              </div>
              <h3 className="font-extrabold text-lg text-white">Head-to-Head Comparison</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Compare up to 3 cars at once side-by-side using tabular specs matrices and custom visual comparison charts.
              </p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800/80 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Shield size={24} />
              </div>
              <h3 className="font-extrabold text-lg text-white">Showroom & Booking Portal</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Locate surrounding official dealers and book immediate test drive scheduling dates connected directly into our backend schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-blue-500">15K+</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">Daily Evaluated Drivers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-indigo-500">80+</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">Premium Vehicle Listings</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-purple-500">500+</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">Showrooms Registered</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-teal-500">99.2%</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">Buyer Recommendation Rate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;