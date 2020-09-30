//We are going to create a function called getAppointmentsForDay that will receive two arguments state and day. The function will return an array of appointments for the given day.

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  if (state.days.length === 0) return []; 
  
  const selectedDay = state.days.filter((d) => {
    return d.name === day 
  })

  if (selectedDay.length === 0) return [];

  const apptIds = selectedDay[0].appointments;

  const resultsArray = apptIds.map(elem => {
    return state.appointments[elem]; 
  })
  
  return resultsArray
}

