import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {

  //props.interview has value render show, else render empty
  const apptCondition = (props.interview) ? (
    <Show student={props.interview.student}
      interviewer={props.interview.interviewer} />
    ) : (
      <Empty />
    ); 

  return (
    <article className="appointment">
      <Header time={props.time} />
      {apptCondition}
    </article>
  )
}