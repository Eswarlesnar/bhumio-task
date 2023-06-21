/* eslint-disable react/prop-types */

import { DataGrid } from '@mui/x-data-grid';
import { filterData } from '../../utils';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector , useDispatch } from 'react-redux';
import { deleteRows } from '../../redux/dataSlice';



const deleteModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid lightgrey',
  boxShadow: 24,
  p: 4,
  textAlign : "center"
};

function DataTable({headerData  , userFilter}) {
  const [selectedRows , setSelectedRows] = useState([])
  const [modalOpen , setModalOpen]  = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const data = useSelector(state => state.data.data)
  const filteredData = filterData(data , userFilter)
  const dispatch = useDispatch()
  
  
  const columns = headerData.map(item => {
    if(["Part #" , "Alt.Part#"].includes(item)){
      return {field : item , headerName : item  , headerClassName : "app-datatable-header" , width : 150}   /// adding width to these two fields to identify the row ids
    }
    return {field : item , headerName : item  , headerClassName : "app-datatable-header"}
  })
  
 
  const rows = filteredData

  const handleRowSelectionChange = (selectionModel) => {
    setSelectedRows(selectionModel)
  
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleRowDeletion = () => {
    dispatch(deleteRows(selectedRows))
    setSnackbarOpen(true)
    setModalOpen(false)
  }
  return (
     <div style = {{ width : "92%" , margin : "auto" ,height  : 550}}>
       {
        rows.length > 0 && <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10 , 20 , 25]}
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: 'lightgrey',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .app-datatable-header': {
            fontSize: "16px",
            fontWeight : "900"
          },
        }}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelectionChange}
        
      />
       }
       {
        selectedRows.length > 0 && <Button 
         onClick = {handleModalOpen} 
         variant = "outlined" 
         color = "warning"
         sx = {{marginTop :"15px"}}
         >
         Delete</Button>
       }
       <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Typography id="modal-modal-title" variant="p" >
            Are you sure you want to delete the selected rows
          </Typography>
          <Box sx = {{display : "flex" , gap :"15px", justifyContent : "center" , marginTop : "20px"}}>
            <Button onClick = {handleModalClose} variant = "outlined" > Cancel</Button>
            <Button onClick = {handleRowDeletion} variant = "outlined" color = "secondary">Ok</Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Deletion Successful
        </MuiAlert>
      </Snackbar>

     </div>
  );
}

export default DataTable;


