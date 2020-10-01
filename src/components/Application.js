// import React from "react";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });
  
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  //variable that 
  //all is all responses from api request
  //array
  
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
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const appointmentList = dailyAppointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
