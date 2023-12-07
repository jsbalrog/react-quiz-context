import { createContext, useContext, useEffect, useReducer } from "react"

const QuestionContext = createContext()

const initialState = {
  questions: [],
  // valid statii: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  numQuestions: null,
  maxPossiblePoints: null,
}

const SECONDS_PER_QUESTION = 30
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case "nextQuestion":
      return {
        ...state,
        currQuestion: state.questions[state.index + 1],
        index: state.index + 1,
        answer: null,
      }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }
    default:
      throw new Error("Action unkown")
  }
}

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (previous, current) => previous + current.points,
    0
  )

  useEffect(
    function () {
      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }))
    },
    [dispatch]
  )

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

function useQuestion() {
  const context = useContext(QuestionContext)
  if (context === undefined)
    throw new Error("QuestionContext was used outsied the QuestionProvider")
  return context
}

export { QuestionProvider, useQuestion }
