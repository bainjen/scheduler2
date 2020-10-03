import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });


  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //edit interview data
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview: appointment.interview
    })
      .then(resp => {
        setState({
          ...state,
          appointments
        })
      })
    // .catch(e => console.error(e))
  };

  const cancelInterview = (id) => {
    //set the appointment interview to null, leaving other key/values alone
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(resp => {

        setState({
          ...state,
          appointments
        })
      })
    // .catch(e => console.error(e));
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      // console.log('interviewers', interviewers)
      setState(prev => ({ ...prev, days, appointments, interviewers }));

    })
  }, [])

  return {state, setDay, bookInterview, cancelInterview}

}

//This was removed from Application.js and made into a custom hook that is now used withing Application.js

//Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.