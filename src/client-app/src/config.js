export const config = {
    port: 8088,
    transport: process.env.NODE_ENV === 'development' ? 'http' : 'https'
}

// switch the for prod to https
export const getApiUrlString = (route) => `${config.transport}://${window.location.hostname}:${config.port}/api/${route}`
export const getApiUrl = (route) => new URL(getApiUrlString(route))
