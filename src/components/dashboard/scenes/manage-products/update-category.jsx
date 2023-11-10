import { FormControl, InputLabel, MenuItem, Select, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import {useState, useEffect} from 'react';
import axios from'axios';
import { useParams } from 'react-router-dom';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { faGalacticSenate } from "@fortawesome/free-brands-svg-icons";

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [initialValues, setInitialValues] = useState({
    categoryId: "",
    categoryName: "",
    categoryImage: "",
  });
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {id} = useParams();

  const handleImageChange = (e) => {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      setShowImage(false);
      console.log(e.target.files[0]);
  };

  useEffect(() => {
      getUpdateSingleCategory();
  }, []);

  const getUpdateSingleCategory = async () => {
    await axios.get(`http://localhost:5000/getUpdateSingleCategory/${id}`).then(res => {
       const categoryData = res.data; // Assuming the data is an array with one element

      // Set initial values based on the data from the database
      setInitialValues({
        categoryId: categoryData._id,
        categoryName: categoryData.categoryName,
        categoryImage: categoryData.categoryImage,
      });
    }).catch(e => {
      console.error('No category found', e);
    });
  };

  const handleFormSubmit = async (values) => {
    var records = {
        categoryId: initialValues.categoryId,
        categoryName: values.categoryName,
        categoryImage: imageName,
    };
  
    await axios.patch('http://localhost:5000/updateCategory', records).then(resp => {
      console.log(resp.data);

      if (resp.data == '200') {
        // Now To Update The Product Image
        var formData = new FormData();
        formData.append('img', image);
        axios.post('http://localhost:5000/categoryImage', formData).then(resp => {
          setImage('');
        }).catch(e => {
          console.error('Image not updated successfully.');
        });
        alert('Category successfully updated.'); // Alert when image is saved successfully
        window.location.reload();

      } else {
        alert('Problem updating category. Please try again.');
      }
    });
  };
  
  

  return (
    <Box m="20px">
      <Header title="UPDATE CATEGORY" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
                  {!showImage && <img style={{width: '200px', height: '200px'}} src={imageUrl} alt="Uploaded image" />}
                  {showImage && <img style={{width: '200px', height: '200px'}} src={process.env.PUBLIC_URL + '/img/category-images/' + initialValues.categoryImage} alt="No uploaded image" />}
              </Box>
            </FormControl>

              <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 2' }}>
                <TextField
                  id="category"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="categoryName"
                  label={initialValues.categoryName}
                  value={values.categoryName}
                  error={!!touched.categoryName && !!errors.categoryName}
                  helperText={touched.categoryName && errors.categoryName}
                  required
                />
              </FormControl>
            </Box>


            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateCategory;
