import React, { useEffect, useState } from "react";
import { Plus, Trash2, Calendar, LayoutDashboard } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const AdminDashboard = ({ accessToken }) => {
  const [allCars, setAllCars] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [carFormOpen, setCarFormOpen] = useState(false);
  const [carFormLoading, setCarFormLoading] = useState(false);

  const [newCarData, setNewCarData] = useState({
    name: "",
    brand: "",
    price: "",
    onRoadPrice: "",
    category: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    seatingCapacity: 5,
    mileage: "",
    safetyRating: 5,
    image: "",
    engine: "",
    horsepower: "",
    torque: "",
    topSpeed: "",
    airbags: 6,
    adas: false,
    pros: "",
    cons: "",
    description: "",
  });

  const fetchAdminData = async () => {
    setAdminLoading(true);
    try {
      const bookingRes = await axios.get("http://localhost:3000/api/v1/booking/all-bookings", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (bookingRes.data.success) {
        setAllBookings(bookingRes.data.bookings);
      }

      const carRes = await axios.get("http://localhost:3000/api/v1/car");
      if (carRes.data.success) {
        setAllCars(carRes.data.cars);
      }

      const userRes = await axios.get("http://localhost:3000/api/v1/user/get-all-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.data.success) {
        setAllUsers(userRes.data.users);
      }
    } catch (e) {
      console.log("Error loading admin information:", e);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/booking/status/${bookingId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) {
        toast.success(`Test Drive Booking status updated to ${newStatus}!`);
        fetchAdminData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Status updating failed");
    }
  };

  const handleDeleteCar = async (carId, name) => {
    if (!window.confirm(`Are you absolutely sure you want to delete the ${name} listing?`)) return;
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/car/${carId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        toast.success(`${name} listing successfully deleted!`);
        fetchAdminData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Car deleting failed");
    }
  };

  const handleCreateCarSubmit = async (e) => {
    e.preventDefault();
    setCarFormLoading(true);
    try {
      const finalPros = newCarData.pros.split(",").map((s) => s.trim()).filter((s) => s);
      const finalCons = newCarData.cons.split(",").map((s) => s.trim()).filter((s) => s);

      const payload = {
        ...newCarData,
        price: Number(newCarData.price),
        onRoadPrice: Number(newCarData.onRoadPrice),
        seatingCapacity: Number(newCarData.seatingCapacity),
        mileage: Number(newCarData.mileage),
        safetyRating: Number(newCarData.safetyRating),
        horsepower: Number(newCarData.horsepower),
        torque: Number(newCarData.torque),
        topSpeed: Number(newCarData.topSpeed),
        airbags: Number(newCarData.airbags),
        pros: finalPros,
        cons: finalCons,
      };

      const res = await axios.post("http://localhost:3000/api/v1/car", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        toast.success("New car listing added successfully!");
        setCarFormOpen(false);
        setNewCarData({
          name: "",
          brand: "",
          price: "",
          onRoadPrice: "",
          category: "SUV",
          fuelType: "Petrol",
          transmission: "Automatic",
          seatingCapacity: 5,
          mileage: "",
          safetyRating: 5,
          image: "",
          engine: "",
          horsepower: "",
          torque: "",
          topSpeed: "",
          airbags: 6,
          adas: false,
          pros: "",
          cons: "",
          description: "",
        });
        fetchAdminData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Listing creating failed");
    } finally {
      setCarFormLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Admin stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl text-center space-y-1">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Showroom Vehicles</span>
          <span className="text-3xl font-black text-blue-400 block">{allCars.length}</span>
        </div>
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl text-center space-y-1">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Drive Enquiries</span>
          <span className="text-3xl font-black text-indigo-400 block">{allBookings.length}</span>
        </div>
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl text-center space-y-1">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Registered Drivers</span>
          <span className="text-3xl font-black text-purple-400 block">{allUsers.length}</span>
        </div>
        <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl text-center space-y-1">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Active Showrooms</span>
          <span className="text-3xl font-black text-teal-400 block">4</span>
        </div>
      </div>

      {/* Car management */}
      <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <LayoutDashboard size={20} className="text-blue-500" /> Manage Vehicles Inventory
            </h3>
            <p className="text-xs text-slate-400 mt-1">Manage showroom specifications database, ex-showroom pricing, and details.</p>
          </div>

          <button
            onClick={() => setCarFormOpen(!carFormOpen)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs uppercase cursor-pointer flex items-center gap-1 hover:opacity-90"
          >
            <Plus size={16} /> {carFormOpen ? "Close Form" : "Add New Vehicle"}
          </button>
        </div>

        {carFormOpen && (
          <form onSubmit={handleCreateCarSubmit} className="p-6 bg-slate-950 border border-slate-850 rounded-2xl grid md:grid-cols-3 gap-6 text-xs text-left">
            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Car Model Name</label>
              <input
                type="text"
                required
                placeholder="E.g. Porsche 911 Carrera S"
                value={newCarData.name}
                onChange={(e) => setNewCarData({ ...newCarData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Brand / Maker</label>
              <input
                type="text"
                required
                placeholder="E.g. Porsche"
                value={newCarData.brand}
                onChange={(e) => setNewCarData({ ...newCarData, brand: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Ex-Showroom Price (Lakhs)</label>
              <input
                type="number"
                required
                placeholder="E.g. 184"
                value={newCarData.price}
                onChange={(e) => setNewCarData({ ...newCarData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Estimated On-Road Price (Lakhs)</label>
              <input
                type="number"
                required
                placeholder="E.g. 206.5"
                value={newCarData.onRoadPrice}
                onChange={(e) => setNewCarData({ ...newCarData, onRoadPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Body Style Segment</label>
              <select
                value={newCarData.category}
                onChange={(e) => setNewCarData({ ...newCarData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="EV">EV</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Fuel Type</label>
              <select
                value={newCarData.fuelType}
                onChange={(e) => setNewCarData({ ...newCarData, fuelType: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Transmission Gearbox</label>
              <select
                value={newCarData.transmission}
                onChange={(e) => setNewCarData({ ...newCarData, transmission: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Cabin Seating Capacity</label>
              <input
                type="number"
                required
                placeholder="E.g. 5"
                value={newCarData.seatingCapacity}
                onChange={(e) => setNewCarData({ ...newCarData, seatingCapacity: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Mileage / Charge Range</label>
              <input
                type="number"
                required
                placeholder="E.g. 12"
                value={newCarData.mileage}
                onChange={(e) => setNewCarData({ ...newCarData, mileage: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">NCAP Safety Rating (1-5)</label>
              <input
                type="number"
                required
                min="1"
                max="5"
                value={newCarData.safetyRating}
                onChange={(e) => setNewCarData({ ...newCarData, safetyRating: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Top Image URL</label>
              <input
                type="text"
                required
                placeholder="High-quality image link..."
                value={newCarData.image}
                onChange={(e) => setNewCarData({ ...newCarData, image: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Horsepower (BHP)</label>
              <input
                type="number"
                placeholder="E.g. 443"
                value={newCarData.horsepower}
                onChange={(e) => setNewCarData({ ...newCarData, horsepower: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Engine Code</label>
              <input
                type="text"
                placeholder="E.g. 3.0L twin flat-6"
                value={newCarData.engine}
                onChange={(e) => setNewCarData({ ...newCarData, engine: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Torque (Nm)</label>
              <input
                type="number"
                placeholder="E.g. 530"
                value={newCarData.torque}
                onChange={(e) => setNewCarData({ ...newCarData, torque: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Top Speed (km/h)</label>
              <input
                type="number"
                placeholder="E.g. 308"
                value={newCarData.topSpeed}
                onChange={(e) => setNewCarData({ ...newCarData, topSpeed: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Pros (comma separated list)</label>
              <input
                type="text"
                placeholder="E.g. Fast PDK shift, Handling"
                value={newCarData.pros}
                onChange={(e) => setNewCarData({ ...newCarData, pros: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Cons (comma separated list)</label>
              <input
                type="text"
                placeholder="E.g. Expensive options, Small rear"
                value={newCarData.cons}
                onChange={(e) => setNewCarData({ ...newCarData, cons: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">ADAS System Enabled?</label>
              <select
                value={newCarData.adas}
                onChange={(e) => setNewCarData({ ...newCarData, adas: e.target.value === "true" })}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-blue-500"
              >
                <option value="false">No / Disabled</option>
                <option value="true">Yes / Enabled</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="text-slate-400 font-bold uppercase tracking-widest">Vehicle Description</label>
              <textarea
                placeholder="Enter detailed car descriptions..."
                rows="2"
                value={newCarData.description}
                onChange={(e) => setNewCarData({ ...newCarData, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={carFormLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl tracking-wide uppercase transition cursor-pointer"
              >
                {carFormLoading ? "Saving Listing..." : "Add Vehicle to Showroom Database"}
              </button>
            </div>
          </form>
        )}

        {/* Vehicles list table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40 uppercase">
                <th className="px-6 py-4">Thumbnail</th>
                <th className="px-6 py-4">Name / Brand</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price Ex.</th>
                <th className="px-6 py-4">Fuel / Transmission</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/80">
              {allCars.map((car, idx) => (
                <tr key={car._id || idx} className="hover:bg-slate-850/10">
                  <td className="px-6 py-3">
                    <img src={car.image} alt={car.name} className="w-14 h-9 object-cover rounded-md border border-slate-800" />
                  </td>
                  <td className="px-6 py-3">
                    <span className="font-extrabold text-white block">{car.name}</span>
                    <span className="text-[10px] text-slate-500 block uppercase">{car.brand}</span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-400">{car.category}</td>
                  <td className="px-6 py-3 font-extrabold text-blue-400">₹ {car.price} Lakh</td>
                  <td className="px-6 py-3 text-slate-400">
                    {car.fuelType} / {car.transmission}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteCar(car._id, car.name)}
                      className="p-2.5 bg-slate-950 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-850 hover:border-red-900 rounded-xl transition cursor-pointer"
                      title="Delete Car listing"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking appointments management */}
      <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Calendar size={20} className="text-teal-500" /> Manage Test-Drive Appointments
          </h3>
          <p className="text-xs text-slate-400 mt-1">Approve, complete, or reschedule active test-drive appointment bookings.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40 uppercase">
                <th className="px-6 py-4">Client User</th>
                <th className="px-6 py-4">Vehicle Model</th>
                <th className="px-6 py-4">Dealer Location</th>
                <th className="px-6 py-4">Scheduled Date / Slot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/80">
              {allBookings.map((book, idx) => {
                const statusColors = {
                  Pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
                  Confirmed: "bg-blue-500/10 border-blue-500/30 text-blue-400",
                  Completed: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                  Cancelled: "bg-red-500/10 border-red-500/30 text-red-400",
                };
                return (
                  <tr key={book._id || idx} className="hover:bg-slate-855/10">
                    <td className="px-6 py-4">
                      <span className="font-extrabold text-white block">
                        {book.userId ? `${book.userId.firstName} ${book.userId.lastName}` : "Client User"}
                      </span>
                      <span className="text-[10px] text-slate-500 block">{book.userId?.email || book.phone}</span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-300">
                      {book.carId ? book.carId.name : "Premium Car"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-400">{book.showroomName}</td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="block font-bold">{new Date(book.bookingDate).toLocaleDateString()}</span>
                      <span className="block text-[10px] text-slate-500">{book.bookingTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase border rounded-full ${
                        statusColors[book.status] || statusColors["Pending"]
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {book.status === "Pending" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(book._id, "Confirmed")}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[10px] uppercase transition cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {book.status === "Confirmed" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(book._id, "Completed")}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] uppercase transition cursor-pointer"
                          >
                            Complete
                          </button>
                        )}
                        {book.status !== "Cancelled" && book.status !== "Completed" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(book._id, "Cancelled")}
                            className="px-2.5 py-1.5 bg-slate-950 hover:bg-red-950 border border-slate-850 hover:border-red-900 text-slate-400 hover:text-red-300 rounded-lg font-bold text-[10px] uppercase transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
