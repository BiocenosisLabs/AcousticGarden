import {
    ContainerBottom,
    FrostedCard,
    HeaderNav,
    HeaderTitle,
    ButtonPrimary, MainTitle, Center, RecordButton, Back
} from "../components/components";
import {EncounterMap} from "../features/AcousticEncounter/EncounterMap";
import {useStore} from "../store";
import {AskPermissions} from "./AskPermissions";
import {useState, memo, useRef} from "react";


export const EncounterMapScreen = ({onRecordPress}) => {

    const locationLatLng = useStore((state) => state.locationLatLng)
    const hasPermissions = useStore((state) => state.hasPermissions())

    console.log({hasPermissions, locationLatLng})

    return (<>
        <HeaderNav>
            <Back />
            <MainTitle />
        </HeaderNav>


        { !hasPermissions && ( <AskPermissions/> )}


        { hasPermissions && ( (
            <>
                <EncounterMap location={locationLatLng}/>
                {/*-translate-y-1/3*/}
                <div className={"ml-10 mr-10"}>
                    <FrostedCard className={"prose text-xl prose-invert"}>
                        Navigate to an area of ecological activity and record sound </FrostedCard>
                </div>
                {/*<RecordController key={"rc"} />*/}

                <ContainerBottom>
                    <Center>
                        <RecordButton
                            width={"200px"}
                            alt={"record"}
                            onClick={onRecordPress}
                        />
                    </Center>

                </ContainerBottom>


            </>
        ) )}

    </>)
}



export const RecordController = memo(() => {

    const [ready, setReady] = useState(false);

    const [record, setRecord] = useState(false);

    const recordingStart = () => {
        if (record) {
            // continue
        } else {
            console.log("Start Recording from flip")
            setRecord(true)
            navigator.vibrate([50,100,50] );
        }

    }
    const recordingStop = () => {
        if (!record) {
            // continue
        } else {
            console.log("Stop Recording from flip")

            setRecord(false)
            navigator.vibrate([200,100,200,]);
        }

    }
    return (
        <>
            {!ready && (
                <ContainerBottom>
                    <ButtonPrimary
                        onClick={() => setReady(true)}>
                        Ready to Record
                    </ButtonPrimary>
                </ContainerBottom>
            )}

            {ready && (
                <FlipGesture onFlipDown={recordingStart} onFlipUp={recordingStop} />
            )}

        </>
    )
},()=>true)



export const FlipGesture = ({onFlipDown,onFlipUp, children}) => {

    // const { flip, requestAccess } = useDeviceOrientation(onFlipUp, onFlipDown);

    const [flip, setFlip] = useState(null);
    const [requested, setRequestsed] = useState(false);

    // Fix for Fixed callbacks
    const stateRef = useRef();
    stateRef.current = flip;

    const requestAccess = () => {
        if (!requested) {
            requestDeviceOrientationUpdates(
                (event) => toggleFlip(event.flip)
            )
            setRequestsed(true)
        }
    }

    const toggleFlip = (f) => {
        if (f === 'up' && stateRef.current !== 'up') {
            setFlip('up')
            onFlipUp()
        } else if (f === 'down' && stateRef.current !== 'down') {
            setFlip('down')
            onFlipDown()
        }
    }

    return <div>
        {!requested && (
            <ButtonPrimary onClick={requestAccess}>req</ButtonPrimary>
        ) }
        {children}
    </div>
}

const requestDeviceOrientationUpdates = async (onDeviceOrientation) => {
    if (!DeviceOrientationEvent) {
        // setError(new Error('Device orientation event is not supported by your browser'));
        return false;
    }

    if (
        DeviceOrientationEvent.requestPermission
        && typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
        let permission;
        try {
            permission = await DeviceOrientationEvent.requestPermission();
        } catch (err) {
            //setError(err);
            return false;
        }
        if (permission !== 'granted') {
            //setError(new Error('Request to access the device orientation was rejected'));
            return false;
        }
    }

    window.addEventListener('deviceorientation',
        (event =>
                onDeviceOrientation({
                    ...event,
                    // Magic numbers from testing that I hope are generic enough
                    flip: (event.beta > 150 || event.beta < -150 ) ? 'down' : 'up',
            })
        ),
    );

    return true;
};
