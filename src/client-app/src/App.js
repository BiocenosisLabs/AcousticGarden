import './App.css';

import {isMobile} from 'react-device-detect';
import {Encounter} from "./features/Encounter/Encounter";
import {MedContainer, SmallContainer} from "./features/ui";
import {SpiritContainer} from "./features/Spirits/SpiritComponents";
import {TestMapApp} from "./features/Encounter/TestMapApp";

function App() {


  // request location permissions
  // show your location coordinates
  // upload records with geotag

  // on desktop - redirect to browse, show your local spirits?
  if (isMobile || window.location.href.includes('/encounter')) {
    return (<SmallContainer>
      <Encounter/>
    </SmallContainer>)
  }
  if (window.location.href.includes('/demo1')) {
    return (<TestMapApp/>)
  }
  return (
      <SpiritContainer/>
  )

}


export default App;

