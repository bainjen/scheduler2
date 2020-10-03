import { useState, useEffect } from 'react';
import axios from 'axios';


const calculateSpotsRemaining = (state) => {

  //this returns an array of the ids for all appointments in a day [1, 2, 3, 4, 5]
  let dayAppointment = {}
  state.days.forEach((d, i) => {
    const { id, appointments } = d;
    dayAppointment[id] = [...appointments]
  })

    //need to map returned array from above to State.appointments[id].interview is null?
  let dayLength = {}
  for (const [key, arr] of Object.entries(dayAppointment)) {
    const { appointments } = state; 
    let count = 0;
    arr.forEach(v => {
      if (appointments[v].interview) {
        count++;
      }
      dayLength[key] = arr.length - count;
    })

  }
  //dayLength returns an object where the key is the day's id and the value is the number of null (empty/avilable) appointments 
  
  return dayLength;
}

//looking inside of each day to see whether the appt id is included in the array of appointments for each day. If the appt belongs to a certain day, return the day id. 
const findDayIdFromAppointmentId = (state, apptId) => {
  let dayId; 
  state.days.forEach(d => {
    const { id, appointments } = d; 
    if (appointments.includes(apptId)) {
      dayId = id;
    } 
  })
  return dayId; 
}


const mutateDaysAtSingleDay = (state, dayId, newVal) => {
  
}




export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });


  const bookInterview = (id, interview) => {

      //need a function that takes in the appointment id and returns the day id.
      //Need days[arrayvalue].id === output of above function (object still)
      //take above result and update spots
      //pass it through other functions to update useState
console.log('we are lookig here', findDayIdFromAppointmentId(state, id))
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
  console.log(calculateSpotsRemaining(state))
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

//Our goal is to improve the maintainability of the code by separating the rendering concern from the state management concern in our application.

//This was removed from Application.js and made into a custom hook that is now used withing Application.js

//Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.