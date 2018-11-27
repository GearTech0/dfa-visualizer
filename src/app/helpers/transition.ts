/**
 * transition.ts
 * 
 * @author Daquaris Chadwick
 * 
 * transition representation as class.
 */

import { State } from "./state";

export class Transition {

    private startState: State;
    private endState: State;
    private transitionCharacter: string;

    private transition: Map<string, State>; // TODO: Use this map to get transitions faster

    getStartState () : State 
    {
        return this.startState;
    }

    getEndState () : State
    {
        return this.endState;
    }

    getTransitionCharacter () : string
    {
        return this.transitionCharacter;
    }


    setStartState (start: State) : void
    {
        this.startState = start;
    }

    setEndState (end: State) : void 
    {
        this.endState = end;
    }

    setTransitionCharacter (char: string) : void 
    {
        this.transitionCharacter = char;
    }

    drawTransition (context: CanvasRenderingContext2D) : void 
    {
        context.beginPath();

        // Get Distance between two states
        let distance = Math.sqrt(
            Math.pow(this.startState.getX()-this.endState.getX(), 2) 
            + Math.pow(this.startState.getY() - this.endState.getY(), 2));

        let direction = this.determineDirection(this.startState, this.endState);
        if(direction === -1) // Left
        {
            // TODO: set radius based on positition to get angled curves
            context.arc(this.startState.getX() + 100, this.startState.getY() - 50, distance/2, 0, Math.PI, true);
        
            // TODO: draw transition character
            context.fillStyle = "black";
            context.font = "15px Arial";
            context.fillText(this.getTransitionCharacter(), this.startState.getX() + 100, this.startState.getY() - (100 + 15));
        } 
        else if(direction === 1) // right
        {
            // TODO: set radius based on positition to get angled curves
            context.arc(this.startState.getX() - 100, this.startState.getY() + 50, distance/2, 0, Math.PI, false);
        
            // TODO: draw transition character
            context.fillStyle = "black";
            context.font = "15px Arial";
            context.fillText(this.getTransitionCharacter(), this.startState.getX() - 100, this.startState.getY() + (100 + 15));
        }
        else if(direction === 0) // center; same state
        {
            // TODO: set radius based on positition to get angled curves
            context.arc(this.startState.getX(), this.startState.getY() + 15, 50, 0, Math.PI, false);

            // TODO: draw transition character
            context.fillStyle = "black";
            context.font = "15px Arial";
            context.fillText(this.getTransitionCharacter(), this.startState.getX() + 20, this.startState.getY() + 50 + 25);
        }
        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();
    }

    // TODO: Move this in separate class
    determineDirection (start: State, end: State) : number 
    {
        return Math.sign(start.getX() - end.getX());
    }
}
