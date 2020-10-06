import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //store history of modes in a stateful array called history
  const [history, setHistory] = useState([initial]);

  //When transition is called, we need to add the new mode to our history.
  function transition(newMode, replace = false) {
    if (replace) { //if replace is true, change mode, don't add to history so that back calls the last time replace was not true.
      setMode(newMode);
    } else {
      setMode(newMode)
      //use spread because you want to copy everything that already exists in history AND newMode
      setHistory(prev => [...prev, newMode])
    }
  }

  //When back is called, we should set the mode to the previous item in our history array.
  function back() {
    history.pop()
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
//function tracks the mode of appointments as a stateful variable. Modes are: empty -- show -- create/edit -- saving/deleting -- confirm