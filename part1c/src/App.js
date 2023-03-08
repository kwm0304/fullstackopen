//exercises through 1.11
import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => (
<tr>
  <td>{props.text}</td>
  <td>{props.value}</td>
</tr>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <>
     
    <div>No feedback given</div>
    </>
    )
  } return (
  <table>
    <tbody>
    <tr>
      <th>Statistics</th>
    </tr>
    <StatisticsLine text='Good' value={props.good} />
    <StatisticsLine text='Neutral' value={props.neutral} />
    <StatisticsLine text='Bad' value={props.bad} />
    <StatisticsLine text='Total' value={props.total} />
    <StatisticsLine text='Average' value={props.average.toFixed(3)} />
    <StatisticsLine text='Positive Feedback' value={props.positive.toFixed(3)} />
    </tbody>
  </table>
)
}
const App = () => {
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [total, setTotal] = useState(0)


const handleGood = () => {
  setGood(good + 1)
  setTotal (total + 1)
}

const handleNeutral = () => {
setNeutral(neutral + 1);
setTotal (total + 1)

}

const handleBad = () => {
setBad(bad + 1)
setTotal (total + 1)
}

const average = ((good * 1) + (bad * -1) + (neutral * 0))/total;
const positive = good/total


return (
  
  <>
  <h1>Give Feedback</h1>
  <Button handleClick={() => handleGood()} text='good' />
  <Button handleClick={() => handleNeutral()} text='neutral' />
  <Button handleClick={() => handleBad()} text='bad' />
  <Statistics total={total} positive={positive} average={average} good={good} bad={bad} neutral={neutral}/>
  
  </>
)
}

export default App;
