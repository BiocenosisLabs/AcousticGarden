import {
    BackgroundContainer,
    ButtonPrimary,
    ContainerBottom,
    FrostedCard,
    HeaderNav, MainTitle,
    PageContainer
} from "../components/components";
import styled from 'styled-components'

export function HomeScreen({onClickInfo, onClickPlay, onClickBrowse,onClickMyData}) {
    return <BackgroundContainer>
        <HeaderNav>
            <MainTitle />
        </HeaderNav>
        <PageContainer className={"h-full flex"}>

                <FrostedCard className={"prose text-xl prose-invert"}>
                <span
                    className={"prose prose-invert prose-lg"}
                >
                   Acoustic gardens is a participatory acoustic sensing app that encourages engagement with wild spaces. Players can record audio snippets from around their ecological community. These uploads contribute to a collective digital avatar: a genius loci representing the spirit of a place.
                </span>
            </FrostedCard>
        <CenterBox>

        <ButtonPrimary onClick={onClickPlay} className={"mb-6"}>
            Play
        </ButtonPrimary>
            <ButtonPrimary disabled onClick={onClickInfo}>
                Info
            </ButtonPrimary>

            <ButtonPrimary disabled onClick={onClickBrowse}>
                Browse
            </ButtonPrimary>
            <ButtonPrimary disabled onClick={onClickMyData}>
                My Data
            </ButtonPrimary>
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
