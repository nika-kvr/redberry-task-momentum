import momentumLogo from "../assets/images/momentum.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./tasks/EmployeeForm";

const Header = ({ showModal, toggleModal }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <EmployeeForm show={showModal} onClose={toggleModal} />
      <div>
        <img
          onClick={() => {
            navigate("/");
          }}
          className="momentumLogo"
          src={momentumLogo}
        ></img>
      </div>
      <div className="header-btn-div">
        <button onClick={toggleModal} className="white-btn">
          თანამშრომლის შექმნა
        </button>
        <button
          onClick={() => {
            navigate("/taskform");
          }}
          className="purple-btn"
        >
          + შექმენი ახალი დავალება
        </button>
      </div>
    </div>
  );
};

export default Header;
