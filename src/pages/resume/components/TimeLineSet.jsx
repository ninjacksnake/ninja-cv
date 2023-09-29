import React from "react";
import './timeLineSet.css'
const TimeLineSet = ( {info} ) => {
  console.log('from timelineset' , info)
  return (
    <>
      <div className="timeLineSetContainer">
         <b>{info.title}</b>  {new Date(info.endDate).toLocaleDateString()} - {new Date(info.endDate).toLocaleDateString()}
      </div>
    </>
  );
};

export default TimeLineSet;
