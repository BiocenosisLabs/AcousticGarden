import React, {useState} from "react";
import {MedContainer} from "../ui";
import {TestMapApp} from "../Encounter/TestMapApp";

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

const ExampleInsta = () => {
    return (
        <div className="feeds">
            <div className="feed-wrapper mb-4">
                <div className="feed-item border border-gray-400 rounded bg-white">
                    <div className="header border-b p-4 flex justify-between items-center">
                        <div className="left flex flex-row items-center">
                            <div className="user-img h-10 w-10 border rounded-full overflow-hidden mr-4">
                                <img alt="nike's profile picture" className="_6q-tv" data-testid="user-avatar" draggable="false" src="https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-19/s150x150/20635165_1942203892713915_5464937638928580608_a.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_ohc=JK-0WwYKXBgAX-mFP6I&oh=e0d86b1c4be3cea94e341f18e17905b3&oe=5F94C764" />
                            </div>
                            <div className="user-name-and-place flex flex-col">
                                <span className="text-sm font-bold">apple</span>
                                <span className="text-xs font-light text-gray-900">Chiapas, Mexico</span>
                            </div>
                        </div>
                        <div className="right">
                        </div>
                    </div>
                    <div className="feed-img h-1/6">
                        <img src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                    </div>
                    <div className="card-footer p-4">
                        <div className="top">
                            <div className="icons flex flex-row justify-between items-center">
                                <div className="left flex flex-row">
                                    <div className="like mr-4">

                                    </div>
                                    <div className="comment mr-4">

                                    </div>
                                    <div className="share">

                                    </div>
                                </div>
                                <div className="right">
                                    <div className="save">

                                    </div>
                                </div>
                            </div>
                            <div className="likes mt-1">
										<span className="font-bold text-sm">
											122,780 likes
										</span>
                            </div>
                            <div className="caption text-sm mt-3">
                                <b>apple </b>
                                new Iphone release ✨
                            </div>
                            <div className="post-date mt-1">
										<span className="text-xs text-gray-900">
											1 minute ago
										</span>
                            </div>
                        </div>
                        <div className="bottom border-t pt-3 mt-3">
                            <div className="wrapper flex">
                                <input type="text" className="text-sm h-10 w-full outline-none focus:outline-none w-10/12" placeholder="Add a comment" />
                                    <button className="text-blue-500 opacity-75 w-2/12 text-right font-bold">
                                        post
                                    </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
