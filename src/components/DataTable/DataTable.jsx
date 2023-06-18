/* eslint-disable react/prop-types */

import { DataGrid } from '@mui/x-data-grid';
import { filterData } from '../../utils';

function DataTable({headerData , data , userFilter}) {
  const filteredData = filterData(data , userFilter)  

  const columns = headerData.map(item => {
    if(["Part #" , "Alt.Part#"].includes(item)){
      return {field : item , headerName : item  , headerClassName : "app-datatable-header" , width : 150}   /// adding width to these two fields to identify the row ids
    }
    return {field : item , headerName : item  , headerClassName : "app-datatable-header"}
  })
  
  console.log(columns)
  const rows = filteredData
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
            backgroundColor: 'lightgrey',
            fontWeight : "bold"
          },
        }}
      />
       }
     </div>
  );
}

export default DataTable;


