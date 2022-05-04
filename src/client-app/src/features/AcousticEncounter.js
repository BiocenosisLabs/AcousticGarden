import React from 'react';
import {EncounterMap} from "./AcousticEncounter/EncounterMap";
import {uploadRecording} from "./AcousticEncounter/upload";
import {WhiteBlockButton} from "./ui";

const Timer = ({limit, elapsed}) => {
    const secs = `${Math.round((limit - elapsed)/1000)}`
    const secsString = secs.padStart(2,"0")
    return (<span>-00:{secsString}</span>)
}

export class AcousticEncounter extends React.Component {

    state = {
        'mode': 'Loading',
        'location': null
    }

    recordingLimit = 10 * 1000
    mediaRecorder = null
    recordedChunks = []

    constructor(props) {
        super(props);
        try {
            this.handleRequestPermissions().then(this.handleInitialPermissions)
        } catch (e) {
            console.log("Permissions not previously accepted",e)
            this.setState({'mode': 'PermissionsRequest'})
        }
    }

    handleInitialPermissions = (value) => {
        if (value) {
            console.log("Permissions previously accepted")
            this.setState({'mode':'Encounter'})
        } else {
            console.log("Permissions not previously accepted")
            this.setState({'mode': 'PermissionsRequest'})
        }
    }


    // Request the geolocation position watch and user's microphone media source
    handleRequestPermissions = async () => {

        // Obtain geolocation watch
        const success = (pos) => {
            console.log("Got Position:",pos)
            if (pos?.coords) {
                this.setState({location: pos.coords});
            }
        }
        const error = (err) => console.warn('ERROR(' + err.code + '): ' + err.message);
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        if (this.state.geoWatchID) {
            try {
                navigator.geolocation.clearWatch(this.state.geoWatchID)
            } catch {}
        }

        let geoWatchID
        try {
            navigator.geolocation.getCurrentPosition(success, error, options)
            geoWatchID = navigator.geolocation.watchPosition(success, error, options); // later: cleanup the geolocation watch via navigator.geolocation.clearWatch(id);
            this.setState({geoWatchID})
            console.log("GeoWatchId:", geoWatchID)
        } catch (e) {
            console.warn("Gelocation permissions denied",e)
            return false
        }

        if (this.state.userMedia) {
            try {
                this.state.userMedia = null
            } catch {}
        }

        let userMedia
        try {
            // Obtain audio media device
            userMedia = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    suppressLocalAudioPlayback: true,
                },
                video: false,
            })
            this.setState({userMedia})
            console.log("userMedia", userMedia)

        } catch (e) {
            console.warn("UserMedia permissions denied",e)
            return false
        }

        // Move to the next app screen state if permissions granted
        if (geoWatchID !== null && userMedia !== null) {
            this.setState({
                mode:'Encounter'
            })
        }
    }

    handlePressRecord = () => {
        this.setState({'mode': 'Record'})
        this.handleRecordingStart()
    }

    handleRecordingStart = () => {
        //navigator.vibrate(100)
        this.handleRecordingUserMedia(this.state.userMedia)
    }

    handleRecordingUserMedia = (stream) => {
        console.info("Record:: handleRecordingUserMedia",stream)

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
            stream.getTracks().forEach( track => track.stop() );
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
            console.log("Record::",Math.round(this.state.elapsedMS/1000))
        }
    }

    handleRecordingStop = () => {
        console.info("Record:: Successfully finished.")
        this.mediaRecorder.stop()
        const blob = new Blob(this.recordedChunks,  {type: 'audio/webm'});
        this.handleRecordingDone(blob)
    }

    handleRecordingDone = async (blob) => {
        this.setState({
            'mode': 'Upload'
        })
        await uploadRecording({
            user: '1234',
            location: '1,-1',
            recording: blob,
        })
        this.setState({
            'mode':'done',
        })

        // TODO: 'Download' the recording blog back to the user
        this.setState({
            // blob,
            // downloadLink: {
            //     href: URL.createObjectURL(blob),
            //     download: 'Recording-1.wav',
            // }
        })
    }

    handleReset = () => {
        this.setState({
            'mode':'Encounter',
        })
    }




    render() {

        return (<>
                {this.state.mode === 'PermissionsRequest' && (
                    <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>

                    </span>
                        <WhiteBlockButton onClick={this.handleRequestPermissions}>
                            Allow Location and Microphone access to record sound in your area
                        </WhiteBlockButton>
                    </div>
                )}

                {this.state.mode === 'Encounter' && (
                   <div className={"flex flex-col justify-center "}>

                       <span className={"prose text-xl prose-invert"}>
                         Record ecological territories to help the spirit of your place grow.
                    </span>
                       <EncounterMap location={this.state.location}/>
                       <WhiteBlockButton onClick={this.handlePressRecord}> Record </WhiteBlockButton>

                   </div>
                )}


            {this.state.mode === 'Record' && (
                <div className={`prose prose-invert flex justify-center`}>
                    <div className={"flex flex-col"}>
                        <div onClick={this.handleRecordingStop}>
                             <span className={`text-xl font-bold p-24`}>
                                 Recording...
                             </span>
                            <Timer limit={this.recordingLimit} elapsed={this.state.elapsedMS ?? 0} />
                        </div>
                    </div>
                </div>
            ) }

            {this.state.mode === 'Upload' && (
                <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>
                         Uploading...
                    </span>
                </div>
            )}

            {this.state.mode === 'done' && (
                <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>
                         The spirits thank you for your recording.
                    </span>
                    <WhiteBlockButton onClick={this.handleReset}> More Encounters </WhiteBlockButton>
                </div>
            )}



                </>)

    }
}

