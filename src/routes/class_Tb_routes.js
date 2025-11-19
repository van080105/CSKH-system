import express from 'express'
const router = express.Router()
import controller from '../controllers/admin_controller_classTb'
router.get('/',controller.getClassTb)
export default router
