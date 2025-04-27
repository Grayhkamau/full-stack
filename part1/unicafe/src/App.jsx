import { useState } from "react"
import Buttons from "./buttons";
import Statistics from "./statistics";

const App = ()=>{

    const [good,setGood]  = useState(0);
    const [neutral,setNeutral]  = useState(0);
    const [bad,setBad] = useState(0);
    const [average,setAverage] = useState(0);
    const [all,setAll] = useState(0)
    const [positive, setPositive] = useState(0);

    const handleGoodClick = ()=> {
        setGood(good+1)
        setAll(all+1)
        setAverage(((good+1)-bad)/(all+1))
        setPositive(((good+1)/(all+1))*100)
    }
    const handleNeutralClick = ()=> {
        setNeutral(neutral+1)
        setAll(all+1)
        setAverage((good-bad)/(all+1))
        setPositive((good/(all+1))*100)
    }
    const handleBadClick = ()=> {
        setBad(bad+1)
        setAll(all+1)
        setAverage((good-(bad+1))/(all+1))
        setPositive((good/(all+1))*100)

    }
 

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
            <Statistics feedback={"all"} clicks={all}/>
            <Statistics feedback={"average"} clicks={average}/>
            <Statistics feedback={"positive"} clicks={positive}/>

        </div>
    )
}

export default App 