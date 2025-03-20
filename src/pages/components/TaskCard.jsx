import CommentLogo from "../../assets/images/commentImg.png";
import { useNavigate } from "react-router-dom";

const truncateText = (text, size) => {
  if (!text) return "";
  let maxLength = 70;
  if (size === "sm") maxLength = 10;
  return text.length > maxLength ? text.slice(0, maxLength) + ".." : text;
};

const TruncatedText = ({ text, size }) => {
  return truncateText(text, size);
};

const getPriorityColor = (priorityId) => {
  return priorityId === 1
    ? "#08A508"
    : priorityId === 2
    ? "#FFBE0B"
    : "#FA4D4D";
};

const getBorderColor = (statusId) => {
  return statusId === 1
    ? "#F7BC30"
    : statusId === 2
    ? "#FB5607"
    : statusId === 3
    ? "#FF006E"
    : "#3A86FF";
};

const TaskCard = (data) => {
  const navigate = useNavigate();
  const task = data.data;
  const due_date = task.due_date.slice(0, 10);
  return (
    <div>
      <div
        onClick={() => {
          navigate(`/task/${task.id}`);
        }}
        style={{
          borderColor: getBorderColor(task.status.id),
        }}
        className="task-card"
      >
        <div className="task-card-header">
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                borderColor: getPriorityColor(task.priority.id),
              }}
              className="status-div"
            >
              <img src={task.priority.icon} />
              <p
                style={{
                  fontSize: "12px",
                  color: getPriorityColor(task.priority.id),
                }}
              >
                {task.priority.name}
              </p>
            </div>
            <div className="dep-div">
              <p style={{ fontSize: "12px" }}>
                <TruncatedText text={task.department.name} size="sm" />
              </p>
            </div>
          </div>
          <div className="date-div">
            <p>{due_date}</p>
          </div>
        </div>
        <div className="task-card-main">
          <div className="task-card-name">
            <h4 className="task-name">{task.name}</h4>
          </div>
          <div className="task-card-desc">
            <p className="desc-p">
              <TruncatedText text={task.description} />
            </p>
          </div>
        </div>
        <div className="task-card-footer">
          <div>
            <img className="task-card-img" src={task.employee.avatar} />
          </div>
          <div className="comment-div">
            <img src={CommentLogo} />
            <div>{task.total_comments}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
