const FoodItem = require('../models/foodItem');

const foodItemController = {
  getFoodItems: async (req, res) => {
    try {
      const foodItems = await FoodItem.find();
      return res.status(200).json({message: 'Get food items', data: foodItems});
    } catch (error) {
      return res.status(500).json({message: 'Error getting food items', error});
    }
  },
  getFoodItem: async (req, res) => {
    try {
      const foodItem = await FoodItem.findOne({itemId: req.params.itemId});
      return res.status(200).json({message: 'Get food item', data: foodItem});
    } catch (error) {
      return res.status(500).json({message: 'Error getting food item', error});
    }
  },
  getFoodItemsByCategory: async (req, res) => {
    try {
      const foodItems = await FoodItem.find({category: req.params.category});
      return res.status(200).json({message: 'Get food items by category', data: foodItems});
    } catch (error) {
      return res.status(500).json({message: 'Error getting food items by category', error});
    }
  },
  createFoodItem: async (req, res) => {
    try {
      let {name, description, category, price, image } = req.body;
      let _image = req.file ? req.file.path : image;
      const foodItem = await FoodItem.create({name, image: _image, description, category, price});
      return res.status(201).json({message: 'Create food item', data: foodItem});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Error creating food item', error});
    }
  },
  updateFoodItem: async (req, res) => {
    try {
      let {name, description, category, price, image: imgString} = req.body;
      const image = req.file ? req.file.path : imgString;
      const foodItem = await FoodItem.findOneAndUpdate({itemId: req.params.itemId}, {
        $set: {
          name,
          description,
          category,
          image,
          price
        }
      }, {
        new: true
      });
      if (!foodItem) return res.status(404).json({message: 'Food item not found'});
      return res.status(200).json({message: 'Update food item', data: foodItem});
    } catch (error) {
      return res.status(500).json({message: 'Error updating food item', error});
    }
  },
  deleteFoodItem: async (req, res) => {
    try {
      const foodItem = await FoodItem.findOneAndDelete({itemId: req.params.itemId});
      return res.status(200).json({message: 'Delete food item', data: foodItem});
    } catch (error) {
      return res.status(500).json({message: 'Error deleting food item', error});
    }
  },
};

module.exports = foodItemController;
