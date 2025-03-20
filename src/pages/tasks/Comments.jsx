import Axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = "https://momentum.redberryinternship.ge/api/";
const API_TOKEN = "9e789327-8a4d-4390-b855-03f00df3e12e";

const Comments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (!taskId) return;
    const fetchComments = async () => {
      try {
        const response = await Axios.get(
          `${BASE_URL}tasks/${taskId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setComments(response.data);
      } catch (e) {
        console.log(e, "error");
        throw e;
      }
    };
    fetchComments();
  }, [taskId]);

  return (
    <div>
      {comments.map((comment) => (
        <div>{comment.text}</div>
      ))}
    </div>
  );
};

export default Comments;
