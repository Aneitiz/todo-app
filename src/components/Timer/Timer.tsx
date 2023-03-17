import React, { useEffect, useState } from 'react'

interface TimerProps {
  timeLeft: number
  done: boolean
  onTimer: Function
  id: number
}

const Timer = ({ timeLeft, done, onTimer, id }: TimerProps) => {
  const [CurrentTimer, setCurrentTimer] = useState(timeLeft)
  const [launch, setLaunch] = useState(false)

  useEffect(() => {
    if (done) {
      setLaunch(false)
    }
    if (!CurrentTimer) {
      setLaunch(false)
    }
    const timer = setInterval(() => {
      if (launch && !done) {
        setCurrentTimer(CurrentTimer - 1)
      }
    }, 1000)
    if (!launch) {
      clearInterval(timer)
    }
    onTimer(id, CurrentTimer)
    return () => clearInterval(timer)
  }, [done, launch, CurrentTimer])

  const startTimer = () => {
    setLaunch(true)
  }

  const stopTimer = () => {
    setLaunch(false)
  }

  const timerView = (time: number) => {
    let minutes: number | string = Math.floor(time / 60)
    minutes = (minutes + '').length == 1 ? `0${minutes}` : minutes
    let seconds: number | string = Math.floor(time % 60)
    seconds = (seconds + '').length == 1 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  return (
    <React.Fragment>
      <button type="button" className="icon icon-play" onClick={startTimer} />
      <button type="button" className="icon icon-pause" onClick={stopTimer} />
      <span className="timer-text">{timerView(CurrentTimer)}</span>
    </React.Fragment>
  )
}

export default Timer
