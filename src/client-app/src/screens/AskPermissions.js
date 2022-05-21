import {useStore} from "../store";
import {ButtonPrimary, CenterBox, ContainerBottom, PageContainer, PermissionsRoundedCard} from "../components/components";

export const AskPermissions = () => {

    const handleAskPermission = useStore((store) => store.handleAskPermission)

    return (
        <>
        <PageContainer className={"h-full flex"}>
        <div  >
            <CenterBox>
                <PermissionsRoundedCard>
                <span
                    className={"prose prose-invert prose-lg"}
                >
                    In order to participate in ecological sensing, we will need to request your microphone and location permissions.
                </span>
                </PermissionsRoundedCard>
            </CenterBox>
        </div>
    </PageContainer>


    <ContainerBottom>
        <ButtonPrimary onClick={handleAskPermission}>
            Continue
        </ButtonPrimary>
    </ContainerBottom>

        </>)
}
