import React, { useEffect } from "react"
import { useQuestion } from "./contexts/QuestionContext"

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuestion()
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" })
      }, 1000)

      return () => {
        clearInterval(id)
      }
    },
    [dispatch]
  )
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  )
}
