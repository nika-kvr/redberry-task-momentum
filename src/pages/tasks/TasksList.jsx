import { useState, useEffect } from "react";
import { GetTasks } from "./Requests";
import "../../assets/TasksList.css";
import CommentLogo from "../../assets/images/commentImg.png";

const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TruncatedText = ({ text }) => {
  return <p className="desc-p">{truncateText(text)}</p>;
};

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await GetTasks();
      setTasks(tasks);
    };
    fetchData();
  }, []);
  console.log(tasks);

  const maxLength = 100;
  const truncatedText = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
        <h1>Filtering</h1>
      </div>
      <div className="tasks-div-main">
        {/* {tasks.map((task) => (
        <div key={task.id}>
          <h4>{task.name}</h4>
        </div>
      ))} */}
        <div className="task-div">
          <div style={{ backgroundColor: "#F7BC30" }} className="task-header">
            დასაწყები
          </div>
          <div className="task-card">
            <div className="task-card-header">
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="status-div">
                  <img src="https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg" />
                  <p style={{ fontSize: "12px" }}>საშუალო</p>
                </div>
                <div className="dep-div">
                  <p style={{ fontSize: "12px" }}>დიზაინი</p>
                </div>
              </div>
              <div className="date-div">
                <p>11 იანვ. 2025</p>
              </div>
            </div>
            <div className="task-card-main">
              <div className="task-card-name">
                <h4 className="task-name">დავალების სახელი</h4>
              </div>
              <div className="task-card-desc">
                <TruncatedText text={"airi"} />
              </div>
            </div>
            <div className="task-card-footer">
              <div>
                <img
                  className="task-card-img"
                  src="https://momentum.redberryinternship.ge/storage/employee-avatars/5fAh7dY1QWpIj3dxy8UE0uVyDryhFRiv24Bgr23e.jpg"
                />
              </div>
              <div className="comment-div">
                <img src={CommentLogo} />
                <div>8</div>
              </div>
            </div>
          </div>
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#FB5607" }} className="task-header">
            პროგრესში
          </div>
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#FF006E" }} className="task-header">
            მზად ტესტირებისთვის
          </div>
        </div>
        <div className="task-div">
          <div style={{ backgroundColor: "#3A86FF" }} className="task-header">
            დასრულებული
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
