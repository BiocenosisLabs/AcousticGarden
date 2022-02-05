import {v4 as uuid} from "uuid";
import {getApiUrl} from "../../config";

export function generateKey() {
    return uuid();
}

export async function uploadRecording({user, location, recording}) {

    const formData = new FormData();

    formData.append('user', user,);
    formData.append('location', location);
    formData.append('recording', recording);

    return fetch(
        {
            url: getApiUrl('uploads'),
        },
        {
            method: 'PUT',
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
