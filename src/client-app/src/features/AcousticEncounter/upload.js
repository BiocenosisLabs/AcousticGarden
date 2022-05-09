import {v4 as uuid} from "uuid";
import {getApiUrlString} from "../../config";

export function generateKey() {
    return uuid();
}

export async function uploadRecording({user, location, recording}) {

    const formData = new FormData();

    formData.append('user', user,);
    formData.append('latitude', location[0]);
    formData.append('longitude', location[1]);
    formData.append('file', recording, 'blob.webm');

    let feedback = {
        spirit: {
            name: 'Henry',
            exp: 12304,
            lvl: 999,
        }
    }


    // POST /api/uploads/recordings
    const ret = await fetch(getApiUrlString('uploads/recordings'),
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => feedback = response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(async error => {
            console.error('Error:', error);
            await new Promise(resolve => setTimeout(resolve, 2000))
        });

    return feedback
}
