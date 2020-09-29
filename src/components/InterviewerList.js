import React from "react";
import classnames from "classnames"
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  // const buttonClass = classnames("button", {
  //   "button--confirm": props.confirm,
  //   "button--danger": props.danger
  // });

  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>

  );
}
