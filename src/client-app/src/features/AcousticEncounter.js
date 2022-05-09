import React from 'react';
import {EncounterMap} from "./AcousticEncounter/EncounterMap";
import {uploadRecording} from "./AcousticEncounter/upload";
import {WhiteBlockButton} from "./ui";

const Timer = ({limit, elapsed}) => {
    const secs = `${Math.round((limit - elapsed) / 1000)}`
    const secsString = secs.padStart(2, "0")
    return (<span>-00:{secsString}</span>)
}

export class AcousticEncounter extends React.Component {

    state = {
        'mode': 'PlayStart', // App visual state - (Which screen to show)
        'permissions': false, // Has the user allowed mic and loc permissions?
        'location': null, // {latitude: 52.4849011, longitude: 13.4350596}
        'recording': false, // boolean state
        'timeStarted': null, // time the recording was started.
        'username': 'testuser',
        'uploading': false,
        'recordingFeedback': null,
        'spiritFeedback': null,
    }

    recordingLimit = 10 * 1000 // Time in ms the recording will stop after
    mediaRecorder = null
    userMedia = null // MediaStream object to record from
    geoWatchID = null // ID to cancel polling geolocation
    recordedChunks = []

    constructor(props) {
        super(props);
        try {
            this.handleRequestPermissions()
        } catch (e) {
            console.log("Permissions not previously accepted at load time", e)
            this.setState({'mode': 'PlayStart', permissions: false,})
        }
    }

    setPermissions = (value) => {
        if (value) {
            console.log("Permissions accepted")
            this.setState({'mode': 'Encounter', permissions: true})
        } else {
            console.log("Permissions not accepted")
            this.setState({'mode': 'PlayStart', permission: false})
        }
    }


    // Request the geolocation position watch and user's microphone media source
    handleRequestPermissions = async () => {

        // Obtain geolocation watch
        const success = (pos) => {
            console.log("Got Position:", pos)
            if (pos?.coords) {
                // Set state via setState or directly incase this is called in constructor.
                this.state.location = pos.coords
                this.setState({location: pos.coords});
            }
        }
        const error = (err) => console.warn('ERROR(' + err.code + '): ' + err.message);
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        if (this.geoWatchID) {
            try {
                navigator.geolocation.clearWatch(this.geoWatchID)
            } catch (e) {
                console.info('Couldnt clear watch',this.geoWatchID)
            }
        }

        let geoWatchID
        try {
            navigator.geolocation.getCurrentPosition(success, error, options)
            geoWatchID = navigator.geolocation.watchPosition(success, error, options); // later: cleanup the geolocation watch via navigator.geolocation.clearWatch(id);
            this.geoWatchID = geoWatchID
            console.log("GeoWatchId:", geoWatchID)
        } catch (e) {
            console.warn("Gelocation permissions denied", e)
            return false
        }

        this.userMedia = null
        try {
            // Obtain audio media device
            this.userMedia = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    suppressLocalAudioPlayback: true,
                },
                video: false,
            })
            console.log("userMedia", this.userMedia)

        } catch (e) {
            console.warn("UserMedia permissions denied", e)
            return false
        }

        // Move to the next app screen state if permissions granted
        this.setPermissions((this.geoWatchID !== null && this.userMedia !== null))
    }

    handlePressRecord = () => {
        this.setState({'mode': 'Record'})
        this.handleRecordingStart()
    }

    handleRecordingStart = () => {
        //navigator.vibrate(100)
        this.handleRecordingUserMedia(this.userMedia)
    }

    handleRecordingUserMedia = (stream) => {
        console.info("Record:: handleRecordingUserMedia", stream)

        const options = {mimeType: 'audio/webm'};
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.recordedChunks = [];
        this.setState({
            recording: true,
            timeStarted: Date.now(),
        })

        this.mediaRecorder.addEventListener('dataavailable', this.handleRecordingDataAvailable);
        this.mediaRecorder.start(1000);
        this.mediaRecorder.addEventListener('stop', () => {
            stream.getTracks().forEach(track => track.stop());
        })
    };

    handleRecordingDataAvailable = (data) => {
        if (data.data.size > 0) {
            this.recordedChunks.push(data.data);
        }

        if ((Date.now() - this.state.timeStarted) > this.recordingLimit) {
            this.handleRecordingStop()
        } else {
            this.setState({
                recording: true,
                elapsedMS: Date.now() - this.state.timeStarted,
            })
            console.log("Record::", Math.round(this.state.elapsedMS / 1000))
        }
    }

    handleRecordingStop = () => {
        console.info("Record:: Successfully finished.")
        this.mediaRecorder.stop()
        this.userMedia = null
        const blob = new Blob(this.recordedChunks, {type: 'audio/webm'});
        this.handleRecordingDone(blob)
    }

    handleRecordingDone = async (blob) => {
        this.setState({
            uploading: true,
            mode: 'RecordingFeedback'
        })

        const recordingFeedback = await this.getRecordingFeedback(blob)
        this.setState({recordingFeedback})

        const spiritFeedback = await uploadRecording({
            user: this.state.username,
            location: [this.state.location.latitude, this.state.location.longitude],
            recording: blob,
        })
        this.setState({
            uploading: false,
            spiritFeedback,
        })

        // TODO: 'Download' the recording blob back to the user
        this.recordingBlob = blob
        this.setState({
            // blob,
            // downloadLink: {
            //     href: URL.createObjectURL(blob),
            //     download: 'Recording-1.wav',
            // }
        })
    }

    getRecordingFeedback = async (blob) => {
        return {
            'graph': [1,2,3,4,5]
        }
    }

    handleSubmitRecording = async () => {
        if (this.state.uploading) {
            console.log('still uploading')
        } else {
            this.setState({'mode': 'SpiritFeedback'})
        }
    }

    handleReset = () => {
        this.recordingBlob = null
        this.mediaRecorder = null

        this.setState({
            uploading: false,
            recording: null,
            elapsedMS: null,
            timeStarted: null,
            'mode': 'Encounter',
        })
    }


    render() {

        return (<>
            {this.state.mode === 'PlayStart' && (
                <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>

                    </span>
                    <WhiteBlockButton onClick={this.handleRequestPermissions}>
                        Allow Location and Microphone access to record sound in your area
                    </WhiteBlockButton>
                </div>
            )}


            {this.state.mode === 'Encounter' && this.renderEncounterMap()}

            {this.state.mode === 'Record' && this.renderRecording()}

            {this.state.mode === 'RecordingFeedback' && this.renderRecordingFeedback()}

            {this.state.mode === 'SpiritFeedback' && this.renderSpiritFeedback()}


        </>)

    }

    renderEncounterMap() {
        return <div className={"flex flex-col justify-center "}>

            {(this.state.permissions && (this.state.location !== null)) ?
                (<>
                       <span className={"prose text-xl prose-invert"}>
                         Record ecological territories to help the spirit of your place grow.
                    </span>
                    <EncounterMap location={this.state.location}/>
                    <WhiteBlockButton onClick={this.handlePressRecord}> Record </WhiteBlockButton>
                </>)
                :
                (<>
                    <WhiteBlockButton onClick={this.handleRequestPermissions}>
                        Allow Location and Microphone access to record sound in your area
                    </WhiteBlockButton>
                </>)
            }

        </div>;
    }


    renderRecording() {
        return <div className={`prose prose-invert flex justify-center`}>
            <div className={"flex flex-col"}>
                <div onClick={this.handleRecordingStop}>
                             <span className={`text-xl font-bold p-24`}>
                                 Recording...
                             </span>
                    <Timer limit={this.recordingLimit} elapsed={this.state.elapsedMS ?? 0}/>
                </div>
            </div>
        </div>;
    }

    renderRecordingFeedback() {
        return <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>
                        Recording Feedback
                        <pre>
                            { JSON.stringify(this.state.recordingFeedback) }
                        </pre>
                    </span>
            <WhiteBlockButton disabled={this.state.uploading} onClick={this.handleSubmitRecording}> {this.state.uploading ? 'Uploading...' : 'Send Recording'} </WhiteBlockButton>

        </div>;
    }

    renderSpiritFeedback() {
        return <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>
                                                <pre>
                            { JSON.stringify(this.state.spiritFeedback) }
                        </pre>
                         The spirits thank you for your recording.
                    </span>
            <WhiteBlockButton onClick={this.handleReset}> More Encounters </WhiteBlockButton>
        </div>;
    }


}

