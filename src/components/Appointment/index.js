import React from "react";
import axios from "axios";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

//visual modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"



export default function Appointment(props) {

  //props.interview has value render show, else render empty
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/> }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )
}