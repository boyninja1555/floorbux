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
            balance INT NOT NULL
        );
    `)
}

export function createUser(number: string) {
    const stmt = db.prepare("INSERT INTO users (number, balance) VALUES (:number, :balance);")
    stmt.run({ number, balance: 0, } as User)
}

export function userExists(number: string) {
    const stmt = db.prepare("SELECT 1 FROM users WHERE number = :number LIMIT 1;")
    return stmt.get({ number, }) !== null
}

export function getBalance(number: string) {
    const stmt = db.prepare("SELECT * FROM users WHERE number = :number")
    return ((stmt.get({ number, }) ?? { number: "", balance: -1, }) as User).balance
}

export function setBalance(number: string, balance: number) {
    const stmt = db.prepare("UPDATE users SET balance = :balance WHERE number = :number;")
    stmt.run({ number, balance, } as User)
}

export function canAffordTransaction(number: string, difference: number) {
    return getBalance(number) + difference >= 0
}
