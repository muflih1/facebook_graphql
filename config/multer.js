import multer from "multer"
import { v4 } from "uuid"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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