import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "@/utils/config";

const PersonalInfo = ({ user, accessToken }) => {
  const dispatch = useDispatch();
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    pincode: user?.pincode || "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    try {
      const res = await axios.put(`${API_BASE_URL}/api/v1/user/profile`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Profile updating failed");
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-xl space-y-6 max-w-3xl mx-auto">
      <div>
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <User className="text-blue-500" /> Account Personal Details
        </h3>
        <p className="text-xs text-slate-400 mt-1">Provide contact information and shipping address coordinates.</p>
      </div>

      <form onSubmit={handleUpdateProfile} className="grid md:grid-cols-2 gap-6 text-xs text-left">
        <div className="space-y-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">Last Name</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">Mobile Contact Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">Pincode</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-slate-400 font-bold uppercase tracking-widest">Full Driving Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 px-3.5 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="md:col-span-2 pt-2">
          <button
            type="submit"
            disabled={detailsLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition hover:opacity-95 cursor-pointer shadow-lg hover:shadow-blue-500/10"
          >
            {detailsLoading ? "Saving profile details..." : "Update Dashboard Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
