import { useState, useEffect } from "react"

import styles from "./App.module.css"

function App() {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  const getWrongAnswer = (f1: number, f2: number): number => {
    if (Math.random() < 0.5) {
      f1++
    } else {
      f1--
    }
    let answer = f1 * f2
    if (answer < 1) {
      return f1
    }
    return f1 * f2
  }

  const [playerAnswer, setPlayerAnswer] = useState("")
  const [factor1, setFactor1] = useState(getRandomInt(13))
  const [factor2, setFactor2] = useState(getRandomInt(13))
  const [correctAnswer, setCorrectAnswer] = useState(factor1 * factor2)
  const [wrongAnswer1, setWrongAnswer1] = useState(
    getWrongAnswer(factor1, factor2)
  )
  const [wrongAnswer2, setWrongAnswer2] = useState(
    getWrongAnswer(factor2, factor1)
  )
  const [randomAnswers, setRandomAnswers] = useState(
    [correctAnswer, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5)
  )

  const loadAnswers = () => {
    setPlayerAnswer("")
    const f1 = getRandomInt(13)
    const f2 = getRandomInt(13)
    const cAnswer = f1 * f2
    const wa1 = getWrongAnswer(f1, f2)
    const wa2 = getWrongAnswer(f2, f1)
    setFactor1(f1)
    setFactor2(f2)
    setCorrectAnswer(cAnswer)
    setWrongAnswer1(wa1)
    setWrongAnswer2(wa2)
    const answers = [cAnswer, wa1, wa2]
    setRandomAnswers([...answers].sort(() => Math.random() - 0.5))
  }

  const handleClick = (answer: number) => {
    if (answer === correctAnswer) {
      setPlayerAnswer("Correct")
    } else {
      setPlayerAnswer("Wrong")
    }
  }

  return (
    <div className={styles.container}>
      <h1>
        Math Shark <span className={styles.authorText}>by Zaijan Gamulo</span>
      </h1>
      <div className={styles.questionText}>
        {factor1} x {factor2} = ?
      </div>

      <div>
        {randomAnswers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleClick(answer)}
            className={styles.btn}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className={playerAnswer === "Correct" ? styles.green : styles.red}>
        {playerAnswer}
      </div>
      {playerAnswer === "Correct" && (
        <button onClick={loadAnswers} className={styles.btn}>
          Again ?
        </button>
      )}
    </div>
  )
}

export default App
