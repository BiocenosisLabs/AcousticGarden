import React from "react";

export class Record extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        mediaData: null,
        downloadLink: {},
    }

    recordingLimit = 60 * 1000
    mediaRecorder = null
    recordedChunks = []

    render() {

        return (
            <div>
                <button onClick={this.handleStartPress}> Start Recording </button>

                <button onClick={this.handleStopPress}> Stop </button>
                <button onClick={this.handleUploadPress}> iup </button>

                <a {...this.state.downloadLink}> Download </a>
            </div>
        );
    }


    handleStartPress = async () => {
        if (await this.askPermissions()) {
            const userMedia = await navigator.mediaDevices.getUserMedia({ audio: {
                    echoCancellation: false,
                    suppressLocalAudioPlayback: true,
                },
                video: false,
            })
            this.handleUserMedia(userMedia)
        }
    }

    askPermissions = async () => {
        const result = await navigator.permissions.query({name:'microphone'})

        if (result.state === 'granted') {
            return true
        } else if (result.state === 'prompt') {

        } else if (result.state === 'denied') {

        }
        result.onchange = function() {

        };
    }

    handleUserMedia = (stream) => {
        console.log("handleUserMedia",stream)
        const options = {mimeType: 'audio/webm'};

        this.mediaRecorder = new MediaRecorder(stream, options);

        this.recordedChunks = [];
        this.setState({
            timeStarted: Date.now(),
        })

        this.mediaRecorder.addEventListener('dataavailable', (e) => {
            if (e.data.size > 0) this.recordedChunks.push(e.data);

            if (Date.now() - this.state.timeStarted > this.recordingLimit) {
                this.handleStopPress()
            }
        });
        this.mediaRecorder.start();
    };

    handleStopPress = () => {
        console.log("stopped")
        this.mediaRecorder.stop()
        console.log(this.state)

        const blob = new Blob(this.recordedChunks,  {type: 'audio/webm'});

        this.setState({
            blob,
            downloadLink: {
                href: URL.createObjectURL(blob),
                download: 'Recording-1.wav',
            }
        })
        console.log(this.recordedChunks)
        console.log(this.state)
    }

    handleUploadPress = () => {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('username', 'abc123');
        formData.append('location', 'abc123');
        formData.append('recording', this.state.blob);

        fetch('/recording', {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

}

