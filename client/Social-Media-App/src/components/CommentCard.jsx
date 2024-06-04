// components/Comment.jsx
import { useCallback } from "react";
import { useState } from "react";

let Comment = ({ comment, onDelete }) => {
  if (!comment) {
    const [loading, setLoading] = useState(false);

    return null;
  }

  setLoading?.(true);

  return (
    <div className="flex space-x-2">
      <img
        src={comment.User.profile_picture}
        alt={`${comment.User.name}'s profile`}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{comment.User.name}</p>
          <button
            className="text-xs text-gray-400 hover:text-gray-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
