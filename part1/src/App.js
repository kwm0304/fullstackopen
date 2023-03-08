//Exercises through 1.5
import React, { useState } from 'react';

const Header = ({ course }) => {
  //renders name of course
  
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({ course }) => {
  console.log({ course })
  return (
    <>
    {course.parts.map((part) => {
    return (<h2 key={part}>{part.name} has {part.exercises} exercises</h2>
    )
    })}
    </>)
}

const Content = ({ course }) => {
  
//renders the parts and their number of exercises parts
  return (
    <>
    <Part course={course}/>
    </>
  )
}

const Total = ({ course }) => {
//renders total number of exercises
const sum = course.parts.reduce((accumulator, object) => {
  return accumulator + object.exercises;
}, 0)

console.log(sum)
return (

  <h2>The total number of exercies is {sum} </h2>
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
    <>
    
    <Header course={course} />
    <Content course={course}/>
    <Total course={course}/>
    </>
  )
}

export default App
