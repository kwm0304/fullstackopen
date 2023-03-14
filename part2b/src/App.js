import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: 1112223333 },
    { name: 'Kenan McKenzie', id: 2, number: 5552223333 },
    { name: 'Walter White', id: 3, number: 6662223333 },
    { name: 'Jesse Pinkman', id: 4, number: 7772223333 },
    { name: 'Mike Ehrmantraut', id: 5, number: 9112223333 }
  ]) 
  //newName meant to control form input
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')  

  const handleAddName = (event) => {
    setNewName(event.target.value)
    
  }
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }
 
  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }
  
  const cleaned = searchName.toLowerCase()
  
  const foundPeople = cleaned.length < 0
    ? persons
    : persons.filter(person => (person.name).toLowerCase().includes(searchName))
    
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }
    //checking duplicate names
    if (persons.filter(person => (person.name).toLowerCase() === newName.toLowerCase() || person.number === newNumber).length > 0) {
      window.alert(`${newName} is already in the phonebook.`)
      return;
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      searchName={searchName}
      handleSearch={handleSearch}
      />
      <Form 
      addPerson={addPerson}
      newName={newName}
      handleAddName={handleAddName}
      newNumber={newNumber}
      handleAddNumber={handleAddNumber}
      />
      <Number foundPeople={foundPeople}/>
    </div>
  )
}

export default App