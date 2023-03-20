import React from 'react'


const Person = (props, { destroy }) => {   
  console.log('person', props)
    return (<li key={props.id}>{props.name} {props.number} <button onClick={props.destroy}>Delete</button></li>)} 

const Number = (props) => {
  console.log(props)
    const {
        foundPeople=[],
        deletePerson
    } = props
    
    console.log('Number props', props)
    return (    
        <div>
        <h2>Numbers</h2>
      <ul>
        {foundPeople.map(person => (
          <Person key={person.id} name={person.name} number={person.number} destroy={deletePerson(person.name, person.id)} />
        ))}
      </ul>
      </div> 
    )
}

export default Number

