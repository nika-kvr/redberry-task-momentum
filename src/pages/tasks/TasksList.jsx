import { useState, useEffect, useRef } from "react";
import {
  GetTasks,
  GetEmployees,
  GetPriorities,
  GetDepartments,
} from "./Requests";
import "../../assets/TasksList.css";
import ArrowSvg from "../components/arrowSvg";
import TaskCard from "../components/TaskCard";
import { CheckSvg } from "../components/CheckSvg";
import x from "../../assets/images/x.png";

const TasksList = () => {
  const selectRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const [filterEmp, setFilterEmp] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState("");

  const [filterDeps, setFilterDeps] = useState([]);
  const [selectedDeps, setSelectedDeps] = useState([]);

  const [filterPrios, setFilterPrios] = useState([]);
  const [selectedPrios, setSelectedPrios] = useState([]);

  const [empFilterDiv, setEmpFilterDiv] = useState(false);
  const [depFilterDiv, setDepFilterDiv] = useState(false);
  const [priosFilterDiv, setPriosFilterDiv] = useState(false);

  // console.log(tasks);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await GetTasks();
      const employees = await GetEmployees();
      const departments = await GetDepartments();
      const priorities = await GetPriorities();

      setFilteredTasks(tasks);
      setTasks(tasks);
      setEmployees(employees);
      setDepartments(departments);
      setPriorities(priorities);
    };
    fetchData();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target) &&
      !e.target.closest(".filter-btn")
    ) {
      setEmpFilterDiv(false);
      setDepFilterDiv(false);
      setPriosFilterDiv(false);

      setSelectedEmpId(filterEmp);
      setSelectedDeps(selectedDeps);
      setSelectedPrios(selectedPrios);
    }
  };

  // filter tasks
  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const filterWithEmployee = filterEmp
        ? Number(filterEmp) === task.employee.id
        : true;
      const filterWithDeps =
        filterDeps && filterDeps.length > 0
          ? filterDeps.includes(task.department.id)
          : true;

      const filterWithPrios =
        filterPrios && filterPrios.length > 0
          ? filterPrios.includes(task.priority.id)
          : true;

      return filterWithEmployee && filterWithDeps && filterWithPrios;
    });
    setFilteredTasks(filteredTasks);
    localStorage.setItem("filterEmp", filterEmp);
    localStorage.setItem("filterDeps", JSON.stringify(filterDeps));
    localStorage.setItem("filterPrios", JSON.stringify(filterPrios));
  }, [filterEmp, filterDeps, filterPrios]);

  const tasks1 = filteredTasks.filter((task) => task.status.id === 1);
  const tasks2 = filteredTasks.filter((task) => task.status.id === 2);
  const tasks3 = filteredTasks.filter((task) => task.status.id === 3);
  const tasks4 = filteredTasks.filter((task) => task.status.id === 4);

  const handleChooseEmp = () => {
    setEmpFilterDiv(false);
    setFilterEmp(selectedEmpId);
  };

  const handleChooseDeps = () => {
    setDepFilterDiv(false);
    setFilterDeps(selectedDeps);
  };
  const handleChoosePrios = () => {
    setFilterPrios(selectedPrios);
    setPriosFilterDiv(false);
  };

  const handleEmpCheck = (empId) => {
    if (selectedEmpId === empId) {
      setSelectedEmpId("");
      return;
    }
    setSelectedEmpId(empId);
  };

  const handleDepsCheck = (depId) => {
    if (selectedDeps.includes(depId)) {
      setSelectedDeps(selectedDeps.filter((dep) => dep !== depId));
      return;
    }
    setSelectedDeps((prevDeps) => [...prevDeps, depId]);
  };
  const handlePriosCheck = (prioId) => {
    if (selectedPrios.includes(prioId)) {
      setSelectedPrios(selectedPrios.filter((prio) => prio !== prioId));
      return;
    }
    setSelectedPrios((prevPrios) => [...prevPrios, prioId]);
  };

  const empFilterBtn = (e) => {
    setDepFilterDiv(false);
    setPriosFilterDiv(false);
    e.stopPropagation();
    setEmpFilterDiv(!empFilterDiv);
    setSelectedEmpId(filterEmp);
  };

  const depFilterBtn = (e) => {
    e.stopPropagation();
    setEmpFilterDiv(false);
    setPriosFilterDiv(false);
    setDepFilterDiv(!depFilterDiv);
    setSelectedDeps(filterDeps);
  };

  const priosFilterBtn = (e) => {
    e.stopPropagation();
    setEmpFilterDiv(false);
    setDepFilterDiv(false);
    setPriosFilterDiv(!priosFilterDiv);
    setSelectedPrios(filterPrios);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "40px 118px",
      }}
    >
      <h1>დავალებების გვერდი</h1>
      <div className="filter-div-main">
        <div className="filters-div">
          <div onClick={depFilterBtn} className="filter-btn">
            <p style={{ color: depFilterDiv && "#8338ec" }}>დეპარტამენტი</p>
            <div className={`arrow ${depFilterDiv && "open"}`}>
              <ArrowSvg />
            </div>
          </div>
          {depFilterDiv && (
            <div ref={selectRef} className="emp-filter-div">
              <div className="emp-div-main">
                {departments.map((dep) => (
                  <div key={dep.id} className="emp-div">
                    <div
                      onClick={() => handleDepsCheck(dep.id)}
                      className="checkbox"
                    >
                      {selectedDeps.includes(dep.id) && <CheckSvg />}
                    </div>
                    <div className="name-sname-dvi">
                      <p>{dep.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-div">
                <button
                  onClick={handleChooseDeps}
                  className="purple-btn filter-btn-choose"
                >
                  არჩევა
                </button>
              </div>
            </div>
          )}
          <div onClick={priosFilterBtn} className="filter-btn">
            <p style={{ color: priosFilterDiv && "#8338ec" }}>პრიორიტეტი</p>
            <div className={`arrow ${priosFilterDiv && "open"}`}>
              <ArrowSvg />
            </div>
          </div>

          {priosFilterDiv && (
            <div ref={selectRef} className="emp-filter-div">
              <div className="emp-div-main">
                {priorities.map((prio) => (
                  <div key={prio.id} className="emp-div">
                    <div
                      onClick={() => handlePriosCheck(prio.id)}
                      className="checkbox"
                    >
                      {selectedPrios.includes(prio.id) && <CheckSvg />}
                    </div>
                    <div className="name-sname-dvi">
                      <p>{prio.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-div">
                <button
                  onClick={handleChoosePrios}
                  className="purple-btn filter-btn-choose"
                >
                  არჩევა
                </button>
              </div>
            </div>
          )}

          <div onClick={empFilterBtn} className="filter-btn">
            <p style={{ color: empFilterDiv && "#8338ec" }}>თანამშრომელი</p>
            <div className={`arrow ${empFilterDiv && "open"}`}>
              <ArrowSvg />
            </div>
          </div>
          {empFilterDiv && (
            <div ref={selectRef} className="emp-filter-div">
              <div className="emp-div-main">
                {employees.map((emp) => (
                  <div key={emp.id} className="emp-div">
                    <div
                      onClick={() => handleEmpCheck(emp.id)}
                      className="checkbox"
                    >
                      {selectedEmpId === emp.id && <CheckSvg />}
                    </div>
                    <img className="task-card-img" src={emp.avatar} />
                    <div className="name-sname-dvi">
                      <p>{emp.name}</p>
                      <p>{emp.surname}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-div">
                <button
                  onClick={handleChooseEmp}
                  className="purple-btn filter-btn-choose"
                >
                  არჩევა
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filter-btns-div">
        {filterEmp && (
          <div onClick={() => setFilterEmp("")}>
            <div style={{ all: "unset" }}>
              {employees.find((emp) => emp.id === filterEmp).name}
            </div>
            <div style={{ all: "unset" }}>
              {employees.find((emp) => emp.id === filterEmp).surname}
            </div>
            <img src={x} />
          </div>
        )}
        {filterDeps.length > 0 && (
          <div onClick={() => setFilterDeps([])}>
            {/* {departments.find((dep) => dep.id === filterDeps[0]).name} */}
            <p>დეპარტამენტი</p>
            <img src={x} />
          </div>
        )}
        {filterPrios.length > 0 && (
          <div onClick={() => setFilterPrios([])}>
            {/* {priorities.find((prio) => prio.id === filterPrios[0]).name} */}
            <p>პრიორიტეტი</p>
            <img src={x} />
          </div>
        )}

        {(filterEmp || filterDeps.length > 0 || filterPrios.length > 0) && (
          <button
            onClick={() => {
              setFilterEmp("");
              setFilterDeps([]);
              setFilterPrios([]);
            }}
            className="dlt-filters-btn"
          >
            გასუფთავება
          </button>
        )}
      </div>

      <div className="tasks-div-main">
        <div className="task-div">
          <div style={{ backgroundColor: "#F7BC30" }} className="task-header">
            დასაწყები
          </div>
          {tasks1.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#FB5607" }} className="task-header">
            პროგრესში
          </div>
          {tasks2.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#FF006E" }} className="task-header">
            მზად ტესტირებისთვის
          </div>
          {tasks3.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#3A86FF" }} className="task-header">
            დასრულებული
          </div>
          {tasks4.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
