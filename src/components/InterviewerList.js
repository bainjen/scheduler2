import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem"


export default function InterviewerList(props) {

  //map over array of interviewers. Each interviewer has id, name, avatar url
  const interviewerListItems = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
      />
    )
  })

  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>

  );
}
