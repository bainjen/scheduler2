//+++++++FUNCTIONS USED IN USEVISUALMODE HOOK+++++++++++++
// function returns an array of appointments for given day.
export function getAppointmentsForDay(state, day) {
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

// function returns new object containing interview data from the interviewer object (returns null without interviewer)

export function getInterview(state, interview) {

  if (!interview) return null;

  //get interviewers using state.interviewers
  const interviewers = state.interviewers;

  //get value of interviewer from interview 
  const interviewerId = interview.interviewer;

  //get single interviewer object from interviewrs
  const singleInterviewer = interviewers[interviewerId];

  //combine two objects in a new object 
  const finalObject = { ...interview, interviewer: singleInterviewer };

  return finalObject;
}

// function returns an array of interviewers for given day.
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];

  const selectedDay = state.days.filter((d) => {
    return d.name === day
  })

  if (selectedDay.length === 0) return [];

  const interviewerIds = selectedDay[0].interviewers;

  const resultsArray = interviewerIds.map(elem => {
    return state.interviewers[elem];
  })

  return resultsArray
}

//+++++++FUNCTIONS USED IN USEAPPLICATIONDATA HOOK++++++++
const calculateSpotsRemaining = (state, appointments) => {
  //this returns an array of the ids for all appointments in a day [1, 2, 3, 4, 5]
  let dayAppointment = {}
  state.days.forEach((d, i) => {
    const { id, appointments } = d;
    dayAppointment[id] = [...appointments]
  })

  let dayLength = {}
  for (const [key, arr] of Object.entries(dayAppointment)) {
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

//returns a day object with the updates spots value
export const mutateDaysAtSingleDay = (state, apptId, appointments) => {
  const dayId = findDayIdFromAppointmentId(state, apptId);
  const spotsRemaining = calculateSpotsRemaining(state, appointments);
  const updatedSpot = spotsRemaining[dayId];
  const days = [...state.days]
  const updatedDays = days.map(d => {
    if (d.id === dayId) {
      d = { ...d, spots: updatedSpot }
    }
    return d;
  })
  return updatedDays;
}