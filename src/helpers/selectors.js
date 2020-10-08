//+++++++FUNCTIONS USED IN USEVISUALMODE HOOK+++++++++++++

// function returns an array of appointments for given day.
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];

  const selectedDay = state.days.filter((d) => {
    return d.name === day;
  });

  if (selectedDay.length === 0) return [];

  const apptIds = selectedDay[0].appointments;

  const resultsArray = apptIds.map((elem) => {
    return state.appointments[elem];
  });

  return resultsArray;
}

// function returns a new object containing relevant data pertaining to selected interview
export function getInterview(state, interview) {
  if (!interview) return null;

  //get interviewers using state.interviewers
  const interviewers = state.interviewers;

  //get value of interviewer from interview obj
  const interviewerId = interview.interviewer;

  //get single interviewer object from interviewers
  const singleInterviewer = interviewers[interviewerId];

  //combine data in a new object
  const finalObject = { ...interview, interviewer: singleInterviewer };

  return finalObject;
}

// function returns an array of interviewers for given day.
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];

  const selectedDay = state.days.filter((d) => {
    return d.name === day;
  });

  if (selectedDay.length === 0) return [];

  const interviewerIds = selectedDay[0].interviewers;

  const resultsArray = interviewerIds.map((elem) => {
    return state.interviewers[elem];
  });

  return resultsArray;
}

//+++++++FUNCTIONS USED IN USEAPPLICATIONDATA HOOK++++++++

//function returns an object where the key is the id of a day and the value is the number of null (empty/avilable) appointments
const calculateSpotsRemaining = (state, appointments) => {
  let dayAppointment = {};
  state.days.forEach((d, i) => {
    const { id, appointments } = d;
    //this returns an array of the ids for all appointments in a day [1, 2, 3, 4, 5]
    dayAppointment[id] = [...appointments];
  });

  let dayLength = {};
  for (const [key, arr] of Object.entries(dayAppointment)) {
    let count = 0;
    arr.forEach((v) => {
      if (appointments[v].interview) {
        count++;
      }
      dayLength[key] = arr.length - count;
    });
  }
  return dayLength;
};

//function checks each day to find the appt id that was passed in and returns the corresponding day id.
const findDayIdFromAppointmentId = (state, apptId) => {
  let dayId;
  state.days.forEach((d) => {
    const { id, appointments } = d;
    if (appointments.includes(apptId)) {
      dayId = id;
    }
  });
  return dayId;
};

//function returns a day object with the updated spots value
export const mutateDaysAtSingleDay = (state, apptId, appointments) => {
  const dayId = findDayIdFromAppointmentId(state, apptId);
  const spotsRemaining = calculateSpotsRemaining(state, appointments);
  const updatedSpot = spotsRemaining[dayId];
  const days = [...state.days];
  const updatedDays = days.map((d) => {
    if (d.id === dayId) {
      d = { ...d, spots: updatedSpot };
    }
    return d;
  });
  return updatedDays;
};
