import React, { useState, useRef, useEffect } from "react";
import ArrowSvg from "./arrowSvg";

const EmpSelectffield = ({ options, onChange, selected }) => {
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
      <div
        className={`select-container ${options.length === 0 ? "disabled" : ""}`}
        onClick={options.length > 0 ? handleToggle : null}
      >
        <div className="selected-value">
          <img className="emp-img" src={selected.avatar} />
          <p>{selected.name}</p>
          <p>{selected.surname}</p>
        </div>
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
              {option.avatar && <img className="emp-img" src={option.avatar} />}
              {option.name && <p>{option.name}</p>}
              {option.surname && <p>{option.surname}</p>}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmpSelectffield;
