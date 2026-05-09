import declareRoute from "./_route"
import { canAffordTransaction, getBalance, setBalance } from "../db"

export default declareRoute(async (req, res) => {
    const { number, amount, source, } = req.body as { number?: string, amount?: number, source?: string, }

    if (!number || typeof number !== "string") return {
        status: 400,
        message: "Invalid or missing number",
    }

    if (!amount || typeof amount !== "number" || amount <= 0) return {
        status: 400,
        message: "Invalid or missing amount",
    }

    if (!source || typeof source !== "string") return {
        status: 400,
        message: "Invalid or missing source",
    }

    if (!canAffordTransaction(number, -amount)) return {
        status: 402,
        message: "Insufficient funds",
    }

    setBalance(number, getBalance(number) - amount)
    setBalance(source, getBalance(source) + amount)
    return {
        status: 200,
    }
})
