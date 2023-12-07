import { useEffect } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import Start from "./Start"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finished from "./Finished"
import Timer from "./Timer"
import Footer from "./Footer"
import { useQuestion } from "./contexts/QuestionContext"

export default function App() {
  const { status } = useQuestion()

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <Finished />}
      </Main>
    </div>
  )
}
