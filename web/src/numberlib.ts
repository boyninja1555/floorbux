const storageName = "floorbux-number"

export function getNumber() {
    return localStorage.getItem(storageName)
}

export function setNumber(number: string) {
    localStorage.setItem(storageName, number)
}
