import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState , useCallback , useContext , useEffect} from 'react';
import { dataContext } from '../../context/dataContext';
import { filterData } from '../../utils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const UpdateInventory = ({userFilter}) => {
    const [open , setOpen] = useState(false)
    const [rows , setRows] = useState([])
    const {data , setData} = useContext(dataContext)
    const filteredData = filterData(data , userFilter)

    const columns = [
      { field: 'Part #', headerName: 'Part #', width: 200, editable: false },
      { field: 'Alt.Part#', headerName: 'Alt.part#', width: 200, editable: false },
      { field: 'LOCATION A STOCK', headerName: 'LocA _stock', width: 250, editable: true },
      { field: 'LOC B STOCK ', headerName: 'LocB _stock', width: 250, editable: true }
    ];

    
 
    useEffect(() => {
       if(open === true) {
         setRows(filteredData)
       }
    },[open])

    
    const handleUpdatedInventory = () => {
      // console.log("Entering the update funciton")
      const tempGlobalData = [...data]
      // console.log(rows)
      for(let i=0 ; i< rows.length ; i++){
        // console.log("Entergin the for loop")
        let id = rows[i].id
        let indexOfmatchId = tempGlobalData.findIndex(item => item.id === id)
        tempGlobalData[indexOfmatchId] = rows[i]
      }
      // console.log(tempGlobalData)
      setData(tempGlobalData)
      setOpen(false)
    }
   
    const handleCellEditCommit = 
      (params , event) => {
        const { id, field , value} = params
        
        const updatedValue = event.target?.value ? event.target.value : value
        console.log("Entering the Cell edit ")
        console.log(updatedValue)
        const updatedRows = rows.map((row) => {
          return  row.id === id ? { ...row, [field]: updatedValue } : row
        }  
        );
        console.log(updatedRows)
        setRows(updatedRows);
      }
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      handleUpdatedInventory()
      setOpen(false)
    }
    return <div>
        <Button variant = "contained" onClick = {handleOpen}>Update Inventory</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Update Inventory</h3>
          {
            open && rows  && <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onCellEditStop ={handleCellEditCommit}
              editMode="cell" // Set to "row" for row-level editing, "cell" for cell-level editing
            />
          </div>
          }
          <div className='update-inventory-footer'>
            <Button onClick = {handleClose}>Close</Button>
            <Button onClick = {handleUpdatedInventory}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
}

export default UpdateInventory