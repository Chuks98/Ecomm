import React, {useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import axios from'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddProduct = () => {
  const [img, setImg] = useState(false);
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    setImg(true);
    console.log(e.target.files[0]);
  };

  const handleFormSubmit = async (values) => {
    await axios.post('http://localhost:5000/newCategory', {categoryName: values.categoryName, imageName: imageName}).then(resp => {
      console.log(resp.data);
      if (resp.data == '200') {
        // Now To Save The Category Image
        var formData = new FormData();
        formData.append('img', image);
        axios.post('http://localhost:5000/categoryImage', formData).then(resp => {
          setImage('');
        }).catch(e => {
          console.error('Image not successfully saved.');
        });
        alert('Category created successfully');

      } else if(resp.data == '301') {
        alert('Category already exists');
      } else if(resp.data == '401') {
        alert('Problem creating category. Please try again');
      }
    }).catch(e => {
      console.error("Error", e);
    });
  };

  return (
    <Box m="20px">
      <Header title="CREATE NEW CATEGORY" subtitle="Create a New Category" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form encType='multipart/form-data' onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },}}>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 3' }}>
                <TextField
                  id="image"
                  name="image"
                  type="file"
                  error={!!touched.image && !!errors.image}
                  helperText={touched.image && errors.image}
                  onChange={handleImageChange}
                />
                <Box mt={2}>
                  {img && <img style={{width: '200px', height: '200px'}} src={imageUrl} alt="Uploaded image" />}
                  {!img && <p>Upload Category Image (No image uploaded yet)</p>}
                </Box>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="categoryName"
                error={!!touched.categoryName && !!errors.categoryName}
                helperText={touched.categoryName && errors.categoryName}
                sx={{ gridColumn: "span 4" }}
              />

              <Box display="flex" justifyContent="start" mt={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Create New Category
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  categoryName: yup.string().required("required"),
  // email("invalid email").
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
});
const initialValues = {
  categoryName: "",
  image: "",
};

export default AddProduct;
