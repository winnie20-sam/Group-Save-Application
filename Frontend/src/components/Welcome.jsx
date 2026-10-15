import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    getSavings();
  }, []);

  const getSavings = async () => {
    const response = await axios.get("http://localhost:5000/savings");
    setSavings(response.data);
  };

  // work out the totals from the list of savings
  let total = 0;
  let lastPayment = "-";
  savings.forEach((saving) => {
    total = total + Number(saving.amount);
    if (lastPayment === "-" || saving.paymentDate > lastPayment) {
      lastPayment = saving.paymentDate;
    }
  });

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>

      <div className="columns">
        <div className="column">
          <div className="box">
            <p className="heading">
              {user && user.role === "admin" ? "Group Total Savings" : "My Total Savings"}
            </p>
            <p className="title">KES {total.toLocaleString()}</p>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <p className="heading">Contributions</p>
            <p className="title">{savings.length}</p>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <p className="heading">Last Payment</p>
            <p className="title">{lastPayment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
