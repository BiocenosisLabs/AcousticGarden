import React from "react";

export class RecordingAudio extends React.Component {
    constructor(props) {
        super(props);
        props.setStartHandler(this.handleStart)
    }

    state = {
        mediaData: null,
        downloadLink: {},
        recording: false,
        showRecording: true,
    }

    recordingLimit = 60 * 1000
    mediaRecorder = null
    recordedChunks = []

    render() {

        //TODO:: animate with framer motion or something, not css

        return (
            <div className={`prose prose-invert flex justify-center ${(this.props.show) ? '' : 'hidden invisible' }`}>
                <div className={"flex flex-row"}>

                    <span
                        className={`fade ${this.state.showRecording ? 'fade-in' : 'fade-out'} text-xl font-bold p-24`}
                        onClick={() => this.handleStop()}
                    >
                        Recording...
                    </span>

                    {/*{!this.state.recording && (*/}
                    {/*    <WhiteBlockButton onClick={this.handleStartPress}> Start Recording </WhiteBlockButton>*/}
                    {/*) }*/}

                    {/*<div className={"absolute bottom-0 p-2 flex place-items-center w-full justify-between"}>*/}
                    {/*    <a {...this.state.downloadLink}> Download </a>*/}
                    {/*</div>*/}
                </div>

            </div>
        );
    }

    handleStart = async () => {
        if (await this.askPermissions()) {
            const userMedia = await navigator.mediaDevices.getUserMedia({ audio: {
                    echoCancellation: false,
                    suppressLocalAudioPlayback: true,
                },
                video: false,
            })
            //navigator.vibrate(100)
            this.setState({
                recording: true,
            })
            this.handleUserMedia(userMedia)
        } else {
            console.warn("Record::handleStart: Not recording due to permissions")
        }
    }

    askPermissions = async () => {
        // perhaps all we need
        return true



        return new Promise(async (resolve, reject) => {
            const result = await navigator.permissions.query({name:'microphone'})

            if (result.state === 'granted') {
                resolve(true)
            } else if (result.state === 'prompt') {
                console.info("Record:: Permissions Prompt")
            } else if (result.state === 'denied') {
                console.warn("Record:: Permissions Denied")
                resolve(false)
            }
            result.onchange = (state) => {
                console.warn("Record:: Permissions changed but unhandled")
                if (state === 'granted') {
                    resolve(true)
                }
            };
        })

    }

    handleUserMedia = (stream) => {
        console.info({stream})

        const options = {mimeType: 'audio/webm'};
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.recordedChunks = [];
        this.setState({
            timeStarted: Date.now(),
        })

        this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
        this.mediaRecorder.start(1000);
        this.mediaRecorder.addEventListener('stop', () => {
            stream.getTracks().forEach( track => track.stop() );
        })
    };

    handleDataAvailable = (data) => {
        if (data.data.size > 0) {
            this.recordedChunks.push(data.data);
        }

        if ((Date.now() - this.state.timeStarted) > this.recordingLimit) {
            this.handleStop()
        } else {
            const secs = ((Date.now() - this.state.timeStarted)/1000)
            console.log("Recorded s",Math.round(secs))
            this.setState({
                recording: true,
            })
        }
    }

    handleStop = () => {
        console.info("Record:: Successfully finished.")
        this.mediaRecorder.stop()
        const blob = new Blob(this.recordedChunks,  {type: 'audio/webm'});
        this.props.onDone(blob)
    }



}

