import { useState } from "react"
import "./filter.css"

const Filter = ({setUserFilter}) => {
    const [userInput , setUserInput] = useState("")
    const handleFilterClick = () => {
        if(userInput){
            setUserFilter(userInput)
            setUserInput("")
        }
    }
    const handleFilterReset = () => {
        setUserFilter("")
    }
    return <div className="filter-container">
        <label htmlFor="filterInput">User Input</label>
        <input id ="filterInput" type ="text" placeholder="search" value = {userInput} onChange={e => setUserInput(e.target.value)}/>
        <button onClick = {handleFilterClick}>Filter</button>
        <button onClick = {handleFilterReset}> Reset</button>
    </div>
}


export default Filter