import { Database } from "bun:sqlite"

export type User = {
    number: string
    balance: number
}

const db = new Database("floorbux.db", { strict: true, })

export function dbInit() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            number TEXT PRIMARY KEY,
            balance FLOAT NOT NULL
        );
    `)
}

export function createUser(number: string) {
    const stmt = db.prepare("INSERT INTO users (number, balance) VALUES (:number, :balance);")
    stmt.run({ number, balance: 0, } as User)
}

export function getBalance(number: string) {
    const stmt = db.prepare("SELECT * FROM users WHERE number = :number")
    return (stmt.get({ number, }) as User).balance
}

export function setBalance(number: string, balance: number) {
    const stmt = db.prepare("UPDATE users SET balance = :balance WHERE number = :number;")
    stmt.run({ number, balance, } as User)
}

export function canAffordTransaction(number: string, difference: number) {
    return getBalance(number) + difference >= 0
}
