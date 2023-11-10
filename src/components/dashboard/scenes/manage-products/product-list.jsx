import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); 

  // Assuming fetchData is a function that fetches data from your database
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getProducts'); // Replace with your API endpoint
      const jsonData = response.data.map((item, index) => ({ ...item, id: index })); // Add unique ids to each item
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteSingleProduct = async (id) => {
    if(window.confirm('Are you sure you want to delete product?')) {
      await axios.delete(`http://localhost:5000/deleteSingleProduct/${id}`).then(res => {
        if(res.data == '200') {
          alert('Product successfully deleted');
          window.location.reload();
        } else if(res.data == '400') {
          alert('Internal error. Please try again');
        }
      }).catch(e => {
        console.error()
      });
    }
  };



  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "productName",
      headerName: "Product Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "categoryName",
      headerName: "Category",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <div style={{width: '100%', justifyContent: 'center', padding: '5px', display: 'flex', flexDirection: 'row'}}>
            <Link to={'/dashboard/update-product/' + _id} style={{width: '30%', marginRight: '5px'}}>
              <Box width="100%" m="0 auto" p="5px" display="flex" justifyContent="center" backgroundColor='green' borderRadius="4px">
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  <EditIcon/>
                </Typography>
              </Box>
            </Link>

            <Link onClick={() => deleteSingleProduct(_id)} style={{ width: '30%', marginLeft: '5px' }}>
              <Box width="100%" m="0 auto" p="5px" display="flex" justifyContent="center" backgroundColor='crimson' borderRadius="4px">
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  <DeleteIcon/>
                </Typography>
              </Box>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default ProductList;
