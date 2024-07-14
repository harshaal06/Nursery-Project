import axios from 'axios';
import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import EditPlant from './EditPlant';

function Card({_id, name, category, imageURL, price, description, loadPlants}) {
    const deletePlant = async(Id) =>{
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/plant/${Id}`)
        toast.success(response.data.message);
    
        setTimeout(() => {
            loadPlants();
        }, 1000)
      }

      
  const [showEditPlant, setShowEditPlant] = useState(false)

    return (
        <div className='w-64 h-[340px] rounded-2xl bg-zinc-900 overflow-hidden'>
            <img src={imageURL} alt={name} className='w-full h-52'/>
            <div className='text-white p-3'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>{name}</h1>
                    <p className='text-sm leading-tight bg-zinc-700 px-2 rounded-md'>#{category}</p>
                </div>
                <p className={`text-xs leading-tight my-2 font-semibold ${description.length <= 42 && 'mb-6'}`}>{description}{description.length}</p>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-semibold'>₹ {price}</h1>
                    <div className='flex gap-3'>
                        <FiEdit 
                            className='bg-blue-600 p-1 rounded-xl cursor-pointer' size='2em'
                            onClick={() => setShowEditPlant(true)}
                        />
                        <RiDeleteBin2Line 
                            className='bg-red-600 p-1 rounded-xl cursor-pointer' size='2em'
                            onClick={()=>{ deletePlant(_id)}}
                        />
                    </div>
                </div>
            </div>
            {showEditPlant && <EditPlant loadPlants={loadPlants} _id={_id} showEditPlant={showEditPlant} onClose={() => { setShowEditPlant(false) }} />}
        </div>
    )
}

export default Card