import React, {useEffect, useMemo} from 'react'
import {
    Back,
    BackgroundContainer,
    ButtonPrimary,
    ContainerBottom,
    HeaderNav,
    MainTitle,
    PageContainer
} from "../components/components";
import {useStore} from "../store";
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const TOKENS = {
    DlSpaceSpaceTwounits: '12px',
    DlSpaceSpaceOneandhalfunits: '9px',
    DlRadiusRadiusRound: '100px',
    DlSpaceSpaceThreeunits: '18px',
}

function useObjectUrl(blob) {
    const url = useMemo(() => URL.createObjectURL(blob), [blob]);
    useEffect(() => () => URL.revokeObjectURL(url), [blob]);
    return url;
}

// Use the hook and render the audio element
function AudioPlayer({blob}) {
    const src = useObjectUrl(blob);
    return <ReactAudioPlayer
        autoPlay={false}
        src={src}
        onPlay={e => console.log("onPlay")}
        showJumpControls={false}
        layout={"horizontal"}
        customAdditionalControls={[]}
        customVolumeControls={[]}
    />;
}

export const RecordingFeedbackScreen = ({onSend}) => {

    const locationLatLng = useStore((state) => state.locationLatLng)
    const recordingBlob = useStore((state) => state.recordingBlob)

    const recordingStarted = useStore((state) => state.recordingStarted)
    const feedback = JSON.stringify(useStore((state) => state.feedback),)

    console.log({recordingBlob, locationLatLng, recordingStarted})

    return (
        <BackgroundContainer>
            <HeaderNav>
                <Back/>
                <MainTitle/>
            </HeaderNav>
            <PageContainer className={"h-full flex"}>


                <div className={"flex flex-1 flex-row my-auto"} style={{marginRight: "auto", marginLeft: "auto"}}>
                    <div>
                        <img src={"/dc.png"} width={"90px"} height={"90px"} style={{minWidth: "90px", width: 90, height: 90}}/>
                    </div>
                    <div className={"relative"}>
                        <img src={"/WavVector.svg"} height={"70px"} className={""}/>
                        <AudioPlayer blob={recordingBlob} autoplay={false}/>
                        {/*className={"absolute"}*/}
                    </div>
                </div>

                <ContainerBottom>
                    <ButtonPrimary onClick={onSend}>
                        SEND OBSERVATION
                    </ButtonPrimary>
                </ContainerBottom>
            </PageContainer>

        </BackgroundContainer>
    )
}


