import {v4 as uuid} from "uuid";
import {getApiUrlString} from "../../config";

export function generateKey() {
    return uuid();
}

export async function uploadRecording({userId, latitude,longitude, recording}) {

    const formData = new FormData();

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


    // POST /api/uploads/recordings
    const ret = await fetch(getApiUrlString('uploads/recordings'),
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(async error => {
            console.error('Error:', error);
            // await new Promise(resolve => setTimeout(resolve, 2000))
        });

    return ret
}
