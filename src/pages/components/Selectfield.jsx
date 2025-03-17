import React, { useState } from "react";
import ArrowSvg from "./arrowSvg";

const SelectField = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.id === value?.id || option.id === value
  );

  const selectedName = selectedOption;

  return (
    <div className="select-field">
      <div className="select-container" onClick={handleToggle}>
        <div className="selected-value">{selectedName}</div>
        <div className={`arrow ${isOpen ? "open" : ""}`}>
          <ArrowSvg />
        </div>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="option-item"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
