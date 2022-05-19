import {useStore} from "../store";
import {ButtonPrimary, CenterBox, ContainerBottom, PageContainer, RoundedCard} from "../components/components";

export const AskPermissions = () => {

    const handleAskPermission = useStore((store) => store.handleAskPermission)

    return (
        <>
        <PageContainer className={"h-full flex"}>
        <div  >
            <CenterBox>
                <RoundedCard>
                <span
                    className={"prose prose-invert prose-lg"}
                >
                   Acoustic gardens is a participatory acoustic sensing app that encourages engagement with wild spaces.

                    Your microphone and location permissions will be required for sensing your ecological community.
                </span>
                </RoundedCard>
            </CenterBox>
        </div>
    </PageContainer>


    <ContainerBottom>
        <ButtonPrimary onClick={handleAskPermission}>
            Play
        </ButtonPrimary>
    </ContainerBottom>

        </>)
}
