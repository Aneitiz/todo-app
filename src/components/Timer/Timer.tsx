import React, { Component } from 'react'

interface TimerProps {
  timeLeft: number
  done: boolean
  onTimer: Function
  id: number
}

interface TimerState {
  CurrentTimer: number
}

export default class Timer extends Component<TimerProps, TimerState> {
  state = {
    CurrentTimer: this.props.timeLeft,
  }

  timer: any = null

  startTimer = () => {
    if (!this.timer || this.state.CurrentTimer > 0) {
      this.timer = setInterval(this.timerCounter, 1000)
    }
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.timer = false
  }

  timerCounter = () => {
    const { CurrentTimer } = this.state
    if (!CurrentTimer || this.props.done) {
      this.stopTimer()
      return
    }
    this.setState({
      CurrentTimer: CurrentTimer - 1,
    })
    this.props.onTimer(this.props.id, CurrentTimer - 1)
  }

  timerView = (time: number) => {
    let minutes: number | string = Math.floor(time / 60)
    minutes = (minutes + '').length == 1 ? `0${minutes}` : minutes
    let seconds: number | string = Math.floor(time % 60)
    seconds = (seconds + '').length == 1 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  render() {
    const { CurrentTimer } = this.state
    return (
      <React.Fragment>
        <button type="button" className="icon icon-play" onClick={this.startTimer} />
        <button type="button" className="icon icon-pause" onClick={this.stopTimer} />
        <span className="timer-text">{this.timerView(CurrentTimer)}</span>
      </React.Fragment>
    )
  }
}
