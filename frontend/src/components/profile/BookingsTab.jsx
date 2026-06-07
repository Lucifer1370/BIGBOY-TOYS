import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

const BookingsTab = ({ accessToken }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/booking/my-bookings`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-xl space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Calendar className="text-teal-500" /> Booked Test-Drive Histories
        </h3>
        <p className="text-xs text-slate-400 mt-1">Verify time slot approvals and booked dates from showroom managers.</p>
      </div>

      {bookingsLoading ? (
        <div className="h-40 bg-slate-950 border border-slate-800 rounded-2xl animate-pulse"></div>
      ) : bookings.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
          <Calendar className="text-slate-600 mx-auto animate-pulse" />
          <h4 className="font-extrabold text-white text-base">No Test-Drives Booked</h4>
          <p className="text-slate-500 text-xs">Explore cars, open details, and book your drive slot easily.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((book, idx) => {
            const statusColors = {
              Pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
              Confirmed: "bg-blue-500/10 border-blue-500/30 text-blue-400",
              Completed: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
              Cancelled: "bg-red-500/10 border-red-500/30 text-red-400",
            };
            return (
              <div
                key={book._id || idx}
                className="p-6 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-extrabold text-lg text-white">{book.carId?.name || "Premium Vehicle"}</h4>
                    <span className={`px-3.5 py-1 text-[10px] font-black uppercase tracking-wider border rounded-full ${
                      statusColors[book.status] || statusColors["Pending"]
                    }`}>
                      {book.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-6 text-[11px] text-slate-400 font-medium">
                    <span>📍 Dealer: <span className="text-slate-300 font-bold">{book.showroomName}</span></span>
                    <span>📅 Date: <span className="text-slate-300 font-bold">{new Date(book.bookingDate).toLocaleDateString()}</span></span>
                    <span>⏰ Time: <span className="text-slate-300 font-bold">{book.bookingTime}</span></span>
                    <span>📞 Mobile: <span className="text-slate-300 font-bold">{book.phone}</span></span>
                  </div>
                </div>

                {book.notes && (
                  <div className="bg-slate-900 border border-slate-850 p-3 rounded-xl max-w-sm text-[10px] text-slate-400 italic">
                    "{book.notes}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
