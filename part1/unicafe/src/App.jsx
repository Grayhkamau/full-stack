import { useState } from "react"
import Buttons from "./buttons";
import StatisticsLine from "./statistics";

const App = ()=>{

    const [good,setGood]  = useState(0);
    const [neutral,setNeutral]  = useState(0);
    const [bad,setBad] = useState(0);
    const [average,setAverage] = useState(0);
    const [all,setAll] = useState(0)
    const [positive, setPositive] = useState(0);
    const [anecdote, setAnecdote] = useState(0);
    const anecdotes = [
        'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
    ];


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
    const changeAnecdote = ()=>{
        setAnecdote(Math.floor(Math.random()*anecdotes.length))
    }

    return(
        <div>
            <p>{anecdotes[anecdote]}</p>
            <Buttons text={"next anecdotes"} onClick={changeAnecdote}/>

            <h1>give Feedback</h1>

            <Buttons text={"good"} onClick={handleGoodClick}/>
            <Buttons text={"neutral"} onClick={handleNeutralClick}/>
            <Buttons text={"bad"} onClick={handleBadClick}/>

            <h1>Statistics</h1>

            {!all?<h4>No feedback given</h4>:
                <>

                    <StatisticsLine text={"good"} value={good}/>
                    <StatisticsLine text={"neutral"} value={neutral}/>
                    <StatisticsLine text={"bad"} value={bad}/>
                    <StatisticsLine text={"all"} value={all}/>
                    <StatisticsLine text={"average"} value={average}/>
                    <StatisticsLine text={"positive"} value={positive}/>
                </>
            }

        </div>
    )
}

export default App 