import * as globals from "./globals"
import express from "express"
import { dbInit } from "./db"
import notfound from "./routes/.notfound"
import balance from "./routes/balance"
import charge from "./routes/charge"
import pay from "./routes/pay"

dbInit()

// Config
const app = express()
app.use(express.json())

// Routes
app.post("/balance", balance)
app.post("/charge", charge)
app.post("/pay", pay)

// Listen
app.use(/.*/, notfound)
app.listen(globals.PORT, () => {
    console.log(`Floorbux API started on ${globals.PORT}`)
})
