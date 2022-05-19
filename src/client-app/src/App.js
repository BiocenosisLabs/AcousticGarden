// import { Web3Login } from "./features/Web3Login";
// import {AcousticEncounter} from "./features/AcousticEncounter";
// import SpiritAR from "./features/3d/SpiritAR";
// import FeedbackMap from "./features/3d/SpiritMap2";
// import {RecordingFeedbackScreen} from "./screens/RecordingFeedbackScreen";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {EncounterMap, EncounterMapScreen} from "./screens/EncounterMapScreen";
import {useStore} from "./store";
import {RecordingFeedbackScreen} from "./screens/RecordingFeedbackScreen";
import {RecordingInProgressScreen} from "./screens/RecordingInProgressScreen";
import {RecordingManager} from "./features/AcousticEncounter/recording";
import {useState} from "react";
import FeedbackScreen from "./screens/FeedbackScreen";
import {Background} from "./components/components";
import SpiritAR from "./features/3d/SpiritAR";
// import SpiritVoxel from "./features/3d/SpiritVoxel";
import {HomeScreen} from "./screens/HomeScreen";
import {AuthScreen} from "./screens/AuthScreen";
import {getFeedback, uploadRecording} from "./features/api";
import BrowseAreaScreen from "./screens/BrowseAreaScreen";


const AuthFirst = ({children}) => {
    const isAuthed = useStore((state) => state.isAuthed)()
    return isAuthed ? children : <Navigate to="/home" replace/>;
};

function App() {


    const navigate = useNavigate();

    // Recordings
    const [recordingManager, setRecordingManager] = useState(null)

    const recordingLimit = 10 * 1000
    const recordingUpdate = useStore((state) => state.recordingUpdate)
    const recordingFinished = useStore((state) => state.recordingFinished)

    const username = useStore((state) => state.username)
    const userID = useStore((state) => state.userID)
    const locationLatLng = useStore((state) => state.locationLatLng)

    const addRecordingId = useStore((state) => state.addRecordingId)
    const setFeedback = useStore((state) => state.setFeedback)


    const handleRecordPressed = async () => {

        const recordingManager = new RecordingManager({
            limit: recordingLimit,
            onElapsed: recordingUpdate,
            onFinished: handleRecordFinished,
        })
        setRecordingManager(recordingManager)
        await recordingManager.setup()
        recordingManager.start()

        navigate("/recording");
    }

    const handleRecordFinished = async (blob) => {
        recordingFinished(blob)
        setFeedback({})
        setRecordingManager(null)

        navigate('/recorded')



        const ret = await uploadRecording({
            userId:userID,
            latitude: locationLatLng.latitude,
            longitude: locationLatLng.longitude,
            recording:blob,
        })
        // set uploaded

        console.log({ret})

        // Add to local state store
        const recordingId = ret.data[0].id
        addRecordingId(recordingId)


        const feedback = await getFeedback({recordingId, userID})
        setFeedback(feedback)
        console.log({feedback})

        //set proccessed
    }

    const handleRecordStop = () => {
        recordingManager.stop()
    }

    const handleRecordingSend = () => {

        // upload the recording blob (if not doing so already)
        // request the feedback if it's not already returned
        navigate('/feedback')
    }

    const homeActions = {
        onClickBrowse: () => navigate('/browse'),
        onClickInfo: () => navigate('/info'),
        onClickMyData: () => navigate('/mydata'),
        onClickPlay: () => navigate('/play'),
    }


    {/*<Web3Login />*/
    }

    return <Background>
        <Routes>

            {/*<Route*/}
            {/*    path={"/spiritselfie"}*/}
            {/*    element={() => <SpiritAR/>}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path={"/feedbackmap"}*/}
            {/*    element={() => }*/}
            {/*/>*/}

            {/*<Route*/}
            {/*    path={"/feedback"}*/}
            {/*    element={() => <RecordingFeedbackScreen/>}*/}
            {/*/>*/}

            {/*<Route*/}
            {/*    path="/"*/}
            {/*    element={*/}
            {/*        <div>*/}
            {/*            <AcousticEncounter />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*/>*/}

            <Route
                path={"/"}
                element={<HomeScreen {...homeActions} />}
            />

            {/*<Route*/}
            {/*    path={"/browse"}*/}
            {/*    element={<Browse*/}
            {/*
                {/*    />}*/}
            {/*/>*/}

            <Route
                path={"/play"}
                element={
                    <AuthFirst>
                        <EncounterMapScreen
                            onRecordPress={handleRecordPressed}
                        />
                    </AuthFirst>
                }
            />
            <Route
                path={"/auth"}
                element={
                        <AuthScreen
                            onAuth={() => navigate('/play')}
                        />
                }
            />

            <Route
                path={"/recording"}
                element={
                    <AuthFirst>
                        <RecordingInProgressScreen
                            onStop={handleRecordStop}
                            recordingLimit={recordingLimit}
                        />
                    </AuthFirst>
                }
            />

            <Route
                path={"/recorded"}
                element={
                    <AuthFirst>
                        <RecordingFeedbackScreen
                            onSend={handleRecordingSend}
                        />
                    </AuthFirst>}
            />

            <Route
                path={"/feedback"}
                element={<FeedbackScreen
                    onSnap={() => navigate('/snapshot')}
                />}
            />

            <Route
                path={"/snapshot"}
                element={<SpiritAR
                />}
            />

            <Route
                path={"/browse"}
                element={<BrowseAreaScreen
                />}
            />

            {/*<Route*/}
            {/*    path={"/snapshotVoxel"}*/}
            {/*    element={<SpiritVoxel*/}
            {/*    />}*/}
            {/*/>*/}

            <Route path="*" element={<HomeScreen {...homeActions}/>}/>

        </Routes>
    </Background>
}


export default App;

