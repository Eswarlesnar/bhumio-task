
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { filterData } from '../../utils';

function DataTable({headerData , data , userFilter}) {
  const filteredData = filterData(data , userFilter)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           {
            headerData?.map(item => {
                return <TableCell key = {item}>{item}</TableCell>
            })
           }
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              {
                Object.values(item).map((val , i) => {
                    return <TableCell key ={val? val +i : i}>{val}</TableCell>
                })
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;


