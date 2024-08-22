import Footer from "../components/Footer"
import Main from "../components/Main"
import SideBar from "../components/SideBar"
import { useEffect, useState } from "react"

function App() {


  
const [showModal, setShowModal] = useState(false)
const [data, setData] = useState(null)
const [loading,setLoading] = useState(false)
 
function handleToggleModal () {
  setShowModal(!showModal)
  

}
useEffect(() => {
  async function fetchAPIData() {
    const NASA_KEY = import.meta.env.VITE_API_KEY; // Make sure this matches your environment variable
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    
    const today = (new Date()).toDateString()
    const localKey = `NASA-${today}`;

    if (localStorage.getItem(localKey)){
      const apiData = JSON.parse(localStorage.getItem(localKey))
      setData(apiData)
      return
    }
    localStorage.clear()
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const apidata = await res.json();
      localStorage.setItem(localKey,JSON.stringify(apidata))
      setData(apidata)
      console.log("fetched from cahce"); // You can handle the fetched data here
    } catch (err) {
      console.log(err.message);
    }
  }

  fetchAPIData();
}, []);

return (
    <> 
    {data ? (<Main data={data}/>):(
      <div className="loadingState">
         <i className="fa-solid fa-gear"></i>
      </div>
    ) }
     {showModal && (<SideBar  data={data} handleToggleModal={handleToggleModal}/>)}
     {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
