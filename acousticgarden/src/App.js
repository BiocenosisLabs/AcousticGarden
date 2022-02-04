import './App.css';

import {isMobile} from 'react-device-detect';
import {Encounter} from "./features/Encounter/Encounter";

function App() {



  // request location permissions
  // show your location coordinates
  // upload records with geotag

  // on desktop - redirect to browse, show your local spirits?
  if (isMobile) {
    return <div>
      <Encounter />
    </div>
  }

  return <div> <Encounter /> </div>
}

export default App;

