import React from "react";

function monthInfo() {
  let today = new Date();
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];

  
  return month;
}

export default monthInfo;
