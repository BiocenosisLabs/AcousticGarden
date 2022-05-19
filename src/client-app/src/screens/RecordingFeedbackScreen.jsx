import React, {useEffect, useMemo} from 'react'

import styled from 'styled-components'
import {
    Back,
    BackgroundContainer,
    ButtonPrimary,
    ContainerBottom,
    HeaderNav,
    LinePrimary, MainTitle,
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

function useObjectUrl (blob) {
    const url = useMemo(() => URL.createObjectURL(blob), [blob]);
    useEffect(() => () => URL.revokeObjectURL(url), [blob]);
    return url;
}

// Use the hook and render the audio element
function AudioPlayer ({blob}) {
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

    console.log({recordingBlob,locationLatLng,recordingStarted})

    return (
        <BackgroundContainer>
            <HeaderNav>
                <Back />
                <MainTitle />
            </HeaderNav>
            <PageContainer className={"h-full flex"}>

            <div className={"flex flex-row"}>         <Text>Your observation</Text>
                    <LinePrimary/></div>

                    <ObservationsArea>
                        <Observation>
                            <ObservationVis>

                            </ObservationVis>
                            <ObservationBottom>

                                <TextContainer>
                                    <Container1>
                                        <Text1>
                                            <Text2>
                                                Lat, Lon:
                                                <span

                                                />
                                            </Text2>
                                            <Text3>{`${locationLatLng.latitude},${locationLatLng.longitude}`}</Text3>
                                        </Text1>
                                    </Container1>
                                    <Container2>
                                        <Text4>
                                            <Text5>
                                                Date Time:
                                                <span

                                                />
                                            </Text5>
                                            <Text6>20/05/22 16:42</Text6>
                                        </Text4>
                                    </Container2>

                                </TextContainer>


                            </ObservationBottom>                                <AudioPlayer blob={recordingBlob}  />

                            <pre className={"prose prose-invert "}>
                                        {feedback}
                                    </pre>
                            <UploadingBar>

                            </UploadingBar>
                        </Observation>
                    </ObservationsArea>

                    <ContainerBottom>
                        <ButtonPrimary onClick={onSend}>
                            <Text7>SEND OBSERVATION</Text7>
                        </ButtonPrimary>
                    </ContainerBottom>
            </PageContainer>
        </BackgroundContainer>
    )
}





const YourObservation = styled('div')({
    position: 'absolute',
    left: '8px',
    top: '135px',
    width: '562px',
    height: '30.59375px',
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        flex: '0',
        width: '100%',
        height: '100%',
        position: 'static',
        'flex-direction': 'row',
        'margin-bottom': TOKENS.DlSpaceSpaceThreeunits,
    },
})

const Text = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '700px',
    'font-family': 'Gentium Basic',
    'line-height': '153.72265577316284%',
    'font-size': '20px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    position: 'absolute',
    top: '126px',
    left: '24px',
    'text-decoration': 'none',
    '@media(max-width: 767px)': {
        left: '0px',
        top: '0px',
        'text-align': 'center',
        position: 'static',
    },
})


const ObservationsArea = styled('div')({
    position: 'absolute',
    left: '24px',
    top: '185px',
    width: '366px',
    height: '232px',
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        position: 'static',
        'justify-content': 'flex-start',
        width: '100%',
        height: 'auto',
        'flex-direction': 'column',
        flex: '1',
    },
})

const Observation = styled('div')({
    'box-sizing': 'border-box',
    width: '366px',
    height: '232px',
    display: 'flex',
    'align-items': 'flex-start',
    'flex-shrink': 1,
    'border-color': 'transparent',
    position: 'absolute',
    top: '185px',
    left: '24px',
    '@media(max-width: 767px)': {
        top: '0px',
        left: '0px',
        position: 'static',
        'flex-direction': 'column',
        'border-width': '3px',
        'border-color': '#3fb667',
        width: '100%',
        'border-radius': '20px',
    },
})

const ObservationVis = styled('div')({
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        width: '100%',
    },
})


const ObservationBottom = styled('div')({
    'box-sizing': 'border-box',
    width: '71px',
    height: '71px',
    display: 'flex',
    'align-items': 'flex-start',
    'flex-shrink': 1,
    'border-color': 'transparent',
    position: 'absolute',
    top: '113px',
    left: '14px',
    '@media(max-width: 767px)': {
        'border-radius': TOKENS.DlRadiusRadiusRound,
        'justify-content': 'flex-start',
        position: 'static',
        flex: '1',
        width: 'auto',
    },
})


const TextContainer = styled('div')({
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        'flex-direction': 'row',
        'justify-content': 'center',
        'align-items': 'flex-start',
        height: 'auto',
        'margin-left': TOKENS.DlSpaceSpaceTwounits,
        'margin-top': TOKENS.DlSpaceSpaceOneandhalfunits,
    },
})

const Container1 = styled('div')({
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        'margin-right': TOKENS.DlSpaceSpaceTwounits,
    },
})

const Text1 = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '700px',
    'font-family': 'Gentium Basic',
    'text-align': 'left',
    'line-height': 'normal',
    'font-size': '12px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    position: 'absolute',
    top: '154px',
    left: '103px',
    'text-decoration': 'none',
    '@media(max-width: 767px)': {
        position: 'static',
    },
})

const Text2 = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '700px',
    'text-align': 'left',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    'text-decoration': 'none',
})

const Text3 = styled('span')({
    color: 'rgba(0, 188, 52, 1)',
    height: 'auto',
    'font-weight': '700px',
    'text-align': 'left',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    'text-decoration': 'none',
})

const Container2 = styled('div')({
    display: 'flex',
    'align-items': 'flex-start',
})

const Text4 = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '700px',
    'font-family': 'Gentium Basic',
    'text-align': 'left',
    'line-height': 'normal',
    'font-size': '12px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    position: 'absolute',
    top: '154px',
    left: '254px',
    'text-decoration': 'none',
    '@media(max-width: 767px)': {
        position: 'static',
    },
})

const Text5 = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '700px',
    'text-align': 'left',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    'text-decoration': 'none',
})

const Text6 = styled('span')({
    color: 'rgba(0, 188, 52, 1)',
    height: 'auto',
    'font-weight': '700px',
    'text-align': 'left',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    'text-decoration': 'none',
})

const UploadingBar = styled('div')({
    display: 'flex',
    'align-items': 'flex-start',
    '@media(max-width: 767px)': {
        'align-self': 'stretch',
        width: '100%',
        flex: '1',
        'justify-content': 'center',
        'flex-direction': 'column',
    },
})

const Image4 = styled('img')({
    'background-color': 'rgba(71, 0, 96, 1)',
    width: '338px',
    height: '9px',
    'border-radius': '7px',
    'border-color': 'transparent',
    position: 'fixed',
    top: '209px',
    left: '14px',
    'object-fit': 'cover',
    '@media(max-width: 767px)': {
        position: 'static',
        'z-index': '100',
    },
})

const Image5 = styled('img')({
    'background-image':
        'linear-gradient(0deg, rgba(0, 138, 96, 1) 0%, rgba(179, 0, 150, 1) 100%)',
    width: '270px',
    height: '9px',
    'border-radius': '7px',
    'border-color': 'transparent',
    position: 'fixed',
    top: '209px',
    left: '14px',
    'object-fit': 'cover',
    '@media(max-width: 767px)': {
        position: 'static',
    },
})

const SendButton = styled('div')({
    'box-sizing': 'border-box',
    'background-image':
        '',
    width: '366px',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '12px 32px',
    'border-radius': '50px',
    'border-color': 'transparent',
    position: 'absolute',
    top: '774px',
    left: '24px',
    '@media(max-width: 767px)': {
        position: 'static',
    },
})

const Text7 = styled('span')({
    color: 'rgba(255, 255, 255, 1)',
    height: 'auto',
    'font-weight': '800px',
    'font-family': 'Spectral',
    'text-align': 'center',
    'line-height': 'normal',
    'font-size': '18px',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'align-self': 'auto',
    'text-decoration': 'none',
})

