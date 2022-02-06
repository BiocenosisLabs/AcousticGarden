export const config = {
    transport: process.env.NODE_ENV === 'development' ? 'http' : 'https',
    port: process.env.NODE_ENV === 'development' ? ':8088' : ''
}

// switch the for prod to https
export const getApiUrlString = (route) =>
    `${config.transport}://${window.location.hostname}${config.port}/api/${route}`
export const getApiUrl = (route) => new URL(getApiUrlString(route))
