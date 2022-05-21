import {
    BackgroundContainer,
    ButtonPrimary,
    ContainerBottom,
    HomePageFrostedCard,
    HeaderNav, MainTitle,
    PageContainer
} from "../components/components";
import styled from 'styled-components'
import {useStore} from "../store";
import {authUser} from "../features/api";
import {useState} from "react";

export function HomeScreen({onClickInfo, onClickPlay, onClickBrowse,onClickMyData, onAuth}) {

    const [showAuth,setShowAuth] = useState(false)

    const setAuthed = useStore((state) => state.setAuthed)
    const isAuthed = useStore((state) => state.isAuthed())

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

    // const handleLogin = async () => {
    //     // It's a demo
    //     const user = await authUser({username: state.username})
    //     console.log({user})
    //     setAuthed({username: state.username, userID: user.id})
    //     onClickPlay()
    // }


    const handleClickPlay = () => {

        onClickPlay()

        // if (isAuthed) {
        //     onClickPlay()
        // } else {
        //     setShowAuth(true)
        // }
    }



    return <BackgroundContainer>
        <HeaderNav>
            <MainTitle />
        </HeaderNav>
        <PageContainer className={"h-full flex"}>

                <HomePageFrostedCard className={"prose text-xl prose-invert"}>
                <span
                    className={"prose prose-invert prose-lg"}
                >
                   Acoustic gardens is a participatory acoustic sensing app that encourages engagement with wild spaces. Players can record audio snippets from around their ecological community. These uploads contribute to a collective digital avatar: a genius loci representing the spirit of a place.
                </span>
            </HomePageFrostedCard>
        <CenterBox>

            {!showAuth && ( <ButtonPrimary onClick={handleClickPlay} className={"mb-6"}>
                Play
            </ButtonPrimary>)}


            {/*{showAuth && (<div className={"mb-6 flex flex-row justify-center"}>*/}
            {/*    <form className="m-4 flex" >*/}
            {/*        <input*/}
            {/*            className="w-72 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"*/}
            {/*            placeholder="Us3rN4me"*/}
            {/*            value={state.username}*/}
            {/*            onChange={handleChange}*/}
            {/*            id={"username"}*/}
            {/*        />*/}
            {/*        <button*/}
            {/*            onClick={handleLogin}*/}
            {/*            className="px-8 rounded-r-lg bg-purple-800 text-gray-200 font-bold p-4 uppercase border-purple-700 border-t border-b border-r">*/}
            {/*            Enter*/}
            {/*        </button>*/}
            {/*    </form>*/}
            {/*</div>)}*/}

            <ButtonPrimary onClick={onClickBrowse}>
                Browse
            </ButtonPrimary>

            {/*<ButtonPrimary disabled onClick={onClickInfo}>*/}
            {/*    Info*/}
            {/*</ButtonPrimary>*/}

            {/*<ButtonPrimary disabled onClick={onClickMyData}>*/}
            {/*    My Data*/}
            {/*</ButtonPrimary>*/}
        </CenterBox>



        </PageContainer>


            <ContainerBottom>

            </ContainerBottom>


    </BackgroundContainer>
}

export const RoundedCard = styled('div')`

  background: rgba(63, 182, 103, 0.68);
  box-shadow: 0px 20px 40px rgba(238, 60, 137, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 44px;

  padding: 20px;
  width: 100%;
`

export const CenterBox = styled('div')`
  display:flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`
