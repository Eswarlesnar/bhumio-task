import { useState , useContext } from "react";
import { dataContext } from "./context/dataContext";
import DataTable from "./components/DataTable/DataTable";
import Filter from "./components/Filter/Filter";
import "./App.css"

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [userFilter , setUserFilter] = useState("")
  const {setData} = useContext(dataContext)
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

    setArray(array);
    setData(array)
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
  console.log(array)

  return (
    <div className="app-container">
      <h1> CSV DATATABLE </h1>
      <form className="csv-import">
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
      <Filter userFilter = {userFilter}  setUserFilter = {setUserFilter}/>
      <br />
      <DataTable headerData = {headerKeys} data = {array} userFilter = {userFilter} />
    </div>
  );
}

export default App

