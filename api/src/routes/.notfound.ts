import declareRoute from "./_route"

export default declareRoute(async (req, res) => {
    return {
        status: 404,
        message: "Route not found",
    }
})
