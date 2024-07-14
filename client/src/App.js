import React, { useEffect, useState } from 'react';
import Card from './components/Card'
import axios from 'axios';
import toast from "react-hot-toast"
import AddPlant from './components/AddPlant';

function App() {
  const [plants, setPlants] = useState([])

  const loadPlants = async () => {
    toast.loading("Loading plants...");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/plants`)

    toast.dismiss()
    toast.success("Plants loaded successfully");

    setPlants(response.data.data);
  }

  useEffect(()=>{
    loadPlants()
  }, [])

  const [showAddPlant, setShowAddPlant] = useState(false)
  // const [showEditPlant, setShowEditPlant] = useState(false)

  return (
    <div className='w-full bg-[#282c34] pt-3'>
      <nav className='sticky top-0 opacity-90 flex justify-between items-center px-3 md:px-20 py-4 bg-zinc-900'>
        <h3 className=' text-zinc-500 text-2xl font-semibold leading-none tracking-tighter'>Nursery Project</h3>
        <button 
          onClick={() => setShowAddPlant(true)}
          className='bg-green-600 text-white py-2 px-5 font-semibold rounded-xl'>
            Add Plant
        </button>
      </nav>
      <div className='py-10 md:px-20 w-full h-full flex gap-10 justify-evenly flex-wrap'>
        {
          plants.map((plant, i) => {
            const { _id, name, category, price, imageURL, description } = plant
  
            return (<Card key={i} _id={_id} name={name} category={category} price={price} imageURL={imageURL} description={description} loadPlants={loadPlants} />)
              // setShowEditPlant={setShowEditPlant}/>)
          })
        }
      </div>
      {showAddPlant && <AddPlant loadPlants={loadPlants} onClose={() => { setShowAddPlant(false) }} />}
      {/* {showEditPlant && <EditPlant loadPlants={loadPlants} onClose={() => { setShowEditPlant(false) }} />} */}
    </div>
  )
}

export default App