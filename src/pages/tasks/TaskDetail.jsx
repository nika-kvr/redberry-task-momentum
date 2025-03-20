import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetTask, GetStatuses, PutTask } from "./Requests";
import "../../assets/TaskDetail.css";
import "../../assets/TasksList.css";
import StatusSvg from "../components/statusSvg";
import EmployeeSvg from "../components/EmployeeSvg";
import CalendarSvg from "../components/CalendarSvg";
import Selectfield from "../components/Selectfield";
import Comment from "./Comments";

const TaskDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => GetTask(id),
    retry: Infinity,
  });

  const {
    data: statuses,
    errorStatus,
    isLoadingStatus,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: GetStatuses,
    retry: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (isLoadingStatus) return <div>Loading...</div>;
  if (errorStatus) return <div>Error loading data</div>;

  console.log(data);

  const getPriorityColor = (priorityId) => {
    return priorityId === 1
      ? "#08A508"
      : priorityId === 2
      ? "#FFBE0B"
      : "#FA4D4D";
  };

  const truncateText = (text, size) => {
    if (!text) return "";
    let maxLength = 70;
    if (size === "sm") maxLength = 10;
    return text.length > maxLength ? text.slice(0, maxLength) + ".." : text;
  };

  const TruncatedText = ({ text, size }) => {
    return truncateText(text, size);
  };
  const handleStatusChange = async (option) => {
    const dataReq = {
      status_id: option.id,
    };
    const taskId = data.id;
    console.log(data, taskId);
    const res = await PutTask(taskId, dataReq);
    if (res.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="main-div">
        <div className="task-det-div">
          <div className="task-det-status">
            <div
              style={{ borderColor: getPriorityColor(data.priority.id) }}
              className="status-div"
            >
              <img src={data.priority.icon} />
              <p style={{ color: getPriorityColor(data.priority.id) }}>
                {data.priority.name}
              </p>
            </div>
            <div className="dep-div">
              {<TruncatedText text={data.department.name} size="sm" />}
            </div>
          </div>
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h2
              style={{
                overflowWrap: "break-word",
                width: "715px",
                textAlign: "left",
              }}
            >
              {data.name}
            </h2>
            <div
              style={{
                width: "712px",
                wordWrap: "break-word",
                marginTop: "26px",
                textAlign: "left",
              }}
            >
              {data.description}
            </div>
          </div>
          <div className="task-det-details">
            <h3>დავალების დეტალები</h3>
            <div
              style={{
                width: "495px",
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div className="task-detail">
                <StatusSvg />
                <p>სტატუსი</p>
              </div>
              <div className="task-detail">
                <Selectfield
                  width={"small"}
                  options={statuses}
                  selected={data.status}
                  onChange={handleStatusChange}
                />
              </div>
              <div className="task-detail">
                <EmployeeSvg />
                <p>თანამშრომელი</p>
              </div>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
                className="task-detail"
              >
                <div>
                  <img className="task-card-img" src={data.employee.avatar} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", width: "200px" }}>
                    {data.department.name}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div>{data.employee.name}</div>
                    <div>{data.employee.surname}</div>
                  </div>
                </div>
              </div>
              <div className="task-detail">
                <CalendarSvg />
                <p>დავალების ვადა</p>
              </div>
              <div className="task-detail">{data.due_date.split("T")[0]}</div>
            </div>
          </div>
        </div>
        <div className="comments-main-div">
          <div style={{ position: "relative", right: "20px", bottom: "15px" }}>
            <textarea
              placeholder="დაწერე კომენტარი"
              className="text-area"
              style={{
                marginTop: "40px",
                borderRadius: "10px",
                padding: "28px 20px",
              }}
            />
            <button
              style={{
                borderRadius: "20px",
                position: "absolute",
                right: "20px",
                bottom: "15px",
              }}
              className="purple-btn"
            >
              დააკომენტარე
            </button>
          </div>
          <div className="comments-div">
            <Comment taskId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
