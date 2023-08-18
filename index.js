import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import schema from "./schema.js"
import { createHandler } from "graphql-http/lib/use/express"

config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err))

app.all('/api/graphql', createHandler({ schema }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server listening on ' + PORT))
