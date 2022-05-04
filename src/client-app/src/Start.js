
import {isMobile} from 'react-device-detect';
import { SmallContainer} from "./features/ui";
import { Web3Login } from "./features/Web3Login";
import {EncounterMapWithCanvas} from "./features/AcousticEncounter/EncounterMapWithCanvas";
import {SpiritContainer} from "./features/SpiritView";
import {AcousticEncounter} from "./features/AcousticEncounter";



function Start() {


  // request location permissions
  // show your location coordinates
  // upload records with geotag

  // on desktop - redirect to browse, show your local spirits?
  if (isMobile || window.location.href.includes('/encounter')) {
    return (<SmallContainer>
      <AcousticEncounter/>
    </SmallContainer>)
  }
  if (window.location.href.includes('/demo1')) {
    return (<EncounterMapWithCanvas/>)
  }

  return <SmallContainer>
    <Web3Login />
    <AcousticEncounter/>
  </SmallContainer>

  // return (
  //     <SpiritContainer/>
  // )

}


export default Start;

