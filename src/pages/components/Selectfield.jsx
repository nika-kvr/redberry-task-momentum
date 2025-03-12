import React, { useState } from "react";
import ArrowSvg from "./arrowSvg";

const SelectField = ({ options, label, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="select-field">
      <label>{label}</label>
      <div className="select-container" onClick={handleToggle}>
        <div className="selected-value">{value || "Select an option"}</div>
        <div className={`arrow ${isOpen ? "open" : ""}`}>
          <ArrowSvg />
        </div>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="option-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
