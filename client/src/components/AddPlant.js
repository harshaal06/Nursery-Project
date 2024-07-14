import React, { useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';

function AddPlant({ onClose, loadPlants }) {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const addPlant = async () => {
        if (!(name &&  imageURL && price)) {
            toast('All information required.', {
                icon: 'ℹ',
            });
        }
        else {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/plant`, { name, imageURL, price, category, description })
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            else if (response.data.success) {
                toast.success(response.data.message);

                setTimeout(() => {
                    loadPlants();
                    onClose();
                }, 1000)
            }
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col gap-3 mt-8'>
                <button onClick={onClose} className='place-self-end'><RxCross1 className='text-white' size={30} /></button>
                <div className='bg-zinc-900 py-5 px-7 rounded-lg border border-green-700 mx-4 text-zinc-500'>
                    <h1 className='text-center font-semibold text-3xl leading-none tracking-tighter text-gray-300'>Add New Plant</h1>
                    <form class="mt-4 text-gray-400">
                        <div class="space-y-4">
                            <div>
                                <label class="text-base font-medium ">
                                    Name :
                                </label>
                                <input
                                    class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                    type="text"
                                    placeholder="Ex. Mango Tree"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label class="text-base font-medium">
                                    Image URL:
                                </label>
                                <input
                                    class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                    type="text"
                                    placeholder="Ex: https://example.com/images/mango_tree.jpg"
                                    value={imageURL}
                                    onChange={(e) => {
                                        setImageURL(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='flex gap-3'>
                                <div className='w-full'>
                                <label class="text-base font-medium ">
                                    Price :
                                </label>
                                <input
                                    class="mt-2 h-10 w-full text-gray-300 rounded-lg border border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                    type="number"
                                    placeholder="Ex. 500"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                                </div>
                                <div className='w-full'>
                                <label class="text-base font-medium ">
                                    Category :
                                </label>
                                <input
                                    class="mt-2 h-10 text-gray-300 w-full rounded-lg border border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                    type="text"
                                    placeholder="Ex. Outdoor/Indoor/Herbs"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}
                                />
                                </div>
                            </div>
                            <div>
                                <label class="text-base font-medium">
                                    Description:
                                </label>
                                <textarea rows={4} cols={40}
                                    class="mt-2 h-20 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                    type="text"
                                    placeholder="Write somethimg about plant."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <button onClick={addPlant}
                                    type="button"
                                    className='bg-green-600 text-white py-2 px-5 font-semibold rounded-xl hover:bg-green-700'
                                >
                                    Add New Plant
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddPlant