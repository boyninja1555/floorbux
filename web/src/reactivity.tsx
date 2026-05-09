import { type JSX, render } from "preact"
import { useEffect, useState } from "preact/hooks"
import { getBalance, payUser } from "./api"
import { getNumber, setNumber } from "./numberlib"

// Components

function Button(props: JSX.IntrinsicElements["button"]) {
    const className = `py-2 px-3 bg-accent hover:bg-accent/90 active:bg-accent/75 outline-none text-white rounded-md shadow-md ${props.className}`
    props.className = undefined
    return <button {...props} className={className} />
}

function Input(props: JSX.IntrinsicElements["input"]) {
    const className = `py-2 px-3 bg-secondary outline-none text-tsecondary rounded-md shadow-md ${props.className}`
    props.className = undefined
    return <input {...props} className={className} />
}

// Pages

function PageAccount() {
    const [balance, setBalanceCache] = useState(0)
    const [error, setError] = useState<string | null>(null)

    async function refreshBalanceCache() {
        const newCache = await getBalance(getNumber()!)
        if (typeof newCache === "string") {
            setError(newCache)
            return
        }

        setBalanceCache(newCache)
    }

    async function promptNumber() {
        const number = prompt("Enter your number...")
        if (!number) {
            promptNumber()
            return
        }

        setError(null)
        setNumber(number)
        refreshBalanceCache()
    }

    useEffect(() => {
        refreshBalanceCache()
    }, [])

    return (
        <div className="flex flex-col gap-2 top-1/2 left-1/2 -translate-1/2 absolute">
            {error ? (
                <span class="text-center text-3xl text-red-500">{error}</span>
            ) : (
                <span className="text-center text-3xl">${balance} <abbr title="Floorbux">FBX</abbr></span>
            )}

            <Button onClick={promptNumber}>
                {balance === -1 ? "Choose Number" : "Switch Number"}
            </Button>
        </div>
    )
}

function PagePay() {
    const [error, setError] = useState<string | null>(null)
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState(1)

    async function onSubmit(event: SubmitEvent) {
        event.preventDefault()
        setError(null)

        const error = await payUser(number, amount)
        if (error) {
            setError(error)
            return
        }

        setNumber("")
        setAmount(1)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 top-1/2 left-1/2 -translate-1/2 absolute">
            <h1 className="text-center text-2xl">Pay a user</h1>

            <Input type="text"
                placeholder="Recipient's number..."
                value={number}
                onInput={e => setNumber(e.currentTarget.value)}
                required />

            <Input type="number"
                placeholder="Amount..."
                value={amount}
                onInput={e => setAmount(parseInt(e.currentTarget.value, 10))}
                min={1}
                required />

            <Button>Pay</Button>
            {error && <span class="text-sm text-red-500">{error}</span>}
        </form>
    )
}

function rendering() {
    render(<PageAccount />, document.getElementById("account")!)
    render(<PagePay />, document.getElementById("pay")!)
    render(<PageAccount />, document.getElementById("charge")!)
}

window.addEventListener("hashchange", rendering)
rendering()
