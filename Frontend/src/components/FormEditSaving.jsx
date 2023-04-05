import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditSaving = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const[paymentDate, setpaymentDate] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSavingById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setAmount(response.data.amount);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSavingById();
  }, [id]);

  const updateSaving = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/savings/${id}`, {
        name: name,
        amount: amount,
        paymentDate:paymentDate

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
      <h2 className="subtitle">Edit Savings</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateSaving}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="saving Name"
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
                    placeholder="amount"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Payment Date</label>
                <div className="control">
                  <input
                    type="text"
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
                    Update
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

export default FormEditSaving;
