import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


function Landing(props) {
    return (
        <div className="">
            <form action="#" method="GET" className="flex items-center">
                <input
                    className="border border-black px-3 py-1 rounded-l-2xl"
                    type="text" name="repo" id="repo"
                />
                <button
                    className="border border-black rounded-r-2xl border-collapse"
                    type="submit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
                    </svg>
                </button>
            </form>
        </div>
    )
}


function Dashboard(props) {
    const data = [{ name: 'Page A', uv: 400 }, { name: 'Page B', uv: 300 }];

    return (
        <div>
            <LineChart width={400} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </div>
    )
}


function Content(props) {
    return (
        <div className="grow-1 flex flex-col items-center justify-center">
            <Dashboard />
        </div>
    )
}



export default Content