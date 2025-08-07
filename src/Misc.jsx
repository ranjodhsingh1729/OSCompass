function Button(props) {
 return (
    <button 
        className="border border-black rounded-lg mx-2 px-2 py-1 hover:bg-black hover:text-white"
    >
        {props.children}
    </button>
 )
}

function Image(props) {
    return (
        <img
            className={`inline rounded-xl h-8 w-8`}
            src={props.src}
            alt={props.alt}
        >
        </img>
    )
}

export { Image, Button }