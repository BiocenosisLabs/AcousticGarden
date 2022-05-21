import styled from 'styled-components'
import React from 'react'

import MainTitleSrc from "../components/Main Title.svg"
import BackgroundBubbleSrc from "../components/Backgroundbubble.svg"
import RecordButtonSrc from "../components/RecordButton.svg"
import {useNavigate} from "react-router-dom";
import {Backward} from "framework7-icons/react";

export const MainTitleImage = () => <img alt="Main title" src={MainTitleSrc} />
export const Center = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  fill: #3FB667;
  margin: auto auto;
  flex: 1;
`


export const MainTitleContainer = Center

export const BackgroundBubble = styled('div')`
    background-image: url(${BackgroundBubbleSrc});
  background-repeat: no-repeat;
  background-position: center;
`
// export const BackgroundBubble = () => <img alt="bg" src={BackgroundBubbleSrc} />
export const RecordButton = (props) => <img alt="Record" src={RecordButtonSrc} {...props} />



export const MainTitle = () => <MainTitleContainer>
    <MainTitleImage/>
</MainTitleContainer>

export const temp = styled('div')`

`



export const LinePrimary = styled('div')`
 //width: 300px;
  width: 100px;
  border-bottom: solid green;
  height: 50%;
`

// export const Background = styled('div')`
//   background: linear-gradient(180deg, rgba(39, 0, 63, 1) 0%, rgba(30, 0, 22, 1) 100%);
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -1;
//   //max-width: 800px;
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   align-content: center;
//   margin: auto auto;
// `

export const ScreenContainer = styled('div')`
  padding: 20px;
`

export const Background = ({children}) => <>({children})</>
export const BackgroundContainer = ({children}) => <>({children})</>
    // <Background>
        {/*<ScreenContainer>*/}

        {/*</ScreenContainer>*/}
    // </Background>

export const HeaderNav = styled('div')`
  padding: 20px;
  padding-top:10px;
  display: flex;
  fill: #3FB667;
`
export const Back = () => {

    const navigate = useNavigate()
    return  <div className={"mr-2"}>
        <Backward style={{fill: "#3FB667", rightMargin:"2em"}} width={"2em"} height={"2em"} onClick={() => navigate('/')}/>
    </div>
}

export const FrostedCard = styled('div')`
  background: rgba(63, 182, 103, 0.68);
  box-shadow: 0px 20px 40px rgba(238, 60, 137, 0.15);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 19px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-items: center;
`


export const PageContainer = styled('div')`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ContainerBottom = styled('div')`
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  flex: 1;
  align-items: center;
  display: flex;
;
`
export const Flex = styled('div')`
    flex: 1;
`
export const CenterBox = styled('div')`
  display:flex;
  flex: 1;
  justify-content: center;
`

export const RoundedCard = styled('div')`

  background: rgba(63, 182, 103, 0.68);
  box-shadow: 0px 20px 40px rgba(238, 60, 137, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 44px;

  padding: 20px;
  width: 100%;
`


export const GradientButtonLong = styled('button')`
  margin-top:20px;
 
  
  background: ${props => props.disabled ? "linear-gradient(227deg, rgba(72, 161, 113, 0.3) 0%, rgba(133, 20, 182, 0.3) 100%)": "linear-gradient(227deg, rgba(72, 161, 113, 1) 0%, rgba(133, 20, 182, 1) 100%)"};
  padding: 12px 32px;
  border-radius: 50px;
  border-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
  text-align: center;
  font-size: x-large;
`

export const MarginDefault = styled('div')`
    margin: 20px
`

export const ButtonPrimary = styled(GradientButtonLong)`

`
export const HeaderTitle = MainTitleImage;


// () => <span className={"prose text-4xl prose-invert"}>
 //                       Acoustic Gardens
  //                  </span>

//
// export const ButtonPrimary = (props) => (
//     <button {...props} className={"bg-white text-black text-xl p-2 m-0.5"}>{props.children}</button>
// )


export const Fab = () => <div className={"fixed left-1/2 bottom-4 transform -translate-x-1/2 z-20"} />


