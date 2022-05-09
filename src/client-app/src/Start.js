
import {isMobile} from 'react-device-detect';
import { SmallContainer} from "./features/ui";
import { Web3Login } from "./features/Web3Login";
import {AcousticEncounter} from "./features/AcousticEncounter";
import {SpiritMap} from "./features/3d/SpiritMap";



function Start() {


  // request location permissions
  // show your location coordinates
  // upload records with geotag

  // on desktop - redirect to browse, show your local spirits?


  if (window.location.href.includes('/demo2')) {
    return (<SpiritMap/>)
  }

  return <>
    {/*<Web3Login />*/}
    <AcousticEncounter/>
  </>

}


export default Start;

