import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Header from "../../components/Header";

const CategoryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  // Assuming fetchData is a function that fetches data from your database
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCategories'); // Replace with your API endpoint
      const jsonData = response.data.map((item, index) => ({ ...item, id: index })); // Add unique ids to each item
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); 


  const deleteSingleCategory = async (id) => {
    if(window.confirm('All products in this category will be deleted.\n\nDo you want to proceed?')) {
        await axios.delete(`http://localhost:5000/deleteSingleCategory/${id}`).then(res => {
          if(res.data == '200') {
            alert('Category successfully deleted');
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
        field: "categoryName",
        headerName: "Category Name",
        cellClassName: "name-column--cell",
        flex: 0.5,
    },
    // {
    //     field: "categoryImage",
    //     headerName: "Category Image",
    //     headerAlign: "left",
    //     align: "left",
    // },
    {
        field: "numberOfProducts",
        headerName: "Number of Products",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.5,
        valueGetter: (params) => {
          // Calculate the number of products (length of the 'details' array) for each row
          return params.row.details ? params.row.details.length : 0;
        },
      },
    {
      field: "accessLevel",
      headerName: "Action",
      headerAlign: "center",
      flex: 0.5,
      renderCell: ({ row: { _id } }) => {
        return (
          <div style={{width: '100%', justifyContent: 'center', padding: '5px', display: 'flex', flexDirection: 'row'}}>
            <Link to={'/dashboard/update-category/' + _id} style={{width: '30%', marginRight: '5px'}}>
              <Box width="100%" m="0 auto" p="5px" display="flex" justifyContent="center" backgroundColor='green' borderRadius="4px">
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  <EditIcon/>
                </Typography>
              </Box>
            </Link>

            <Link onClick={() => deleteSingleCategory(_id)} style={{width: '30%', marginLeft: '5px'}}>
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

export default CategoryList;
