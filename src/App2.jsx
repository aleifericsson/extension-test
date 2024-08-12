import { useEffect, useState } from 'react'
import './App.css'
import { find, read, write } from './qol'

function update(time){
  console.log("slIAKgu")
  write(find(".bruh"),  `time: ${time}`)
}

function App2() {
  console.log("aaaa")
  setTimeout(function() {
    
  }, 1000);

  return (<div className='bruh'>
    time: {text_time}
  </div>)
}

export {App2, update}
