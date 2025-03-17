import React, { useState, useRef, useEffect } from "react";
import ArrowSvg from "./arrowSvg";

const SelectField = ({ options, onChange, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select-field" ref={selectRef}>
      <div className="select-container" onClick={handleToggle}>
        <div className="selected-value">{selected}</div>
        <div className={`arrow ${isOpen ? "open" : ""}`}>
          <ArrowSvg />
        </div>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="option-item"
            >
              {option.name}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
