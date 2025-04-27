import { useState } from "react"
import Buttons from "./components/buttons";

const App = ()=>{

    const [anecdote, setAnecdote] = useState(0);
    const [votes,setVotes] = useState({})
    const [topAnecdote, setTopAnecdote] = useState("");

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



    const changeAnecdote = ()=>{
        setAnecdote(Math.floor(Math.random()*anecdotes.length))
    }
 
    const anecdoteVote = ()=>{
        setVotes({...votes, [anecdote]:!votes[anecdote]?1:votes[anecdote]+1})
        setMostVotesAnecdote({...votes, [anecdote]:!votes[anecdote]?1:votes[anecdote]+1})
    }

    const setMostVotesAnecdote = (updatedVotes)=>{
        let keys = Object.keys(updatedVotes)
        let values = Object.values(updatedVotes);
        console.log(keys)
        console.log(updatedVotes)

        let mostVotted = values[0];

        for (let i = 0; i < values.length; i++) {
            if(mostVotted<values[i]) mostVotted = values[i];
        };

        setTopAnecdote(keys[values.indexOf(mostVotted)]);
    }

 
    return(
        <div>
            <h1>Anecdote of the day</h1>

            <p>{anecdotes[anecdote]}</p>
            <p>has {!votes[anecdote]?'0':votes[anecdote]} votes</p>
            <Buttons text={"vote"} onClick={anecdoteVote}/>

            <Buttons text={"next anecdotes"} onClick={changeAnecdote}/>

            <h1>Anecdote with most votes</h1>
            <p>{topAnecdote?anecdotes[topAnecdote]:''}</p>
           
           
        </div>
    )
}

export default App 