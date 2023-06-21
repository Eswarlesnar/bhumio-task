/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import { useState    , useEffect} from 'react';
import { filterData } from '../../utils';
import "./updateInventory.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateRows } from '../../redux/dataSlice';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
    width: {
      xs: 300,
      sm: 450,
      md: 700,
      lg: 900,
    },
  };


const UpdateInventory = ({userFilter}) => {
    const [open , setOpen] = useState(false)
    const [rows , setRows] = useState([])
    const data = useSelector(state => state.data.data)
    const filteredData = filterData(data , userFilter)
    const dispatch = useDispatch()

    const [updatedRowIds, setUpdatedRowIds] = useState([])  

    const columns = [
      { field: 'Part #', headerName: 'Part #', width: 200, editable: false ,  headerClassName : "app-datatable-header" },
      { field: 'Alt.Part#', headerName: 'Alt.part#', width: 200, editable: false , headerClassName : "app-datatable-header" },
      { field: 'LOCATION A STOCK', headerName: 'LocA _stock', width: 250, editable: true ,  headerClassName : "app-datatable-header"},
      { field: 'LOC B STOCK ', headerName: 'LocB _stock', width: 250, editable: true ,  headerClassName : "app-datatable-header"}
    ];

    

    useEffect(() => {
       if(open === true) {
         setRows(filteredData)
       }
    },[open])

    const handleUpdatedInventory = () => {
      dispatch(updateRows({rows , updatedRowIds}))
      setOpen(false)
    }
   
    const handleCellEditCommit = 
      (params , event) => {
        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
          event.defaultMuiPrevented = true;
        }
        const { id, field , value} = params
        
        const updatedValue = event.target?.value ? event.target.value : value

        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            if (!updatedRowIds.includes(id)) {
              setUpdatedRowIds((prev) => {
                return [...prev, id]     ///saving ids only to update the rows that are edited /efficiency
              })
            }
            return { ...row, [field]: updatedValue }
          }
          return row
        }  
        );
        setRows(updatedRows);
      }


    const handleOpen = () => setOpen(true);

    const handleClose = () => {
      handleUpdatedInventory()
      setOpen(false);
    }


    return <div>
        <Button variant = "contained" onClick = {handleOpen}>Update Inventory</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className ="modal" sx={modalStyle}>
          <h3>Update Inventory</h3>
          {
            open && rows.length > 0  && <div className = "update-datagrid" >
            <DataGrid
             
              rows={rows}
              columns={columns}
              onCellEditStop ={handleCellEditCommit}
              editMode="cell" // Set to "row" for row-level editing, "cell" for cell-level editing
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}

              pageSizeOptions={[10 , 20 , 25]}
              
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