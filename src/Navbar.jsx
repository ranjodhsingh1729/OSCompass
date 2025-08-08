import {Image, Button} from "./Misc.jsx"

function Navbar(props) {
    return (
        <div className="sticky top-0 left-0 right-0 h-10 flex justify-around items-center py-6">
            <span className="mx-2 flex items-center">
                <Image src="src/assets/logo.jpeg" alt="logo" size={4}></Image>
                <span>OSCompass</span>
            </span>
            <span className="mx-2 flex justify-between items-center">
                <Button>Sign In</Button>
            </span>
        </div>
    )
}

export default Navbar