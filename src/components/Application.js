// import React from "react";
import React, { useState } from "react";
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


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {

  const [day, setDay] = useState('Monday');

  //longer way of doing this: <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />

  const appointmentList = appointments.map((appointment) => {
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
