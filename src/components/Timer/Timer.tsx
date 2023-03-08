import React, { Component } from 'react'
import './Timer.css'

export default class Timer extends Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        <button className="icon icon-play"></button>
        <button className="icon icon-pause"></button>
        <span className="timer-text"></span>
      </React.Fragment>
    )
  }
}
