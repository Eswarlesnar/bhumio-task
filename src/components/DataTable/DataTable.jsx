
import { DataGrid } from '@mui/x-data-grid';
import { filterData } from '../../utils';

function DataTable({headerData , data , userFilter}) {
  const filteredData = filterData(data , userFilter)  
  const columns = headerData.map(item => {
    return {field : item , headerName : item }
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
      
      />
       }
     </div>
  );
}

export default DataTable;


