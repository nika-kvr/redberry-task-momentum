import React, { useState, useRef, useEffect } from "react";
import ArrowSvg from "./arrowSvg";
import AddImgSvg from "../components/addImgSvg";

const Selectfield = ({
  options,
  onChange,
  selected,
  width,
  emp,
  toggleModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const widthPx = width === "small" ? "259px" : "550px";

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
    <div style={{ width: widthPx }} className="select-field" ref={selectRef}>
      <div
        style={{ width: widthPx }}
        className={`select-container ${
          options?.length === 0 ? "disabled" : ""
        }`}
        onClick={options?.length > 0 ? handleToggle : null}
      >
        <div style={{ width: widthPx }} className="selected-value">
          {selected?.icon && <img className="emp-img" src={selected?.icon} />}
          {selected?.avatar && (
            <img className="emp-img" src={selected?.avatar} />
          )}
          {selected?.name && <p>{selected.name}</p>}
          {selected?.surname && <p>{selected.surname}</p>}
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}>
          <ArrowSvg />
        </div>
      </div>
      {isOpen && (
        <ul style={{ width: widthPx }} className="options-list">
          {emp && (
            <div
              onClick={() => {
                toggleModal();
                setIsOpen(false);
              }}
              className="add-emp-div option-item"
            >
              <AddImgSvg />
              <p style={{ color: "#8338EC" }}>დაამატე თანამშრომელი</p>
            </div>
          )}
          {options?.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="option-item"
            >
              {option.icon && <img className="emp-img" src={option.icon} />}
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

export default Selectfield;
