import * as globals from "./globals"
import express from "express"
import cors from "cors"
import { dbInit } from "./db"
import notfound from "./routes/.notfound"
import balance from "./routes/balance"
import charge from "./routes/charge"
import pay from "./routes/pay"

dbInit()

// Config
const app = express()
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.removeHeader("X-Powered-By")
    res.setHeader("Server", "Portal 2")
    next()
})

// Routes
app.post("/balance", balance)
app.post("/charge", charge)
app.post("/pay", pay)

// Listen
app.use(/.*/, notfound)
app.listen(globals.PORT, () => {
    console.log(`Floorbux API started on ${globals.PORT}`)
})
