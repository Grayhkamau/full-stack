import { useState } from "react"
import Buttons from "./buttons";
import Statistics from "./statistics";

const App = ()=>{

    const [good,setGood]  = useState(0);
    const [neutral,setNeutral]  = useState(0);
    const [bad,setBad] = useState(0);

    const handleGoodClick = ()=> setGood(good+1)
    const handleNeutralClick = ()=> setNeutral(neutral+1)
    const handleBadClick = ()=> setBad(bad+1)


    return(
        <div>
            <h1>give Feedback</h1>

            <Buttons text={"good"} onClick={handleGoodClick}/>
            <Buttons text={"neutral"} onClick={handleNeutralClick}/>
            <Buttons text={"bad"} onClick={handleBadClick}/>

            <h1>Statistics</h1>
            <Statistics feedback={"good"} clicks={good}/>
            <Statistics feedback={"neutral"} clicks={neutral}/>
            <Statistics feedback={"bad"} clicks={bad}/>

        </div>
    )
}

export default App 