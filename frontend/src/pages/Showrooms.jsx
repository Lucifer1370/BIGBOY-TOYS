import React, { useState } from "react";
import { MapPin, Phone, Clock, Sparkles, Navigation, ChevronRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SHOWROOMS_DATABASE = [
  {
    id: 1,
    name: "BigBoyToys Elite - Bhopal Center",
    address: "Plot 14, M.P. Nagar Zone II, Near Jyoti Talkies, Bhopal, MP",
    phone: "+91 755 2439 123",
    hours: "09:00 AM - 08:00 PM (Mon-Sun)",
    distance: "1.2 km",
    lat: 23.2599,
    lng: 77.4126,
    specialty: "Popular Hatchbacks, Compact Family SUVs & EV Sedans"
  },
  {
    id: 2,
    name: "BigBoyToys Premium - Indore Mall",
    address: "244, AB Road, Opposite Indore Highway Mall, Indore, MP",
    phone: "+91 731 4059 888",
    hours: "10:00 AM - 08:00 PM (Mon-Sat)",
    distance: "192 km",
    lat: 22.7196,
    lng: 75.8577,
    specialty: "Luxury Premium Family SUVs & Hybrids"
  },
  {
    id: 3,
    name: "BigBoyToys Showroom - Mumbai Bandra",
    address: "Turner Road, Off Carter Road, Bandra West, Mumbai, MH",
    phone: "+91 22 2649 9999",
    hours: "09:00 AM - 09:00 PM (Mon-Sun)",
    distance: "780 km",
    lat: 19.0760,
    lng: 72.8777,
    specialty: "Premium Luxury Sedans, Adventure SUVs & Family Commuters"
  },
  {
    id: 4,
    name: "BigBoyToys Hub - Delhi Connaught Place",
    address: "G-Block, Radial Road 2, Connaught Place, New Delhi, DL",
    phone: "+91 11 4152 7777",
    hours: "10:00 AM - 08:30 PM (Mon-Sun)",
    distance: "740 km",
    lat: 28.6139,
    lng: 77.2090,
    specialty: "Full EV Catalogs, Electric sedans & SUV hybrids"
  }, {
    id: 5,
    name: "BigBoyToys Premium - Pune City",
    address: "Senapati Bapat Road, Shivajinagar, Pune, MH",
    phone: "+91 20 4567 8901",
    hours: "09:00 AM - 08:00 PM (Mon-Sun)",
    distance: "850 km",
    lat: 18.5204,
    lng: 73.8567,
    specialty: "Performance Cars, Luxury Sedans & Sports SUVs"
  },
  {
    id: 6,
    name: "BigBoyToys Elite - Bangalore Hub",
    address: "MG Road, Ashok Nagar, Bengaluru, KA",
    phone: "+91 80 5678 1234",
    hours: "09:00 AM - 09:00 PM (Mon-Sun)",
    distance: "1200 km",
    lat: 12.9716,
    lng: 77.5946,
    specialty: "Electric Vehicles, Luxury SUVs & Premium Sedans"
  },
  {
    id: 7,
    name: "BigBoyToys Luxury - Hyderabad Center",
    address: "Banjara Hills Road No. 12, Hyderabad, TS",
    phone: "+91 40 6789 4567",
    hours: "10:00 AM - 08:30 PM (Mon-Sun)",
    distance: "950 km",
    lat: 17.3850,
    lng: 78.4867,
    specialty: "Luxury Cars, EV Collection & Family SUVs"
  },
  {
    id: 8,
    name: "BigBoyToys Signature - Chennai Auto Mall",
    address: "Anna Salai, Teynampet, Chennai, TN",
    phone: "+91 44 7890 5678",
    hours: "09:00 AM - 08:00 PM (Mon-Sun)",
    distance: "1450 km",
    lat: 13.0827,
    lng: 80.2707,
    specialty: "Premium Sedans, Hybrid Cars & EV Showcases"
  }
];

const Showrooms = () => {
  const [selectedShowroom, setSelectedShowroom] = useState(SHOWROOMS_DATABASE[0]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        <div className="text-left pb-6 border-b border-slate-800">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Partner Showrooms Locator</h1>
          <p className="text-slate-400 text-sm mt-2">Locate official BigBoyToys showroom dealers, consult specialized spec catalogs, and book schedules.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
              Official Partners ({SHOWROOMS_DATABASE.length})
            </span>

            <div className="space-y-3">
              {SHOWROOMS_DATABASE.map((sh) => (
                <button
                   key={sh.id}
                   onClick={() => setSelectedShowroom(sh)}
                   className={`w-full p-6 text-left border rounded-3xl transition-all duration-300 block shadow-md cursor-pointer ${selectedShowroom.id === sh.id
                     ? "bg-slate-900 border-blue-500/40 shadow-blue-500/5"
                     : "bg-slate-900/50 border-slate-850 hover:bg-slate-900/80"
                     }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-base text-white">{sh.name}</h3>
                      <span className="text-xs bg-slate-950 px-2.5 py-1 border border-slate-850 text-blue-400 font-bold rounded-lg shrink-0">
                        {sh.distance}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed flex items-start gap-1.5">
                      <MapPin size={16} className="text-slate-500 mt-0.5 shrink-0" />
                      <span>{sh.address}</span>
                    </p>

                    <div className="flex justify-between text-[11px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><Phone size={12} /> {sh.phone}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> Hours today</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Showroom Detail Consult</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Custom active showroom overview.</p>
                </div>
                <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-bold">
                  {selectedShowroom.distance} Away
                </span>
              </div>

              <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800">
                <MapContainer
                  center={[
                    selectedShowroom.lat,
                    selectedShowroom.lng
                  ]}
                  zoom={6}
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {SHOWROOMS_DATABASE.map((sh) => (
                    <Marker
                      key={sh.id}
                      position={[sh.lat, sh.lng]}
                    >
                      <Popup>
                        <div>
                          <h3>{sh.name}</h3>
                          <p>{sh.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="p-5 bg-slate-950/60 border border-slate-850/60 rounded-2xl text-left space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold flex items-center gap-1">
                  <Sparkles size={12} className="text-blue-400" /> Showroom Dealer Specialty:
                </span>
                <p className="text-slate-300 font-bold text-sm leading-relaxed">{selectedShowroom.specialty}</p>
                <p className="text-slate-500 text-xs flex items-center gap-1"><Clock size={12} /> Opening Hours: <span className="text-slate-400 font-semibold">{selectedShowroom.hours}</span></p>
              </div>

              <div className="pt-2">
                <Link
                  to="/explorer"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Explore Showroom Catalog Vehicles <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Showrooms;
