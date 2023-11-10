import { FormControl, InputLabel, MenuItem, Select, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import {useState, useEffect} from 'react';
import axios from'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
      await axios.get('http://localhost:5000/getCategories').then(res => {
        setCategories(res.data);
      }).catch(e => {
        console.error('No category found');
      });
  };


  const handleFormSubmit = async (values) => {
    var records = {
      categoryName: values.categoryName,
      productName: values.productName,
      price: values.price,
      imageName: imageName,
      quantity: values.quantity,
      description: values.description
    }
  
    await axios.post('http://localhost:5000/newProduct', records).then(resp => {
      console.log(resp.data);
      if (resp.data == '200') {
        // Now To Save The Product Image
        var formData = new FormData();
        formData.append('img', image);
        axios.post('http://localhost:5000/productImage', formData).then(resp => {
          setImage('');
        }).catch(e => {
          console.error('Image not successfully saved.');
        });
        alert('Product successfully saved.'); // Alert when image is saved successfully
        window.location.reload();

      } else if(resp.data === '401') {
        alert('Problem creating product. Please try again.');
      } else if(resp.data === '301') {
        alert('Category not found. Please try again.');
      }
    });
  };
  
  

  return (
    <Box m="20px">
      <Header title="ADD NEW PRODUCT" subtitle="Add a New Product" />

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
          <form onSubmit={handleSubmit}>
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

              <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 2' }}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="categoryName"
                  error={!!touched.categoryName && !!errors.categoryName}
                  helperText={touched.categoryName && errors.categoryName}
                  placeholder="Category"
                >
                  <MenuItem value="" disabled><em>Please Select a Category</em></MenuItem>
                  {categories.map(category => ( 
                    <MenuItem value={category.categoryName}>{category.categoryName}</MenuItem>
                  ))}
                  {/* Add more MenuItems as needed */}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                multiline // This enables multiline input
                minRows={3} // You can adjust the number of rows as needed
                maxRows={10} // Maximum number of rows before scrolling
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                placeholder="Enter a description..."
                sx={{ gridColumn: 'span 4' }} // Span 4 columns in your grid layout
              />
            </Box>


            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Product
              </Button>
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
  productName: yup.string().required("required"),
  price: yup.number().required("required"),
  quantity: yup.number().required("required"),
  description: yup.string().required("required"),
  // email("invalid email").
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
});
const initialValues = {
  categoryName: "",
  productName: "",
  price: "",
  image:"",
  quantity: "",
  description: "",
};

export default AddProduct;
