import type { Request, Response } from "express"

export type RouteResponse = {
    status: number
    message?: string
    data?: any
}

export type RouteCallback = (req: Request, res: Response) => Promise<RouteResponse>

export default function declareRoute(callback: RouteCallback) {
    return async (req: Request, res: Response) => {
        const data = await callback(req, res)
        res.status(data.status).json({
            disclaimer: "This Floorbux API does not directly translate Floorbux to standardized currencies or paid products. Blame falls on services utilizing this Floorbux API.",
            ...data,
        })
    }
}
