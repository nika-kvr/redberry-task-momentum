import { useEffect, useState } from "react";
import { GetComments } from "./Requests";

const Comments = ({ comments, taskId }) => {
  // const [comments, setComments] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!taskId) return;
  //   const fetchComments = async () => {
  //     try {
  //       const response = await GetComments(taskId);
  //       setComments(response);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchComments();
  // }, [taskId]);

  // console.log(comments);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="comments-div">
      {comments && (
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <h3>კომენტარები</h3>
          <div style={{ width: "12px" }} className="dep-div">
            {comments.length}
          </div>
        </div>
      )}
      {comments?.map((comment) => (
        <div className="comment-card">
          <img className="emp-img" src={comment.author_avatar} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4>{comment.author_nickname} </h4>
            <div>{comment.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
