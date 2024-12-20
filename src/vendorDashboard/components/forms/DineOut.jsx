
import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';


const AddDine = () => {
  const [dineName, setDineName] = useState("");
  const [dinearea, setDineArea] = useState("");
  const [dinecategory, setDineCategory] = useState([]);
  const [dineregion, setDineRegion] = useState([]);
  const [dineoffer, setDineOffer] = useState("");
  const [dinefile, setDineFile] = useState(null);
  const [loading, setLoading] = useState(false); 


  const handleCategoryChange = (event)=>{
      const value = event.target.value;
        if(dinecategory.includes(value)){
          setDineCategory(dinecategory.filter((item)=> item !== value));
        }else{
          setDineCategory([...dinecategory, value])
        }
  }
  const handleRegionChange = (event)=>{
      const value = event.target.value;
        if(dineregion.includes(value)){
          setDineRegion(dineregion.filter((item)=> item !== value));
        }else{
          setDineRegion([...dineregion, value])
        }
  }
 
  const handleImageUpload =(event)=>{
      const selectedImage = event.target.files[0];
      setDineFile(selectedImage)
  }

  const handleDineSubmit= async(e)=>{
        e.preventDefault();
    setLoading(true); 

   try {
        const loginToken = localStorage.getItem('loginToken');
        if(!loginToken){
            console.error("User not authenticated");
        }

        const formData = new FormData();
          formData.append('dineName', dineName);
          formData.append('dinearea', dinearea);
          formData.append('dineoffer', dineoffer);
          formData.append('dineimage', dinefile)

          dinecategory.forEach((value)=>{
            formData.append('category', value)
          });
          dineregion.forEach((value)=>{
            formData.append('region', value)
          })

          const response = await fetch(`${API_URL}/dine/add-dine`,{
            method:'POST',
            headers:{
              'token': `${loginToken}`
            },
            body: formData
          });
          const data = await response.json()
          if(response.ok){
            console.log(data);
            setDineName("");
            setDineArea("")
            setDineCategory([]);
            setDineRegion([]);
            setDineOffer("");
            setDineFile(null)
            alert("dine added Successfully")
          }else if(data.message === "vendor can have only one dine"){
              alert("dine Exists 🥗. Only 1 dine can be added  ")
          } else{
              alert('Failed to add dine')
          }

               const mango = data.dineId;
          const vendorRestuarant = data.vendorDineName

          localStorage.setItem('dineId', mango);
          localStorage.setItem('dineName', vendorRestuarant)
          window.location.reload()

   } catch (error) {
      console.error("failed to add Firm")
      alert("failed to add Firm")
   } finally {
    setLoading(false); 
  }  
  }


  return (
        <div className="firmSection">
   {loading &&        <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
         {!loading &&   <form className="tableForm" onSubmit={handleDineSubmit}>
            <h3>Add Dine</h3>
                <label >Dine Name</label>
                <input type="text" name='dineName' value={dineName} onChange={(e)=>setDineName(e.target.value)}/>
                <label >Area</label>
                <input type="text"  name='area' value={dinearea} onChange={(e)=>setDineArea(e.target.value)} />
                 <label >Category</label>
                <input type="text"  /> 
    <div className="checkInp">
      <label >Category</label>
          <div className="inputsContainer">
          <div className="checboxContainer">
                  <label>Veg</label>
                  <input type="checkbox" checked ={dinecategory.includes('veg')}  value="veg" onChange={handleCategoryChange}/>
                </div>
                <div className="checboxContainer">
                  <label>Non-Veg</label>
                  <input type="checkbox" checked ={dinecategory.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                </div>
          </div>

    </div>
    <label >Offer</label>
                <input type="text" name='offer' value={dineoffer} onChange={(e)=>setDineOffer(e.target.value)}/>
    <div className="checkInp">
      <label >Region</label>
          <div className="inputsContainer">
          <div className="regBoxContainer">
                  <label>South Indian</label>
                  <input type="checkbox" value="south-indian"   checked ={dineregion.includes('south-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type="checkbox" value="north-indian"  checked ={dineregion.includes('north-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Chinese</label>
                  <input type="checkbox" value="chinese" checked ={dineregion.includes('chinese')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Bakery</label>
                  <input type="checkbox" value="bakery" checked ={dineregion.includes('bakery')}
                  onChange={handleRegionChange}
                  />
                </div>
          </div>

    </div>
               
                <label >dine Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
            <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div>
           </form>}
        </div>
  )
}

export default AddDine

