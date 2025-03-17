import React from "react";
import { useState } from "react";
import "../../assets/TaskForm.css";
import "../../assets/Selectfield.css";
import SelectField from "../components/Selectfield.jsx";

const TaskForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="taskForm-main-div">
      <h1>შექმენი ახალი დავალება</h1>
      <div className="taskForm-div">
        <form>
          <div className="form-name-div form-name-div-task">
            <div className="inside-form-div task-form">
              <h3>სათაური*</h3>
              <input type="text" className="form-input satauri" />
              <span>მინიმუმ 2 სიმბოლო</span>
              <span>მაქსიმუმ 255 სიმბოლო</span>
            </div>
            <div className="inside-form-div task-form">
              <h3>დეპარტამენტი*</h3>
              <div>
                <SelectField
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="form-name-div form-name-div-task">
            <div className="inside-form-div">
              <h3>აღწერა</h3>
              <textarea className="text-area" />
            </div>
            <div className="inside-form-div">
              <h3>პასუხისმგებელი თანამშრომელი*</h3>
              <div>
                <SelectField
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
