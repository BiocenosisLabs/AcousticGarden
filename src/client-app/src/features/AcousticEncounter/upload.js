import {v4 as uuid} from "uuid";
import {getApiUrl} from "../../config";

export function generateKey() {
    return uuid();
}

export async function uploadRecording({user, location, recording}) {

    const formData = new FormData();

    // Testing
    location = [1.123, -1.567]
    user = "1"

    formData.append('user', user,);
    formData.append('latitude', location[0]);
    formData.append('longitude', location[1]);
    formData.append('file', recording);

    // POST /api/uploads/recordings
    return fetch(
        {
            url: getApiUrl('uploads/recordings'),
        },
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
