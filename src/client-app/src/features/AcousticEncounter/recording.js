// Request the geolocation position watch and user's microphone media source
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';




export class RecordingManager {

    limit = 10 * 1000
    userMedia = null
    timeStarted = null
    onFinished = () => null

    recordedChunks = []
    blob = null

    constructor({limit, onElapsed, onFinished}) {


        if (onElapsed) this.onElapsed = onElapsed
        if (limit) this.limit = limit
        if (onFinished) this.onFinished = onFinished
    }

    onElapsed = () => null

    async setup() {

        try {
            await register(await connect());
        } catch (e) {
            console.info("ignoring:",e)
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
            console.log("Record:: setup userMedia", this.userMedia)

        } catch (e) {
            console.warn("UserMedia permissions denied", e)
            return false
        }

    }

    start = () => {



        const stream = this.userMedia
        console.info("Record:: start", stream)

        // const options = {mimeType: 'audio/webm'};

        const options = {mimeType: 'audio/wav'};
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.timeStarted = Date.now()

        this.mediaRecorder.addEventListener(
            'dataavailable',
            this.handleRecordingDataAvailable,
        );

        this.mediaRecorder.start(1000);
    };

    handleRecordingDataAvailable = (data) => {
        if (data.data.size > 0) {
            this.recordedChunks.push(data.data);
        }

        if ((Date.now() - this.timeStarted) > this.limit) {
            console.info("Record:: Limit Reached")
            this.stop()
        } else {
            const elapsed = Date.now() - this.timeStarted
            console.log("Record:: Elapsed", Math.round(elapsed / 1000))
            this.onElapsed(elapsed)
        }
    }

    stop() {
        //this.mediaRecorder.stop()
        this.userMedia.getTracks().forEach(track => track.stop());
        this.mediaRecorder.removeEventListener(
            'dataavailable'
        );
        // this.userMedia = null
        this.blob = new Blob(this.recordedChunks, {type: 'audio/wav'});
        this.onFinished(this.blob)
        this.recordedChunks = [];
        this.userMedia = null
        this.mediaRecord = null
    }
}









