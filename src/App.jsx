import { useState , useContext } from "react";
import Button from '@mui/material/Button';
import {v4 as uuid} from "uuid"
import { ExportToCsv } from 'export-to-csv'; 
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
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");  // gettting the first row for headers
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

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: headerKeys.map((c) => c),
  };
  
  const csvExporter = new ExportToCsv(csvOptions);
  
  const handleExportCSV = () => { 
     if(data.length < 1) {
      return
     }
     const dataWithoutId = data.map(({id , ...rest}) => ({...rest}))  ///removing the id added for unique identification
     csvExporter.generateCsv(dataWithoutId)
  }

  
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
        <Button variant = "contained" onClick = {handleExportCSV}>Export CSV</Button>
      </div>
      
      <Filter userFilter = {userFilter}  setUserFilter = {setUserFilter}/>
      
      <DataTable headerData = {headerKeys} data = {data} userFilter = {userFilter} />
    </div>
  );
}

export default App

