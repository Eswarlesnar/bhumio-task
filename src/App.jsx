import { useState , useContext } from "react";
import Button from '@mui/material/Button';
import {v4 as uuid} from "uuid"
import { dataContext } from "./context/dataContext";
import DataTable from "./components/DataTable/DataTable";
import Filter from "./components/Filter/Filter";
import "./App.css"

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [userFilter , setUserFilter] = useState("")
  const {setData , data} = useContext(dataContext)
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    const arrayWithUniqueId = array.map(item => {
       return {...item , "id" : uuid()}
    })

    setArray(array);
    setData(arrayWithUniqueId)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  
  
const widthAndHeightButton = { 
  width : "130px",
  height : "33px"
}

  return (
    <div className="app-container">
      <h1> CSV DATATABLE </h1>
      <div className="csv-container">
        <form className="csv-import">
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />

          <Button variant ="outlined"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
            sx = {widthAndHeightButton}
          >
            IMPORT CSV
          </Button>
        </form>
      </div>
      
      <Filter userFilter = {userFilter}  setUserFilter = {setUserFilter}/>
      <br />
      <DataTable headerData = {headerKeys} data = {data} userFilter = {userFilter} />
    </div>
  );
}

export default App

