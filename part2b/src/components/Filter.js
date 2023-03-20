const Filter = (props) => {
    const {
        handleSearch,
        searchName
    } = props
      
    return(
        <>
        <form>
        <div>Filter for name: 
        <input 
          value={searchName} 
          onChange={handleSearch} 
          ></input>
        </div> 
        </form>
        </>
    )
}

export default Filter;