import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./Dashboard.css";
import Stocks from "./../stocks";
import Indices from "./../indices";
import Currencies from "./../currencies";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <h1 classname="text-center mb-4"> BREADCRUMBS </h1>
      <h6 classname="text-center mb-4"> Stock, Index, & Currency tracker </h6>
      <br></br>
      <br></br>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <br></br>
      <br></br>
      <div className="Dashboard">

        <div id="stock">
          <h1>StockTracker</h1>
          <Stocks />
          <br></br>
          <hr></hr>
          <br></br>
        </div>

        <div id="index">
          <h1>IndexTracker</h1>
          <Indices />
          <br></br>
          <hr></hr>
          <br></br>
        </div>

        <div id="currency">
          <h1>CurrencyTracker</h1>
          <Currencies />
          <br></br>
          <hr></hr>
          <br></br>
        </div>

      </div>
    </>
  );
}
