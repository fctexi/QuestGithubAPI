import { baseUrl, eventsQuantity } from "../variables/variables.js"

async function getUserEvents (userName) {
    const response = await fetch (`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    return await response.json()
}

export {getUserEvents}