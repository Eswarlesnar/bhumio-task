/* eslint-disable react/prop-types */
import { useState } from "react"
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import "./filter.css"
import UpdateInventory from "../UpdateInventory /UpdateInventory";

const widthAndHeightInput = {
    width : "200px",
    height : "33px"
}

const widthAndHeightButton = { 
    width : "50px",
    height : "33px"
}

const Filter = ({userFilter ,setUserFilter}) => {
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
        <label htmlFor="filterInput">Filter : </label>
        <OutlinedInput 
        sx = {widthAndHeightInput}
           id ="filterInput" 
           type ="text" 
           placeholder="search" 
           value = {userInput} 
           onChange={e => setUserInput(e.target.value)}/>
        <Button 
           sx = {widthAndHeightButton}
           onClick = {handleFilterClick} 
           variant = "outlined"
        >Filter</Button>
        <Button 
           sx = {widthAndHeightButton}
           onClick = {handleFilterReset} 
           variant = "outlined"
           > Reset</Button>
        <UpdateInventory userFilter ={userFilter}/>
    </div>
}


export default Filter