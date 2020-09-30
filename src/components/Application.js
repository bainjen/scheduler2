// import React from "react";
import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment"

//dummy data

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
    interview: {
      student: "Gato Deluxe",
      interviewer: {
        id: 4,
        name: "Pippa",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "11am",
    interview: {
      student: "Bugs Bunny",
      interviewer: {
        id: 5,
        name: "Prairie",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "2pm",
  },
  {
    id: 6,
    time: "3pm",
  }
];


export default function Application(props) {

  const [day, setDay] = useState(""); 
  const [days, setDays] = useState([]);

  //longer way of doing this: <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />

  const appointmentList = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />
  })

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {
        setDays(res.data); 
    })
  }, [])

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
            days={days}
            day={day}
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
