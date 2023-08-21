import { Router } from "express"
import upload from "../config/multer.js"
import { mediaController } from "../controllers/mediaController.js"

const router = Router()

router.post('/', upload.single('media'), mediaController)

export default router