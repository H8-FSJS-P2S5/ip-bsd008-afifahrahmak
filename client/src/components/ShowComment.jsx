import { useState } from "react";
import useTimeAgo from "../helpers";
const ShowComments = ({ showComments, comment }) => {
  const timeAgo = useTimeAgo();
  return (
    <>
      {showComments && (
        <div className="bg-light p-3">
          <h6>Comments:</h6>
          <hr />
          {/* ... (your existing code) */}
          {comment.map((el) => (
            <div key={el.id}>
              <li>{JSON.stringify(el.User.username)}</li>
              <p>{el.comment}</p>
              {/* <p>{timeAgo(el.createdAt)}</p> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowComments;
