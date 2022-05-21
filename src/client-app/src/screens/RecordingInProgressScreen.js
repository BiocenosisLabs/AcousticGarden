import {useStore} from "../store";
import styled from 'styled-components'

import {
    Back,
    BackgroundBubble,
    BackgroundContainer,
    CenterBox,
    HeaderNav,
    MainTitle,
    PageContainer
} from "../components/components";

export function RecordingInProgressScreen({onStop,recordingLimit}) {

    const elapsed = useStore((state) => state.recordingElapsed)

   return <BackgroundContainer>
       <HeaderNav>
           <Back />
           <MainTitle />
       </HeaderNav>
       <PageContainer>
               <CenterBox className={"h-max flex-1"}>
                   <BackgroundBubble className={"w-full h-96 prose prose-h1 prose-invert prose-2xl opacity-40 flex flex-1 justify-center align-middle content-center"}>
                       <Timer limit={recordingLimit} elapsed={elapsed ?? 0}/>
                   </BackgroundBubble>
               </CenterBox>
       </PageContainer>
   </BackgroundContainer>
}



const Timer = ({limit, elapsed}) => {
    const secs = `${Math.round((limit - elapsed) / 1000)}`
    const secsString = secs.padStart(2, "0")
    return (<StyledTimer>
        <div className={"prose prose-invert prose-lg"}>                       Recording
        </div>

        <div>
        -00:{secsString}</div>
    </StyledTimer>)
}

const StyledTimer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: xxx-large;
  font-weight: bold;
`
