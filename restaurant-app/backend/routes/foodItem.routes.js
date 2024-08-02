const express = require('express');
const router = express.Router();
const foodItem = require('../controllers/foodItem.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

router.get('/all', foodItem.getFoodItems);
router.post('/create', upload.single('image'), foodItem.createFoodItem);
router.put('/update/:itemId', upload.single('image'), foodItem.updateFoodItem);
router.get('/:itemId', foodItem.getFoodItem);
router.delete('/:itemId', foodItem.deleteFoodItem);
router.get('/category/:category', foodItem.getFoodItemsByCategory);

module.exports = router;
