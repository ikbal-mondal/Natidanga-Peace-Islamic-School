import React, { useState, useEffect } from "react";

// Helper function definitions (you can place these in a separate file if preferred)
const getDateDifference = (admissionDateStr) => {
  const admissionDate = new Date(admissionDateStr);
  console.log(admissionDate,"admission date");
  const now = new Date();

  let years = now.getFullYear() - admissionDate.getFullYear();
  let months = now.getMonth() - admissionDate.getMonth();
  let days = now.getDate() - admissionDate.getDate();
  console.log(years,months,days,"years months day")

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

const formatDifference = (diff) => {
  if (diff.years > 0) {
    return `${diff.years} year${diff.years > 1 ? "s" : ""}, ${diff.months} month${diff.months !== 1 ? "s" : ""}, ${diff.days} day${diff.days !== 1 ? "s" : ""}`;
  } else {
    return `${diff.months} month${diff.months !== 1 ? "s" : ""}, ${diff.days} day${diff.days !== 1 ? "s" : ""}`;
  }
};

const StudentAdmissionDuration = ({ studentInfo }) => {
  const [duration, setDuration] = useState("");

  const updateDuration = () => {
    const diff = getDateDifference(studentInfo.admissionDate);
    setDuration(formatDifference(diff));
  };

  useEffect(() => {
    // Calculate the duration when the component mounts
    updateDuration();

    // Optionally update once per day (86400000 milliseconds)
    const intervalId = setInterval(() => {
      updateDuration();
    }, 86400000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [studentInfo.admissionDate]);

  return (
    <div className="p-4">
      <p>
        Total due : {duration}
      </p>
    </div>
  );
};

export default StudentAdmissionDuration;
