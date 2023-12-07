import React from "react"
import { useQuestion } from "./contexts/QuestionContext"

export default function Finished() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuestion()

  const percentage = (points / maxPossiblePoints) * 100
  let emoji
  if (percentage === 100) emoji = "🥇"
  if (percentage >= 80 && percentage < 100) emoji = "🥈"
  if (percentage >= 70 && percentage < 80) emoji = "🥉"
  if (percentage < 70) emoji = "🙃"

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  )
}
