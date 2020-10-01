// import React from "react";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = (day) => setState({ ...state, day });

  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  //variable that 
  //all is all responses from api request
  //array

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then((all) => {

      const days = all[0].data;
      const appts = all[1].data;
      setState(prev => ({ ...prev, days, appointments: appts }));

    })
  }, [])

  console.log(dailyAppointments)
  // useEffect(() => {
  //   axios.get('http://localhost:8001/api/days')
  //   .then(res => {
  //     setDays(res.data); 
  //   })
  // }, [])

  console.log(state);
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
