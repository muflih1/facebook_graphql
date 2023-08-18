import multer from "multer"
import { v4 } from "uuid"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },

  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

export default upload