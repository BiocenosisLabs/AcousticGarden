import React from 'react';
import {Record} from "./Record";
import {Walk} from "./Walk";

const RecordButton = ({onPress}) =>
(<div onClick={onPress}>
        Record
    </div>)


export class Encounter extends React.Component {

    state = {
       'mode': 'walking'
    }

    handlePressRecord = () => {
        this.setState({'mode': 'recording'})
    }

    render() {

        return (
            <div>
                {this.state.mode === 'walking' && (
                   <div>
                    <span>
                        Walk near the spirit of your place and help it grow
                    </span>
                       <Walk></Walk>
                       <RecordButton onPress={this.handlePressRecord}/>
                   </div>
                )}

                {this.state.mode === 'recording' && (
                    <Record/>
                )}
            </div>

        )

        // const { recorderState, ...handlers } = useRecorder();
        // const { audio } = recorderState;
        //
        // return (
        //     <div>
        //         <section className="voice-recorder">
        //             <h1 className="title">Spirit Recorder</h1>
        //             <div className="recorder-container">
        //                 <RecorderControls recorderState={recorderState} handlers={handlers} />
        //                 <RecordingsList audio={audio} />
        //             </div>
        //         </section>
        //     </div>
        // );

    }
}

