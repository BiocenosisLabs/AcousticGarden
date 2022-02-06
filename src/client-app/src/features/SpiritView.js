import React, {useState} from "react";
import {ExampleInsta, MedContainer} from "./ui";

const Nav = ({setNav}) => (
    <div>
        <button onClick={() => setNav('stream')}> Spirit Stream </button>
        <button onClick={() => setNav('map')}> Map </button>
    </div>
)

export const SpiritContainer = () => {

    const [view, setNav] = useState('stream');
    const [spirits, setSpirits] = useState([]);


    return (<MedContainer>
        <div className={"prose prose-invert "}>
            {view === 'stream' && (<SpiritStream />)}
            {view === 'map' && (<SpiritMap />)}
            <Nav setNav />
        </div>
    </MedContainer>)
}

const SpiritMap = () => {


    return <div className={"flex max-w-device-md"}>
        dfg
    </div>
}

const SpiritStream = () => {

    const [spirits, setSpirits] = useState([]);

    // getSpirits({lat:1,long:2}).then((s) => setSpirits(s))

    return <div className={"flex max-w-device-md"}>
        <ExampleInsta />
    </div>
}

