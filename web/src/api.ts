const URL = "http://localhost:2391"

export async function getBalance(number: string) {
    try {
        const req = await fetch(`${URL}/balance`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ number, }),
        })

        const res = await req.json()
        if (res.status != 200) {
            console.error(res.message)
            return -1
        }

        return res.data as number
    } catch (error) {
        console.error(error)
        return -1
    }
}
