import { useEffect, useState } from "react";

const useTimeAgo = (value) => {
  const [timeAgo, setTimeAgo] = useState();

  useEffect(() => {
    const currentDate = new Date();
    const postDate = new Date(value);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      setTimeAgo("Just now");
    } else if (minutes < 60) {
      setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    } else if (hours < 24) {
      setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
    } else if (days < 7) {
      setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
    } else if (weeks < 4) {
      setTimeAgo(`${weeks} week${weeks > 1 ? "s" : ""} ago`);
    } else if (months < 12) {
      setTimeAgo(`${months} month${months > 1 ? "s" : ""} ago`);
    } else {
      setTimeAgo(`${years} year${years > 1 ? "s" : ""} ago`);
    }
  }, [value]);

  return timeAgo;
};

export default useTimeAgo;
