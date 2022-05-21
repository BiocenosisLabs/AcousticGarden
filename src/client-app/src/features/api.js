import {v4 as uuid} from "uuid";
import {getApiUrl, getApiUrlString} from "../config";
const fetchRetry = require('fetch-retry')(fetch);

export function generateKey() {
    return uuid();
}

export async function getFeedback({userID, recordingId}) {
    let ret
    await fetchRetry(
        getApiUrlString('feedback?') + new URLSearchParams({
                recording: recordingId,
                user: userID,
            },
        ), {
            retries: 5,
            retryDelay: 800,
            retryOn: function(attempt, error, response) {

                const cr = response.clone()
                let json
                if (cr.ok) {
                    json = cr.json()
                }

                if (attempt > 20) return false

                // retry on any network error, or 4xx or 5xx status codes
                if (error !== null || response.status >= 400 || (
                    json.status === 'error'
                )) {
                    console.log(`retrying, attempt number ${attempt + 1}`);
                    return true;
                }
            },
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                ret = result.data
            })
            .catch(async error => {
                console.error('Error:', error);
                // await new Promise(resolve => setTimeout(resolve, 2000))
            });

    return ret

}

export async function uploadRecording({userId, latitude, longitude, recording}) {

    const formData = new FormData();

    if (userId === null) {
        userId = 1
    }

    formData.append('user', userId);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('file', recording, 'blob.webm');

    // let feedback = {
    //     spirit: {
    //         name: 'Henry',
    //         exp: 12304,
    //         lvl: 999,
    //     }
    // }

    let feedback

    // POST /api/uploads/recordings
    await fetch(getApiUrlString('uploads/recordings'),
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => response.json())
        .then(result => {
            feedback = result
            console.log('Success:', result);
        })
        .catch(async error => {
            console.error('Error:', error);
            // await new Promise(resolve => setTimeout(resolve, 2000))
        });

    return feedback
}

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


export async function authUser({username}) {

    // const formData = new FormData();
    //
    // formData.append('username', username);
    // formData.append('email', username);

    let ret
    await fetch(getApiUrlString('users/signup'),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({username})
        }
    )
        .then(response => response.json())
        .then(result => {
            ret = result.data
            console.log('Success:', result);
        })
        .catch(async error => {
            console.error('Error:', error);
            // await new Promise(resolve => setTimeout(resolve, 2000))
        });

    return ret
}
