// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

// const libraries = ['places'];
// const mapContainerStyle = {
//     height: "400px",
//     width: "800px"
//   };

// const LocationSearch = () => {
//   const [address, setAddress] = useState("");
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price_per_hour: "",
//     price_per_week: "",
//     price_per_month: "",
//     is_available: true,
//   });

//   const handleSelect = async (autocomplete) => {
//     const place = autocomplete.getPlace();
//     setAddress(place.formatted_address);
//     setCoordinates({
//       lat: place.geometry.location.lat(),
//       lng: place.geometry.location.lng()
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const productData = {
//       ...product,
//       location_lat: coordinates.lat,
//       location_long: coordinates.lng,
//       address: address,
//     };
//     console.log("Submitting:", productData);
//     // Here you would replace the console.log with an actual API call
//     // For example: await submitProduct(productData);
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="YOUR_API_KEY_HERE"
//       libraries={libraries}
//     >
//       <form onSubmit={handleSubmit}>
//         <Autocomplete onSelect={handleSelect}>
//           <TextField
//             id="autocomplete"
//             placeholder="Enter address"
//             type="text"
//             onChange={handleChange} // This might not be necessary for the autocomplete TextField itself but is included for consistency
//           />
//         </Autocomplete>
//         <TextField
//           name="name"
//           placeholder="Product Name"
//           value={product.name}
//           onChange={handleChange}
//           type="text"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={product.description}
//           onChange={handleChange}
//         />
//         <TextField
//           name="price_per_hour"
//           placeholder="Price per Hour"
//           value={product.price_per_hour}
//           onChange={handleChange}
//           type="text"
//         />
//         <TextField
//           name="price_per_week"
//           placeholder="Price per Week"
//           value={product.price_per_week}
//           onChange={handleChange}
//           type="text"
//         />
//         <TextField
//           name="price_per_month"
//           placeholder="Price per Month"
//           value={product.price_per_month}
//           onChange={handleChange}
//           type="text"
//         />
//         <label>
//           Is Available:
//           <TextField
//             name="is_available"
//             type="checkbox"
//             checked={product.is_available}
//             onChange={() => setProduct(prevState => ({ ...prevState, is_available: !prevState.is_available }))}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       {/* Display the selected address and coordinates */}
//       <div>
//         Address: {address}
//         <br />
//         Coordinates: {coordinates.lat}, {coordinates.lng}
//       </div>

//        {/* Google Map */}
//        {coordinates.lat && coordinates.lng && (
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           zoom={15}
//           center={{ lat: coordinates.lat, lng: coordinates.lng }}
//         >
//           <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
//         </GoogleMap>
//       )}
//     </LoadScript>
//   );
// };

// export default LocationSearch;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {TextField, Grid, Paper,Button, CircularProgress  }from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';
import L from 'leaflet';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify'
import { multipart_jwt_config } from './PaymentForm';
import houseIcon from '../assets/house_619153.png';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ loading, setLoading] = useState(false)
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price_per_hour: "",
    price_per_week: "",
    price_per_month: "",
    is_available: true,
    images: []
  });

  const customIcon = new L.Icon({
    iconUrl: houseIcon, 
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });



  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch search results
  useEffect(() => {
    if (debouncedTerm) {
      const fetchAddresses = async () => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${debouncedTerm}`);
        const data = await response.json();
        setSearchResults(data);
      };

      fetchAddresses();
    } else {
      setSearchResults([]);
    }
  }, [debouncedTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setSearchTerm(address.display_name);
    setSearchResults([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct(prevState => ({
      ...prevState,
      images: e.target.files // Update the images field with the selected files
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price_per_hour', product.price_per_hour);
    formData.append('price_per_week', product.price_per_week);
    formData.append('price_per_month', product.price_per_month);
    formData.append('is_available', product.is_available);
    formData.append('location_lat', selectedAddress.lat);
    formData.append('location_long', selectedAddress.lon);
    formData.append('address', selectedAddress.display_name);

    Array.from(product.images).forEach((image, index) => {
        formData.append(`images`, image);
      });
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/`, formData, multipart_jwt_config);
        console.log("Response:", response.data);
        toast.success(response?.data?.message)
        setLoading(false)
        // Handle success response, maybe clear form or show a success message
    } catch (e) {
        toast.error(e.response ? e.response.data.detail : e?.message)
        console.error("Error submitting product:", e);
        setLoading(false)
        // Handle error, maybe show an error message to the user
    }
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/?address=${encodeURIComponent(query)}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts("");
  }, []);

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm !== "") {
        setDebouncedTerm(searchTerm);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch products based on debounced search term
  useEffect(() => {
    if (debouncedTerm) {
      fetchProducts(selectedAddress?.display_name);
    }
  }, [debouncedTerm, selectedAddress?.display_name]);
  


  return (
    <Layout>
        <form onSubmit={handleSubmit}>
        <TextField
            sx={{
                marginBottom: 1
            }}
            fullWidth
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Where is your property located"
        />
        
        {searchResults.length > 0 && (
            <Paper sx={{
                padding: 1,
                margin: 1
            }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
            {searchResults.map((result) => (
                <li key={result.place_id} onClick={() => handleSelectAddress(result)} style={{ cursor: "pointer" }}>
                    {result.display_name}
                </li>
            ))}
            </ul>
            </Paper>
        )}
        

        <Grid container spacing={1}>
            <Grid item md={4}>
                <TextField
                    fullWidth
                    type="file"
                    inputProps={{ multiple: true }}
                    onChange={handleImageChange}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    fullWidth
                    size="small"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    type="text"
                />
            </Grid> 

            <Grid item spacing={4}>
                <TextField
                    fullWidth
                    size="small"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item spacing={2}>
                <TextField
                    fullWidth
                    size="small"
                    name="price_per_hour"
                    placeholder="Price Per Hour"
                    value={product.price_per_hour}
                    onChange={handleChange}
                    type="text"
                />
            </Grid>
            <Grid item spacing={2}>
                <TextField
                    fullWidth
                    size="small"
                    name="price_per_week"
                    placeholder="Price Per Week"
                    value={product.price_per_week}
                    onChange={handleChange}
                    type="text"
                />
            </Grid>
            <Grid item spacing={2}>
                <TextField
                    fullWidth
                    size="small"
                    name="price_per_month"
                    placeholder="Price Per Month"
                    value={product.price_per_month}
                    onChange={handleChange}
                    type="text"
                />
            </Grid>
        </Grid>
            
        {/* <Button type="submit">Submit</Button> */}
        <Button 
          fullWidth
          variant="contained" 
          color="success" 
          type="submit" 
          style={{ marginTop: '20px' }}>
          {loading ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
        </form>
      
      {selectedAddress && (
        <>
          <div>
            Address: {selectedAddress.display_name}
            <br />
            Coordinates: {selectedAddress.lat}, {selectedAddress.lon}
          </div>
          <MapContainer center={[selectedAddress.lat, selectedAddress.lon]} zoom={13} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[selectedAddress.lat, selectedAddress.lon]} />
            <ChangeView center={[selectedAddress.lat, selectedAddress.lon]} zoom={13} />
            {products?.map((product) => (
              <Marker
                key={product?.id}
                position={[product?.location_lat, product?.location_long]}
                icon={customIcon}
              >
                <Tooltip permanent>
                    {product.name} - ${product?.price}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </>
      )}


      <h3>Search Products</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{`${product.owner.first_name} ${product.owner.last_name}`}</TableCell>
                <TableCell align="right">{`${product.location_lat}, ${product.location_long}`}</TableCell>
                <TableCell align="right">{product?.address}</TableCell>
                <TableCell align="right">{product?.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default LocationSearch;