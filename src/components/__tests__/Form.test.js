import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form name="Lydia Miller-Jones" interviewers={interviewers} />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("renders with initial student name", () => {
    const { getByPlaceholderText } = render(
      <Form name="Lydia Miller-Jones" interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue(
      "Lydia Miller-Jones"
    );
  });

  it("validates that the student name is not blank", () => {
    //create mock save fn
    const onSave = jest.fn();

    //render Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    //click the save button
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    //render Form
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
      />
    );

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});

//   When we use getByText we should be confident that the element exists. If it does not exist, then it throws an error instead. We can test for the absence of something by using queryByText and checking that the value is null.
// It is a case insensitive regular expression. This search is more general than the absolute string "Student name cannot be blank".
// The onSave reference is a mock function that we can pass to the Form component.
