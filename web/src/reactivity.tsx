import { HTMLAttributes, render } from "preact"
import { useEffect, useState } from "preact/hooks"
import { getBalance } from "./api"
import { getNumber, setNumber } from "./numberlib"

// Components

function Button(props: HTMLAttributes<HTMLButtonElement>) {
    const className = `py-1 px-2 bg-accent hover:bg-accent/90 active:bg-accent/75 text-white rounded-md shadow-md ${props.className}`
    props.className = undefined
    return <button {...props} className={className} />
}

// Pages

function PageAccount() {
    const [balance, setBalanceCache] = useState(-1)

    async function refreshBalanceCache() {
        setBalanceCache(await getBalance(getNumber()!))
    }

    async function promptNumber() {
        const number = prompt("Enter your number...")
        if (!number) {
            promptNumber()
            return
        }

        setNumber(number)
        setBalanceCache(await getBalance(getNumber()!))
    }

    useEffect(() => {
        refreshBalanceCache()
    }, [])

    return (
        <div className="flex flex-col gap-2 top-1/2 left-1/2 -translate-1/2 absolute">
            {(balance !== -1) && (
                <span className="text-center text-3xl">${balance} <abbr title="Floorbux">FBX</abbr></span>
            )}

            <Button onClick={promptNumber}>
                {balance === -1 ? "Choose Number" : "Switch Number"}
            </Button>
        </div>
    )
}

render(<PageAccount />, document.getElementById("account")!)
