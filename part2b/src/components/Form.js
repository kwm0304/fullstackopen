const Form = (props) => {
    const {
        addPerson,
        newName,
        handleAddName,
        newNumber,
        handleAddNumber
    } = props
    
    return(
        <div>
        <h2>Add New Entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          placeholder="First Last"
          onChange={handleAddName}/>
        </div>
        <div>
          number: <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder='123-456-7890'
          value={newNumber}         
          onChange={handleAddNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
}

export default Form;