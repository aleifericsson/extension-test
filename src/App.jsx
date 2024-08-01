import './App.css'
import { useState } from 'react';


function App() {
  const [ colour, setColour ] = useState("#000000")

  const  changeColour = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [colour],
        func: (colour) => { 
          //EVERYTHING INSIDE HERE HAPPENS IN THE WEBSITE CONTEXT
          document.body.style.color = colour
        }
      });
  }

  return (<>
    <input type="color" value={"#000000"} onChange={(e)=> {
      setColour(e.currentTarget.value)
    }}></input>
    <button onClick={changeColour
      //DO NOT PUT BRACKETS IN THIS FUNCTION e.g. changeColour()
      //THIS WILL RUN THE FUNCTION EVERY TIME USESTATE REDRAWS THE COMPONENT, NOT ON ONCLICk
    }>Change Colour</button>
  </>)
}

export default App
