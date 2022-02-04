export const WhiteBlockButton = (props) => (
    <button {...props} className={"bg-white text-black text-xl p-2 m-0.5"}>{props.children}</button>
)

export const SmallContainer = (props) => (
    <div className="flex h-screen">
        <div className="m-auto max-w-screen-sm">

            {props.children}

        </div>
    </div>
)
