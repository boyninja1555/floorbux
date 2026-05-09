import declareRoute from "./_route"
import { getBalance } from "../db"

export default declareRoute(async (req, res) => {
    const { number, } = req.body as { number?: string, }

    if (!number || typeof number !== "string") return {
        status: 400,
        message: "Invalid or missing number",
    }

    return {
        status: 200,
        data: getBalance(number),
    }
})
