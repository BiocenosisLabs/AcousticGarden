export const config = {
    port: 8080,
}

export const getApiUrlString = (route) => `https://${window.location.hostname}:${config.port}/api/${route}`
export const getApiUrl = (route) => new URL(getApiUrlString(route))
