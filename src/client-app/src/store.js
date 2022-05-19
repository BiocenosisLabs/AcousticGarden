import create from "zustand";

export const useStore = create((set, get) => ({


    username: null,
    userID: null,
    email: null,
    isAuthed: () => get().username || get().email,
    setAuthed: ({username, email, userID}) => set(() => ({username, email, userID})),

    locationLatLng: null,
    locationGeoWatchID: null,

    recordingBlob: null,
    recordingElapsed: 0,
    recordingInProgress: false,
    recordingStarted: null,
    recordingUpdate: (ms) => set(() => ({recordingElapsed: ms})),
    recordingFinished: (blob) => set(() => ({recordingBlob: blob})),

    phoneDirection: 'initial', // 'up' or 'down'
    setPhoneDirection: (dir) => set((state) => {
        alert("Setting Phone directon to" + dir)
        return ({phoneDirection: dir});
    }),

    flippedTimes: 0,
    flippedTimesIncr: () => set((state) => ({flippedTimes: state.flippedTimes + 1})),


    recordingId: null,
    recordingIds: [],
    addRecordingId: (recordingId) => set((state) => ({
        recordingId: recordingId,
        recordingIds: [...state.recordingIds, recordingId]
    })),

    feedback: null,
    setFeedback: (feedback) => set(() => ({feedback})),

    mediaStream: true,

    handleAskPermission: async () => {
        setupLocationWatch(set, get)
    },

    hasPermissions: () =>
        get().locationLatLng && get().mediaStream,

}))


const setupLocationWatch = (set, get) => {

    const onSuccessUpdate = (pos) => {
        console.log("Location:", pos)
        return set({locationLatLng: pos?.coords});
    }
    const onErrorWarn = (err) =>
        console.warn('ERROR(' + err.code + '): ' + err.message);
    const opts = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    }

    try {
        navigator.geolocation.getCurrentPosition(
            onSuccessUpdate,
            onErrorWarn,
            opts,
        )

        if (get().locationGeoWatchID) {
            return
        }

        const locationGeoWatchID = navigator.geolocation.watchPosition(
            onSuccessUpdate,
            onErrorWarn,
            opts,
        )
        set({locationGeoWatchID})
    } catch (e) {
        console.warn("Gelocation permissions denied", e)
    }
}

const setupAv = () => {

}
