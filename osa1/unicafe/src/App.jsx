import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given yet</p>
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={((good * 1) + (bad * (-1)))/ all}/>
          <StatisticLine text="positive" value={`${(good / all) * 100} %`}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => {setGood(good + 1)}}/>
      <Button text="neutral" onClick={() => {setNeutral(neutral + 1)}}/>
      <Button text="bad" onClick={() => {setBad(bad + 1)}}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App