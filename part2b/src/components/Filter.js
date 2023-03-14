const Filter = (props) => {
    const {
        handleSearch,
        searchName
    } = props
      
    return(
        <>
        <div>Filter for name: 
        <input 
          value={searchName} 
          onChange={handleSearch} 
          ></input>
        </div> 
        </>
    )
}

export default Filter;