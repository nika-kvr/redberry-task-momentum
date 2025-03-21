import { use, useState } from "react";
import ReplySvg from "../components/ReplySvg";
import { PostComment } from "./Requests";

const Comments = ({ comments, taskId, refetch }) => {
  const [replyComment, setReplyComment] = useState("");
  const [openedReply, setOpenedReply] = useState("");

  const postReplyComment = async (parent_id, taskId) => {
    if (replyComment) {
      const data = {
        text: replyComment,
        parent_id: parent_id,
      };

      const res = await PostComment(data, taskId);
      if (res.status === 201) {
        setReplyComment("");
        setOpenedReply("");
        refetch();
      }
    }
  };

  const handleReplyBtn = (commentId) => {
    if (openedReply === commentId) {
      setOpenedReply("");
      return;
    }
    setOpenedReply(commentId);
  };
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
        <div>
          <div className="comment-card">
            <img
              style={{ width: "36px", height: "36px" }}
              className="emp-img"
              src={comment.author_avatar}
            />
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
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginLeft: "44px",
              flexDirection: "column",
            }}
          >
            <div
              onClick={() => handleReplyBtn(comment.id)}
              className="reply-btn"
            >
              <div>
                <ReplySvg />
              </div>
              <p style={{ color: "#8338EC", fontSize: "12px" }}>უპასუხე</p>
            </div>
            {openedReply === comment.id && (
              <div className="replied-comment">
                <div
                  style={{
                    position: "relative",
                    right: "20px",
                    bottom: "15px",
                  }}
                >
                  <textarea
                    value={replyComment}
                    placeholder="დაწერე კომენტარი"
                    className="text-area"
                    style={{
                      marginTop: "40px",
                      borderRadius: "10px",
                      padding: "28px 20px",
                    }}
                    onChange={(e) => setReplyComment(e.target.value)}
                  />
                  <button
                    style={{
                      borderRadius: "20px",
                      position: "absolute",
                      right: "20px",
                      bottom: "15px",
                    }}
                    className="purple-btn"
                    onClick={() =>
                      postReplyComment(comment.id, comment.task_id)
                    }
                  >
                    დააკომენტარე
                  </button>
                </div>
              </div>
            )}
            {comment.sub_comments?.map((subComment) => (
              <div>
                <div className="comment-card">
                  <img
                    style={{ width: "36px", height: "36px" }}
                    className="emp-img"
                    src={subComment.author_avatar}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <h4>{subComment.author_nickname} </h4>
                    <div>{subComment.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
