import React from "react";
import { useState, useEffect } from "react";
import "../../assets/TaskForm.css";
import "../../assets/Selectfield.css";
import SelectField from "../components/Selectfield.jsx";
import {
  GetDepartments,
  GetEmployees,
  GetPriorities,
  GetStatuses,
} from "./Requests.jsx";

import dayjs from "dayjs";

const TaskForm = () => {
  const [selectedDep, setSelectedDep] = useState("");
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedPrio, setSelectedPrio] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});

  const [departments, setDepartments] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const departments = await GetDepartments();
      const employees = await GetEmployees();
      const priorities = await GetPriorities();
      const statuses = await GetStatuses();

      setPriorities(priorities);
      setDepartments(departments);
      setEmployees(employees);
      setStatuses(statuses);
      setSelectedPrio(priorities[1]);
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
  const prioritiesChange = (option) => {
    setSelectedPrio(option);
  };
  const statusesChange = (option) => {
    setSelectedStatus(option);
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
                  selected={selectedDep}
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
                <SelectField
                  selected={selectedEmp}
                  onChange={employeeChange}
                  options={filteredEmps}
                />
              </div>
            </div>
          </div>
          <div
            style={{ gap: "31px" }}
            className="form-name-div form-name-div-task"
          >
            <div className="inside-form-div">
              <h3>პრიორიტეტი*</h3>
              <div>
                <input hidden value={selectedPrio?.id || ""} />
                <SelectField
                  width={"small"}
                  selected={selectedPrio}
                  onChange={prioritiesChange}
                  options={priorities}
                />
              </div>
            </div>
            <div className="inside-form-div">
              <h3>სტატუსი*</h3>
              <div>
                <input hidden value={selectedStatus?.id || ""} />
                <SelectField
                  width={"small"}
                  selected={selectedStatus}
                  onChange={statusesChange}
                  options={statuses}
                />
              </div>
            </div>
            <div className="inside-form-div calendar-div">
              <h3>დედლაინი</h3>
              <div>
                <input
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="form-input "
                  type="date"
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
