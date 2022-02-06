import {getApiUrl} from "../../config";

export async function getSpirits({lat,long}) {


    // Testing

    return {
        spirits: [
            {lat: 1.234, long: 234234, image: 'asdasd.'},
            {lat: 1.234, long: 234234, image: 'asdasd.'},
            {lat: 1.234, long: 234234, image: 'asdasd.'},
        ]
    }

    // /api/spirits?lat=123&long=123.
    const url = getApiUrl('spirits')
    const params = {lat, long}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch({
        url: url.toString(),
    }, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
