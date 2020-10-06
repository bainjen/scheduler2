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
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

//We have improved the test by making it resemble the way we use our software. Instead of initializing the component with a default value, we simulate user interaction. This test is more accurate, and as a bonus, we are getting better test coverage.

//   it("submits the name entered by the user", () => {
//     const onSave = jest.fn();
//     const { getByText, getByPlaceholderText } = render(
//       <Form interviewers={interviewers} onSave={onSave} />
//     );

//     const input = getByPlaceholderText("Enter Student Name");

//     fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
//     fireEvent.click(getByText("Save"));

//     expect(onSave).toHaveBeenCalledTimes(1);
//     expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
//   });

//   When we use getByText we should be confident that the element exists. If it does not exist, then it throws an error instead. We can test for the absence of something by using queryByText and checking that the value is null.
// It is a case insensitive regular expression. This search is more general than the absolute string "Student name cannot be blank".
// The onSave reference is a mock function that we can pass to the Form component.
