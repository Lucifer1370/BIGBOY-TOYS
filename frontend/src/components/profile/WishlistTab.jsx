import React, { useEffect, useState } from "react";
import { Star, Trash2, Info } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { API_BASE_URL, FALLBACK_CAR_IMAGE } from "@/utils/config";

const WishlistTab = ({ accessToken }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const fetchWishlist = async () => {
    setWishlistLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/user/wishlist`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        setWishlistItems(res.data.wishlist);
      }
    } catch (e) {
      console.log("Could not load wishlist on DB, showing local wishlist fallback.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleToggleWishlist = async (carId, name) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/wishlist`,
        { carId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) {
        toast.success(`Removed ${name} from your saved cars.`);
        fetchWishlist();
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not remove item");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-xl space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Star className="text-yellow-500" /> Saved Wishlist Vehicles
        </h3>
        <p className="text-xs text-slate-400 mt-1">Review saved listings for easy detailed analysis and specs comparisons.</p>
      </div>

      {wishlistLoading ? (
        <div className="grid md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((s) => (
            <div key={s} className="bg-slate-950 h-56 rounded-2xl border border-slate-800"></div>
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
          <Info className="text-slate-600 mx-auto" />
          <h4 className="font-extrabold text-white text-base">Wishlist is Empty</h4>
          <p className="text-slate-500 text-xs">Explore cars and tap the star icon to save listings.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlistItems.map((car, idx) => (
            <div
              key={car._id || idx}
              className="bg-slate-950 border border-slate-850 p-5 rounded-2xl relative shadow-md text-left flex flex-col justify-between"
            >
              <button
                onClick={() => handleToggleWishlist(car._id, car.name)}
                className="absolute top-3 right-3 p-2 bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900 rounded-full cursor-pointer transition animate-none"
              >
                <Trash2 size={12} />
              </button>

              <img src={car.image} alt={car.name} className="w-full h-36 object-cover rounded-xl" onError={(e) => { e.target.src = FALLBACK_CAR_IMAGE; }} />

              <div className="mt-4 space-y-2">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{car.brand}</span>
                  <h4 className="font-extrabold text-base text-white mt-0.5">{car.name}</h4>
                  <span className="text-sm font-black text-blue-400 block mt-1">₹ {car.price} Lakh*</span>
                </div>

                <Link
                  to={`/car/${car._id}`}
                  className="block text-center py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 font-bold rounded-xl transition"
                >
                  Inspect Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistTab;
