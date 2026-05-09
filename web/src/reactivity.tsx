import { render } from "preact"
import { useEffect, useState } from "preact/hooks"
import { getBalance } from "./api"
import { getNumber, setNumber } from "./numberlib"

function PageAccount() {
    const [balance, setBalanceCache] = useState(0)

    useEffect(() => {
        function promptNumber() {
            const number = prompt("Enter your number...")
            if (!number) {
                promptNumber()
                return
            }

            setNumber(number)
        }

        async function load() {
            if (!getNumber()) promptNumber()
            setBalanceCache(await getBalance(getNumber()!))
        }

        load()
    }, [])

    return (
        <p>{balance}</p>
    )
}

render(<PageAccount />, document.getElementById("account")!)
