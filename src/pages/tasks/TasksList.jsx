import { useState, useEffect, useRef } from "react";
import { GetTasks } from "./Requests";
import "../../assets/TasksList.css";
import ArrowSvg from "../components/arrowSvg";

import TaskCard from "../components/TaskCard";

const TasksList = () => {
  const selectRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [empFilterDiv, setEmpFilterDiv] = useState(false);

  const handleClickOutside = (e) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target) &&
      !e.target.closest(".filter-btn")
    ) {
      setEmpFilterDiv(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await GetTasks();
      setTasks(tasks);
    };
    fetchData();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // console.log(tasks);

  const tasks1 = tasks.filter((task) => task.status.id === 1);
  const tasks2 = tasks.filter((task) => task.status.id === 2);
  const tasks3 = tasks.filter((task) => task.status.id === 3);
  const tasks4 = tasks.filter((task) => task.status.id === 4);

  const filterBtnClick = () => {
    console.log("filtered");
  };

  const empFilterBtn = (e) => {
    e.stopPropagation();
    setEmpFilterDiv(!empFilterDiv);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "40px 118px",
        gap: "52px",
      }}
    >
      <h1>დავალებების გვერდი</h1>
      <div className="filter-div-main">
        <div className="filters-div">
          <div onClick={filterBtnClick} className="filter-btn">
            <p>დეპარტამენტი</p>
            <ArrowSvg />
          </div>
          <div className="filter-btn">
            <p>პრიორიტეტი</p>
            <ArrowSvg />
          </div>
          <div onClick={empFilterBtn} className="filter-btn">
            <p style={{ color: empFilterDiv && "#8338ec" }}>თანამშრომელი</p>
            <ArrowSvg />
          </div>
          {empFilterDiv && (
            <div ref={selectRef} className="emp-filter-div">
              employee filter div
            </div>
          )}
        </div>
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
