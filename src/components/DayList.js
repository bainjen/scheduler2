import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  //need to map over an array(days) of day objects
  const dayListItems = props.days.map((day) => {
    return (
      <DayListItem key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} />

    )
  })
  console.log(dayListItems); 
  return (
    <ul>
      {dayListItems}
    </ul>
  )
}