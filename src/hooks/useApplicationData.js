import { useState, useEffect } from "react";

import axios from "axios";

import { mutateDaysAtSingleDay } from "../helpers/selectors";

//custom hook will return an object with four keys.
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //used to set the current day.
  const setDay = (day) => setState({ ...state, day });

  //makes an HTTP request and updates the local state.
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = mutateDaysAtSingleDay(state, id, appointments);

    //called when user edits interview data
    return axios
      .put(`/api/appointments/${id}`, {
        interview: appointment.interview,
      })
      .then((resp) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };
  //makes an HTTP request and updates the local state.
  const cancelInterview = (id) => {
    //set the appointment interview to null, leaving other key/values alone
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = mutateDaysAtSingleDay(state, id, appointments);

    //called when user deletes an interview
    return axios.delete(`/api/appointments/${id}`).then((resp) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
