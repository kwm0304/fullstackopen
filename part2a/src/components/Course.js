const Course = ({ courses }) => {
    console.log(courses)
   
     return(
         <div>
         <Header name={courses.name}/>
         <Content parts={courses.parts} />
         <Total courses={courses} />
         </div>
     )
 }


const Part = ({ name, exercises, id }) => {
    console.log(name)
    return(
        <div>{name} has {exercises} exercises </div>
    )
}

const Content = ({parts}) => {
    console.log({parts})
    return(
        <>
        <div>
            {parts.map(part => 
                <Part key={part.id} exercises={part.exercises} name={part.name}/>
                )}
        </div>
        <div></div>
        </>
    )
}

const Header = ({ name }) => {
    
    return(
        <h1>{name}</h1>
    )    
}

const Total = ({ courses }) => {
    //renders total number of exercises
    console.log({courses})
    const sum = courses.parts.reduce((accumulator, object) => {
      return accumulator + object.exercises;
    }, 0)
    
    console.log(sum)
    return (
    
      <h2>The total number of exercies is {sum} </h2>
    )
}


export default Course;