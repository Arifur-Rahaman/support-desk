const express =  require('express')
const router = express.Router()

const {registerUser, signinUser, getMe} = require('../controllers/userControllers') 
const {protect} = require('../middleware/authMiddleware')
router.post('/register', registerUser)
router.post('/login', signinUser)
router.get('/me', protect, getMe)

module.exports = router