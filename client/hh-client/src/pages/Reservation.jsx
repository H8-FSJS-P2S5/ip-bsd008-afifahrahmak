import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationList = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reservation/${userId}`
        );
        setReservations(response.data.reservations);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReservations();
  }, [userId]);

  return (
    <div>
      <h1>Your Reservations</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            Reservation for {reservation.user.username} (
            {reservation.user.email}){/* Add more reservation details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
