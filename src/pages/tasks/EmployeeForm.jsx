import React from "react";
import { useState } from "react";
import "../../assets/Modal.css";
import closeBtnPng from "../../assets/images/closeBtnPng.png";
import dropzoneImg from "../../assets/images/dropzoneImg.png";
import SelectField from "../components/Selectfield.jsx";
import "../../assets/Selectfield.css";

const EmployeeForm = ({ show, onClose }) => {
  if (!show) return null;

  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-btn-div">
          <button className="close-btn" onClick={onClose}>
            <img src={closeBtnPng} />
          </button>
        </div>
        <div className="modal-form">
          <h1>თანამშრომლის დამატება</h1>
          <div className="employee-form">
            <form>
              <div className="form-name-div">
                <div className="inside-form-div">
                  <h3>სახელი*</h3>
                  <input className="form-input" type="text" />
                  <span>მინიმუმ 2 სიმბოლო</span>
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
                <div className="inside-form-div">
                  <h3>გვარი*</h3>
                  <input className="form-input" type="text" />
                  <span>მინიმუმ 2 სიმბოლო</span>
                  <span>მაქსიმუმ 255 სიმბოლო</span>
                </div>
              </div>
              <div className="inside-form-div ">
                <h3>ავატარი*</h3>
                <div className="dropzone ">
                  <div className="">
                    <img className="dropzone-img" src={dropzoneImg} />
                    <h3>ატვირთე ფოტო</h3>
                  </div>
                  <div hidden className="img-preview">
                    <img src={dropzoneImg} />
                  </div>
                </div>
              </div>
              <div className="inside-form-div ">
                <h3>დეპარტამენტი*</h3>
                <div>
                  <SelectField
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </div>
              </div>
              <div className="form-name-div form-btns">
                <button className="white-btn" onClick={onClose}>
                  გაუქმება
                </button>
                <button className="purple-btn"> დაამატე თანამშრომელი</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
