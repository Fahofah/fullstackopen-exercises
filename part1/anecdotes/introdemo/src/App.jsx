import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({ text }) => (
  <p>{text}</p>
)

const MostVoted = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes)
  if (maxVotes === 0) {
    return <p>No votes yet</p>
  }
  const indexOfMostVoted = votes.indexOf(maxVotes)
  return <p>{anecdotes[indexOfMostVoted]}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const initialVotes = Array(anecdotes.length).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const getNextAnecdote = () => {
    const generateRandomIndex = () => Math.floor(Math.random() * anecdotes.length)
    let randomIndex = generateRandomIndex()
    while (randomIndex === selected) {
       // Setting state to the same value stops re-rendering, so generatint a new random index until new 
      console.log("Random index is the same as selected, generating a new one.")
      randomIndex = generateRandomIndex()
    }
    setSelected(randomIndex)
  }
  
  const registerVote = () => {
    const newVotes = [ ...votes ]
    newVotes[selected] += 1
    console.log("Votes updated", newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} />
      <Button onClick={getNextAnecdote} text="next anecdote" />
      <Button onClick={registerVote} text="vote" />
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App