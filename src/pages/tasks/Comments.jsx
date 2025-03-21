const Comments = ({ comments, taskId }) => {
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
