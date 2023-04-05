import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SavingList = () => {
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    getSaving();
  }, []);

  const getSaving = async () => {
    const response = await axios.get("http://localhost:5000/savings");
    setSavings(response.data);
  };

  const deleteSaving = async (savingId) => {
    await axios.delete(`http://localhost:5000/products/${savingId}`);
    getSaving();
  };

  return (
    <div>
      <h1 className="title">Savings</h1>
      <h2 className="subtitle">List of Members Savings</h2>
      <Link to="/saving/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Savings Name</th>
            <th>Amount</th>
            <th>PaymentDate</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savings.map((saving, index) => (
            <tr key={savings.uuid}>
              <td>{index + 1}</td>
              <td>{saving.name}</td>
              <td>{saving.amount}</td>
              <td>{saving.user.name}</td>
              <td>
                <Link
                  to={`/savings/edit/${saving.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteSaving(saving.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavingList;
