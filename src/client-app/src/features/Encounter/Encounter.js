import React from 'react';
import {Record} from "./Record";
import {Walk} from "./Walk";
import {uploadRecording} from "./upload";
import {WhiteBlockButton} from "../ui";

export class Encounter extends React.Component {

    state = {
       'mode': 'encounter'
    }

    startHandler = null
    setStartHandler = (handler) => this.startHandler = handler

    handlePressRecord = () => {
        this.setState({'mode': 'recording'})
        this.startHandler?.()
    }

    handleRecordingDone = async (blob) => {
        this.setState({
            'mode': 'uploading'
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
            'mode':'encounter',
        })
    }


    render() {
        return (<>
                {this.state.mode === 'encounter' && (
                   <div className={"flex flex-col justify-center "}>
                    <span className={"prose text-xl prose-invert"}>
                         Record ecological territories to help the spirit of your place grow.
                    </span>
                       <Walk/>
                       <WhiteBlockButton onClick={this.handlePressRecord}> Record </WhiteBlockButton>
                   </div>
                )}


            {this.state.mode === 'uploading' && (
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

                <Record
                    show={this.state.mode === 'recording'}
                    setStartHandler={this.setStartHandler}
                    onDone={this.handleRecordingDone}

                />

                </>)

    }
}

