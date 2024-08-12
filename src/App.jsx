import './App.css'
import { useEffect, useState } from 'react';
import { find } from './qol';

let init_color = "#000000"

chrome.action.onClicked.addListener(tab => {
  console.log("mounted")
  loadSaved()
  find(".color").value = init_color
})

function App() {
  const [ colour, setColour ] = useState("#000000")

  const  changeColour = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [colour],
        func: (colour) => { 
          //EVERYTHING INSIDE HERE HAPPENS IN THE WEBSITE CONTEXT
          //let storage = chrome.storage.local.get(["color"])
          chrome.storage.local.set({color:colour})
          document.body.style.color = colour
        }
      });
  }


  const  loadSaved = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
      init_color = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => { 
          //EVERYTHING INSIDE HERE HAPPENS IN THE WEBSITE CONTEXT
          let col = chrome.storage.local.get(["color"])
          return col
        }
      })
      console.log(init_color)
  }

    
  return (<>
    <input type="color" className= "color" value={colour} onChange={(e)=> {
      setColour(e.currentTarget.value)
    }}></input>
    <button onClick={changeColour
      //DO NOT PUT BRACKETS IN THIS FUNCTION e.g. changeColour()
      //THIS WILL RUN THE FUNCTION EVERY TIME USESTATE REDRAWS THE COMPONENT, NOT ON ONCLICk
    }>Change Colour</button>
    <button onClick={loadSaved
    }>Load</button>
  </>)
}

export default App
