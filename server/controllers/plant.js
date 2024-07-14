import Plant from "../models/Plant.js";

const postPlant = async (req, res) => {
    const { name, price, imageURL, category, description } = req.body;

    if(!name || !price ){
        res.json({
            success: false,
            data: null,
            message: "All fields are mandatory,"
        })
    }

    const newPlant = new Plant({ name, price, imageURL, category, description })

    const savedPlant = await newPlant.save();

    res.json({
        success: true,
        data: savedPlant,
        message: "New plant added successfully"
    })
}

const getPlants = async (req, res) => {
    const allPlants = await Plant.find();

    res.json({
        success: true,
        data: allPlants,
        message: "All plants fetched successfully"
    })
}

const getPlantId = async(req, res)=>{
    const {id} = req.params;

    const plant = await Plant.findById(id);

    res.json({
        success: plant ? true : false,
        message: plant ? "Plant fetched successfully" : "Plant not found",
        data: plant || null,
    })
}

const putPlantId = async(req, res)=>{
    const {id} = req.params;

    const { name, price, imageURL, category, description } = req.body;

    await Plant.updateOne({ _id: id }, {
        $set:{
            name: name,
            category: category,
            imageURL: imageURL,
            price: price,
            description: description
        }
    })

    const updatedPlant = await Plant.findById(id)

    res.json({
        success: true,
        message: 'Plant updated successfully',
        data: updatedPlant
    })
}

const deletePlantId = async (req, res)=>{
    const {id} = req.params

    await Plant.deleteOne({ _id: id })

    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    })
}

export{ postPlant, getPlants, getPlantId, putPlantId, deletePlantId }