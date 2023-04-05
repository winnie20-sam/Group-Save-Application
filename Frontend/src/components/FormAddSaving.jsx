import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddSavings = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const[paymentDate, setpaymentDate] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveSaving = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/savings", {
        name: name,
        amount: amount,
      });
      navigate("/saving");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Savings</h1>
      <h2 className="subtitle">Add New Savings</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveSaving}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Savings Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="PAmount"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Payment Date</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={paymentDate}
                    onChange={(e) => setpaymentDate(e.target.value)}
                    placeholder="PDate"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddSavings;
