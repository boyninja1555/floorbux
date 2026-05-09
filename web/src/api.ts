import { getNumber } from "./numberlib"

const URL = "https://fbxapi.flappygrant.com"

export async function getBalance(number: string): Promise<number | string> {
    try {
        const req = await fetch(`${URL}/balance`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ number, }),
        })

        const res = await req.json()
        if (res.status != 200) return res.message
        return res.data as number
    } catch (error) {
        return (error instanceof Error ? error.message : String(error))
    }
}

export async function payUser(number: string, amount: number): Promise<string | undefined> {
    try {
        const req = await fetch(`${URL}/pay`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                number,
                amount,
                source: getNumber(),
            }),
        })

        const res = await req.json()
        if (res.status != 200) return res.message
        return
    } catch (error) {
        return (error instanceof Error ? error.message : String(error))
    }
}
