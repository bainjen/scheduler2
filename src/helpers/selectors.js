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

//returned object looks like this: 
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }