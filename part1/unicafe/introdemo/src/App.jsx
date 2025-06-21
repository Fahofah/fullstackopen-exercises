import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) =>  <button onClick={onClick}> {text} </button>

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Stats = ({good, neutral, bad})  => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }
  else {
    return (
      <table>
        <tbody> 
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={total} />
          <StatisticsLine text="Average" value={average.toFixed(1)} />
          <StatisticsLine text="Positive" value={positive.toFixed(1)+ " %"} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedbackClick = (current, setter) => () => setter(current + 1)

  return (
    <div>
      <Header text= "How was your experience today?" />
      <Button onClick={handleFeedbackClick(good, setGood)} text="Good" /> 
      <Button onClick={handleFeedbackClick(neutral, setNeutral)} text="Neutral" /> 
      <Button onClick={handleFeedbackClick(bad, setBad)} text="Bad" /> 
      <Header text= "Statistics so far" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
