import Part from "./Part"
const Content = ({ parts }) => {
    console.log(parts)
    return(
        <div>
            {parts.map(part => 
                <Part key={part.id} exercises={part.exercises} name={part.name}/>
                )}
        </div>
    )
}
export default Content;