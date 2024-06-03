import itemsData from "../../itemsData.json";
const db = require("../config").default;

exports.getAllItems = async (req, res) => {
    try {
        const items = await db.item.findAll({
            include: [{
                model: db.review,
                as: 'reviews',
                include: {
                    model: db.user,
                    attributes: ['userId', 'name'] 
                }
            }]
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "", details: error.message });
    }
}

exports.saveItems = async (req, res) => {
    try{
        const savedItems = await Promise.all(
            itemsData.map(item => db.item.create(item))
        );

        res.status(200).json({ message: "Items saved successfully", data: savedItems });
    }
    catch(error){
        res.staus(500).json({error: "", details: error.message});
    }
}