import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

//visual modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  const deleteAppt = (event) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }
  // console.log(`props.interview here`, props.interview)

  // console.log('interviewrs are', props.interviewers)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onSave={save}
          onCancel={back} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === (ERROR_DELETE) && (
        <Error
          message={'An error occurred on delete'}
          onClose={back}
        />
      )}
      {mode === (ERROR_SAVE) && (
        <Error
          message={'An error occurred on save'}
          onClose={back}
        />
      )}
    </article>
  )
}