import {
    BackgroundContainer,
    ButtonPrimary, CenterBox,
    ContainerBottom,
    HeaderNav, MainTitle,
    PageContainer, RoundedCard
} from "../components/components";
import styled from 'styled-components'
import {useStore} from "../store";
import {useState} from "react";
import {authUser} from "../features/api";


export function AuthScreen({onAuth}) {

    const setAuthed = useStore((state) => state.setAuthed)

    const [state , setState] = useState({
        username : "",
        email : "",
        password : ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleLogin = async () => {
        // It's a demo
        let user
        try {
            user = await authUser({username: state.username})
            console.log({user})
        } catch (e) {
            console.log("Error setting use so using test uer")
            user = {username: 'Test User', userID: 1}
        }

        setAuthed({username: state.username, userID: user.id})
        onAuth()
    }


    return <BackgroundContainer>
        <HeaderNav>
            <MainTitle />
        </HeaderNav>
        <PageContainer className={"h-full flex"}>
            <div  >
        <CenterBox>
            <div>
                <div className="m-4 flex" style={{maxWidth: "90vw"}}>
                    <input
                        style={{maxWidth: "60vw"}}
                        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                        placeholder="Us3rN4me"
                        value={state.username}
                        onChange={handleChange}
                        id={"username"}
                    />
                    <div
                        onClick={handleLogin}
                        style={{maxWidth: "30vw"}}
                        className="px-8 rounded-r-lg bg-purple-800 text-gray-200 font-bold p-4 uppercase border-purple-700 border-t border-b border-r">
                        Enter
                    </div>
                </div>
            </div>

        </CenterBox>
        </div>


        </PageContainer>


    </BackgroundContainer>
}

// leave password out for Demo
const UserNamePasswordForm = () => <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Sign In
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
        </a>
    </div>
</form>


