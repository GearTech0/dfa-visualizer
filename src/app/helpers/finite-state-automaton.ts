/**
 * finite-state-automaton.ts
 * 
 * @author Daquaris Chadwick
 * 
 * Class representation of a functional Deterministic Finite
 * Automaton. 
 * 
 * Reads in characters from source and transitions based off
 * of what character was read.
 */

import { State } from "./state";
import { Transition } from "./transition";


export class FiniteStateAutomaton {
    
    private states: Map<string, State> = new Map<string, State>();    // TODO: Replace with more accurate type
    private alphabet: string;
    private transitions: Transition[] = [];
    private start: State = new State();
    private finalStates: Map<string, State> = new Map<string, State>();

    private current: State = new State();

    /**
     * Translate JSON to DFA
     * @param dfa object to build dfa off of
     */
    constructor (dfa)
    {
        
        // Translate states
        for(let name of dfa.states)
        {

            let newState: State = new State();
            newState.setName(name);

            this.states.set(name, newState);
        }

        // Copy over alphabet
        this.alphabet = dfa.alphabet;

        // Translate transitions
        for(let transition of dfa.transitions)
        {

            // Build new transition from object
            let newTransition: Transition = new Transition();

            newTransition.setEndState(this.states.get(transition.to));
            newTransition.setStartState(this.states.get(transition.from));
            newTransition.setTransitionCharacter(transition.with);

            this.transitions.push(newTransition);
        }

        this.start.setName(dfa.start);
        this.current.setName(dfa.start); 

        // Translate Final States
        for(let name of dfa.finalStates)
        {
            this.finalStates.set(name, this.states.get(name));
        }
    }

    getTransitions() : Transition[] 
    {
        return this.transitions;
    }

    getFinalStates() : Map<string, State>
    {
        return this.finalStates;
    }

    getStates() : Map<string, State>
    {
        return this.states;
    }

    /**
     * Read character into DFA for next transition
     * @param char next character to read
     * @returns information on transition
     */
    read (char: string) : number
    {

        if(!this.alphabet.includes(char))   // This character is not part of the alphabet
        {
            return -1;
        }

        let nextState = this.getNextState(char);

        if(nextState)
        {
            this.current = nextState;
            return 1;
        }

        return 0;
    }

    /**
     * Get the next state for the transition based on the char read
     * @param char character responsible for transition
     */
    getNextState (char: string) : State
    {

        for(let transition of this.transitions)
        {
            if(transition.getStartState().getName() === this.current.getName() && 
                transition.getTransitionCharacter() === char)
            {
                console.log(`${this.current.getName()}, ${char} -> ${transition.getEndState().getName()}`);
                return transition.getEndState();
            }
        }
        return undefined;
    }

    /**
     * Check if the DFA is currently at a final state
     * @returns whether or not the current state is a final state
     * 
     * TODO: Replace with Maps
     */
    isAtFinalState() : boolean 
    {
        return (this.finalStates.get(this.current.getName())) ? true : false;
    }
}
