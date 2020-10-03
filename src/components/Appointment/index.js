import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm"; 

//visual modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"; 
const CONFIRM = "CONFIRMING"; 

export default function Appointment(props) {

  //props.interview has value render show, else render empty
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  const deleteAppt = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
          onSave={save}
          onCancel={back} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && (
        <Status message={'saving'} />
      )}
       {mode === DELETING && (
        <Status message={'deleting'} />
      )}
      {mode === CONFIRM && (
        <Confirm
        message={'Are you sure you want to cancel this appointment?'}
          onConfirm={deleteAppt}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  )
}