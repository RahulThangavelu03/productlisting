"use client"
import { useState,useEffect } from "react";
import { Container, Grid, Typography, TextField, CircularProgress } from "@mui/material";
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function Home() {

  const [Data,setData] = useState([])
  const [search,setSearch]= useState("")

  const[ Products,setProducts] = useState([])
  const [ loading,setloading] = useState(true)
  const [selectedCategory,setSelectedCategory] = useState("")
  const [selectedRating,setSelectedRating] = useState("")

    const [priceMin, setPriceMin] = useState(0);       
  const [priceMax, setPriceMax] = useState(2000);   
  const [error, setError] = useState(null);

const [priceRange, setPriceRange] = useState([0, 2000]);

useEffect(()=>{


 fetch("https://dummyjson.com/products")
.then(res=> res.json())
.then(res=>{setData(res.products),setProducts(res.products)})
.then(res=> {setloading(false)})

.catch((err) => {
      console.error("Error fetching:", err);
      setError("Something went wrong while fetching products. Please try again later.");
      setloading(false);
    });

},[])


const categories=[]

Data.forEach((data)=>{


if(!(categories.includes(data.category))){

categories.push(data.category)


}



})


useEffect(()=>{


let filteredData = JSON.parse(JSON.stringify(Data))


 if(search){


if(!search){


   return  setProducts(filteredData)
  }



  filteredData =  filteredData.filter((data)=>  data.title.toLowerCase().includes(search ) ||  data.description.toLowerCase().includes(search.toLowerCase())) 

setProducts(filteredData)
 }


 if(priceRange[0]>0){


if (priceRange[0] !== 0 || priceRange[1] !== 2000) {
  filteredData = filteredData.filter(
    (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
  )
  
  

}
setProducts(filteredData)


 }



if(selectedCategory){


   filteredData = filteredData.filter(data=>data.category.includes(selectedCategory))

  setProducts(filteredData)


  
}



if(selectedRating){


 filteredData = filteredData.filter(data=>data.rating >= selectedRating)

setProducts(filteredData)

}


},[search,selectedCategory,selectedRating,priceRange])



  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </Container>
    );
  }



  if (error) {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h6" color="error" sx={{ mb: 2 }}>
        {error}
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Container>
  );
}



function HandleReset(){

  setProducts(Data)
  setSelectedCategory("")
  setSelectedRating("")
 setPriceMin(0);       
  setPriceMax(2000);    
  setPriceRange([0, 2000]);
    setSearch("")
  
}




 return (

  

<Container
  maxWidth={false}
  sx={{
    mt: 4,
    pl: { xs: 2, sm: 4, md: 8 }, 
    pr: { xs: 2, sm: 4 },
  }}
>
  {/* Heading */}
  <Typography
    variant="h4"
    sx={{
      fontWeight: "bold",
      mb: 3,
      textAlign: "left",
    }}
  >
    Product Listing
  </Typography>

  {/* Filters Section */}
  <Box
    sx={{
      width: { xs: "100%", sm: "95%", md: "90%", lg: "85%" },
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
      mb: 5,
      p: 2,
      borderRadius: 2,
      boxShadow: 1,
      bgcolor: "#f9f9f9",
      justifyContent: "flex-start",
    }}
  >
    <TextField
      label="Search Products"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      size="small"
      sx={{ flex: "1 1 180px", minWidth: "160px" }}
    />

    <FormControl sx={{ minWidth: 140 }} size="small">
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        label="Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>Rating</InputLabel>
      <Select
        value={selectedRating}
        label="Rating"
        onChange={(e) => setSelectedRating(e.target.value)}
      >
        <MenuItem value={1}>1 & above</MenuItem>
        <MenuItem value={2}>2 & above</MenuItem>
        <MenuItem value={3}>3 & above</MenuItem>
        <MenuItem value={4}>4 & above</MenuItem>
      </Select>
    </FormControl>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        Price: ${priceRange[0]} - ${priceRange[1]}
      </Typography>
      <Slider
        value={priceRange}
        onChange={(e, newVal) => setPriceRange(newVal)}
        min={0}
        max={2000}
        size="small"
        valueLabelDisplay="auto"
        sx={{ width: 120 }}
      />
    </Box>

    <Button
      variant="contained"
      color="secondary"
      onClick={HandleReset}
      sx={{
        textTransform: "none",
        height: "36px",
      }}
    >
      Reset
    </Button>
  </Box>

  {/* Product Grid */}
  <Box
    sx={{
      width: { xs: "100%", sm: "95%", md: "90%", lg: "85%" },
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)",
      },
      gap: 3,
    }}
  >
    {Products.map((product) => (
      <Box
        key={product.id}
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          bgcolor: "white",
          transition: "0.3s",
          "&:hover": { boxShadow: 3, transform: "scale(1.02)" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 320,
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Box>
          <Typography sx={{ mt: 1, fontWeight: "bold", fontSize: 14 }}>
            {product.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            {product.category}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>${product.price}</Typography>
      
        </Box>
      </Box>
    ))}
  </Box>
</Container>
 )}