const Header = (props) => {

  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {

  return (
      <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  props.exercises.forEach(exercise => { total += exercise });

  return (
      <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const names = parts.map(part => part.name);
  const exercises = parts.map(part => part.exercises);  

  return (
    <div>
      <Header course={course}/>
      <Content parts={names} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App