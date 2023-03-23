import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Number from './components/Number'
import postService from './services/persons'
import Notification from './components/Notification'

//modify the application so that the initial state of the data is fetched from the server using axios, complete the fetching with an effecthook
const App = () => {
  const [persons, setPersons] = useState([]) 
  //newName meant to control form input
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')  
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    postService
      .getAll()
      .then(initialFeed => {
        setPersons(initialFeed)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  
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
  
  const foundPeople = (cleaned.length < 0)
    ? persons
    : persons.filter(person => (person.name).toLowerCase().includes(cleaned))
    
  const deletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete ${name} from the phonebook?`)) {
      postService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNewName('')
        setNewNumber('')
    })
  }}
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    //checking duplicate names
    if (persons.filter(person => (person.name).toLowerCase() === newName.toLowerCase() || person.number === newNumber).length > 0) {
      window.alert(`${newName} is already in the phonebook.`)
      return;
    }
    postService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`'${newName}' added to phonebook.`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage('An error has occured.')
        console.log(error.response.data.error)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Number persons={persons} deletePerson={deletePerson} foundPeople={foundPeople}/>
    </div>
  )
}

export default App