import React from 'react'

const Person = (person) => {   
    return (<li>{person.name} {person.number}</li>)} 

const Number = (props) => {
    const {
        foundPeople = [] 
    } = props
    
    return (    
        <div>
        <h2>Numbers</h2>
      <ul>
        {foundPeople.map(person => 
          <Person key={person.id} name={person.name} number={person.number}/>
          )}
      </ul>
      </div> 
    )
}

export default Number

