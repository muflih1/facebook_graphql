import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import schema from "./schema.js"
import { createHandler } from "graphql-http/lib/use/express"
import mediaRoutes from "./routes/media.js"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/user.js"


config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/media', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use(cors())

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err))

app.use('/accounts', userRoutes)
app.use('/upload', mediaRoutes)
app.post('/api/graphql', createHandler({ schema }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server listening on ' + PORT))
