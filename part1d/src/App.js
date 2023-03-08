//1.12-1.14
import React, { useState } from 'react' 

const DisplayVotes = (props) => {
    
  return(
    <>
    <div>{props.array[props.index]}</div>
    <button onClick={props.handleClick}>Votes</button>
    </>
  )
}

const MostPopular = (props) => {
  return (
    <>
    <h1>Most Popular</h1>
    <p>{props.text}</p>
    </>
  )
}

const App = () => {
  //key state and array
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const randomAnecdote = e => {
    const len = anecdotes.length;
    setSelected(Math.floor(Math.random()*len))
  };
  //value state and array
  const [points, setPoints] = useState(new Uint8Array(anecdotes).fill(0, 0, 8))
  const votes = [...points];
  const x = anecdotes.indexOf(anecdotes[selected])
  const updatedVotes = () => {
    votes[selected] += 1
    setPoints(votes)
  }
  //finding high value's key
  const highestValueIndex = votes.indexOf(Math.max(...votes))
  const mostVotedAnecdote = anecdotes[highestValueIndex]
  
  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>{anecdotes[selected]}</div>
    <br/>
    <button onClick={randomAnecdote}>Random Anecdote</button>
    <br/>
    <DisplayVotes handleClick={() => updatedVotes()} array={votes} index={x}/>
    <br/>
    <MostPopular text={mostVotedAnecdote}/>
    </>
  )
  
}

export default App;
