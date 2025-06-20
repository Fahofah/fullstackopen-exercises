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

  const names = props.parts.map(part => part.name);
  const exercises = props.parts.map(part => part.exercises);  


  return (
    <div>
      <Part part={names[0]} exercise={exercises[0]} />
      <Part part={names[1]} exercise={exercises[1]} />
      <Part part={names[2]} exercise={exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  props.parts.forEach(part => { total += part.exercises });

  return (
      <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App