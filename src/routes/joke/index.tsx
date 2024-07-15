import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city"

export const useJokeVoteAction = routeAction$((props) => {
    // Leave it as an exercise for the reader to implement this.
    console.log('VOTE', props);
  });

export const useDadJoke = routeLoader$(async ()=>{
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
        }); 
    return (await response.json()) as {
        id: string;
        status: number;
        joke: string;
    };   
})

export default component$(()=>{
    const dadJokeSignal = useDadJoke()
    const favoriteJokeAction = useJokeVoteAction();

    return (<section class="section bright">
        <p>{dadJokeSignal.value.joke}</p>
        <Form action={favoriteJokeAction}>
            <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
            <button name="vote" value="up">👍</button>
            <button name="vote" value="down">👎</button>
        </Form>
    </section>)
})