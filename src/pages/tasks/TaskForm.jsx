import React from "react";
import { useState, useEffect } from "react";
import "../../assets/TaskForm.css";
import "../../assets/Selectfield.css";
import SelectField from "../components/Selectfield.jsx";
import EmpSelectffield from "../components/EmpSelectffield.jsx";
import { GetDepartments, GetEmployees } from "./Requests.jsx";

const TaskForm = () => {
  const [selectedDep, setSelectedDep] = useState("");
  const [selectedEmp, setSelectedEmp] = useState({});

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const departments = await GetDepartments();
      const employees = await GetEmployees();
      setDepartments(departments);
      setEmployees(employees);
    };
    fetchData();
  }, []);

  const departmentChange = (option) => {
    const filteredEmployees = employees.filter((employee) => {
      return employee.department.id === option.id;
    });
    setSelectedDep(option);
    setFilteredEmps(filteredEmployees);
    setSelectedEmp({});
  };

  const employeeChange = (option) => {
    setSelectedEmp(option);
  };

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
                  selected={selectedDep.name}
                  onChange={departmentChange}
                  options={departments}
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
              <h3 style={{ color: !selectedDep.name && "#ADB5BD" }}>
                პასუხისმგებელი თანამშრომელი*
              </h3>
              <input hidden value={selectedEmp?.id || ""} />
              <div>
                <EmpSelectffield
                  selected={selectedEmp}
                  onChange={employeeChange}
                  options={filteredEmps}
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
