const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {

  return (
    <>
      <p>{props.part} {props.ex_count}</p>
    </>
  )
}

const Total = (props) => {
  let total = 0;
  props.exercises.forEach(exercise => { total += exercise });

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const exercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course}/>
      <Content part={part1} ex_count={exercises1}/>
      <Content part={part2} ex_count={exercises2}/>
      <Content part={part3} ex_count={exercises3}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App