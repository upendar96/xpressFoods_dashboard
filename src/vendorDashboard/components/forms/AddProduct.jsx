import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';


const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [region, setRegion] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); 


  const handleRegionChange = (event)=>{
    const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item)=> item !== value));
      }else{
        setRegion([...region, value])
      }
}
  const handleBestSeller =(event)=>{
    const value = event.target.value === 'true'
      setBestSeller(value)
  }
  const handleImageUpload =(event)=>{
    const selectedImage = event.target.files[0];
    setImage(selectedImage)
}

  const handleAddProduct = async(e)=>{
      e.preventDefault()
    setLoading(true); 

      try {
        const loginToken = localStorage.getItem('loginToken');
          const firmId = localStorage.getItem('firmId')

          if(!loginToken || !firmId){
              console.error("user not authenticated")
          }
          
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('bestSeller', bestSeller)
        formData.append('image', image)

        region.forEach((value)=>{
          formData.append('region', value)
        })
   
          const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
            method:'POST',
            body: formData
          })
            const data = await response.json()

            if(response.ok){
              alert('Product added succesfully')
              console.log(data);
            }
            setProductName("")
            setPrice("");
            setRegion([])
            setBestSeller(false);
            setImage(null);
            setDescription("")

      } catch (error) {
          alert('Failed to add Product')
      }finally {
        setLoading(false); 
      }
  }

    return (
    <div className="firmSection">
{loading &&         <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Please wait, your product is being added...</p>
      </div>}
  {!loading && 
    <form className="tableForm" onSubmit={handleAddProduct}>
    <h3>Add Product</h3>
        <label >Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} />
        <label >Price</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <div className="checkInp">
     <label >Category</label>
         <div className="inputsContainer1">
         <div className="checboxContainer">
                 <label>Veg</label>
                 <input type="checkbox" value="veg" checked ={region.includes('veg')}  onChange={handleRegionChange}/>
               </div>
               <div className="checboxContainer">
                 <label>Non-veg</label>
                 <input type="checkbox" value="non-veg" checked ={region.includes('non-veg')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>Chicken</label>
                 <input type="checkbox" value="chiken" checked ={region.includes('chiken')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>Mutton</label>
                 <input type="checkbox" value="mutton" checked ={region.includes('mutton')} onChange={handleRegionChange} />
               </div>
               
               <div className="checboxContainer">
                 <label>Fish</label>
                 <input type="checkbox" value="fish" checked ={region.includes('fish')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>Biriyani</label>
                 <input type="checkbox" value="biriyanies" checked ={region.includes('biriyanies')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>Tiffin</label>
                 <input type="checkbox" value="tiffins" checked ={region.includes('tiffins')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>Meals</label>
                 <input type="checkbox" value="meals" checked ={region.includes('meals')} onChange={handleRegionChange} />
               </div>
               
               <div className="checboxContainer">
                 <label>Dessert&icecreams</label>
                 <input type="checkbox" value="desertsandicecreams" checked ={region.includes('desertsandicecreams')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>roties</label>
                 <input type="checkbox" value="roties" checked ={region.includes('roties')} onChange={handleRegionChange} />
               </div>
               <div className="checboxContainer">
                 <label>smoothies</label>
                 <input type="checkbox" value="smoothies" checked ={region.includes('smoothies')} onChange={handleRegionChange} />
               </div>
         </div>

   </div>
   <div className="checkInp">
     <label >Best Seller</label>
         <div className="inputsContainer">
         <div className="checboxContainer">
                 <label>Yes</label>
                 <input type="radio" value="true" checked = {bestSeller=== true} onChange={handleBestSeller}/>
               </div>
               <div className="checboxContainer">
                 <label>No</label>
                 <input type="radio" value="false" checked = {bestSeller=== false} onChange={handleBestSeller}/>
               </div>
         </div>

   </div>
       
        <label >Description</label>
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <label >Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
    <div className="btnSubmit">
<button type='submit'>Submit</button>
</div>
   </form>
  }
 </div>
  )
}

export default AddProduct

