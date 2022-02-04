import './App.css';

import {isMobile} from 'react-device-detect';
import {Encounter} from "./features/Encounter/Encounter";
import {SmallContainer} from "./features/Encounter/common";

function App() {



  // request location permissions
  // show your location coordinates
  // upload records with geotag

  // on desktop - redirect to browse, show your local spirits?
  if (isMobile) {
    return (<SmallContainer>
      <Encounter />
    </SmallContainer>)
  }

  return (<SmallContainer>
    <Encounter />
  </SmallContainer>)
}

export default App;

