/**
 * visualizer.component.ts
 * 
 * @author Daquaris Chadwick
 * 
 * methods to visualize a given DFA.
 */

import { Component, OnInit } from '@angular/core';
import { FiniteStateAutomaton } from '../helpers/finite-state-automaton';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  private dfa: FiniteStateAutomaton;
  private canvas: HTMLCanvasElement;

  constructor () 
  { 

  }

  ngOnInit () : void
  {
    let automaton = {
      states: ['q0', 'q1'],
      alphabet: '01',
      transitions: [
        {from: 'q0', to: 'q0', with: '0'},
        {from: 'q0', to: 'q1', with: '1'},
        {from: 'q1', to: 'q1', with: '1'},
        {from: 'q1', to: 'q0', with: '0'}
      ],
      start: 'q0',
      finalStates: ['q1']
    };

    this.dfa = new FiniteStateAutomaton(automaton);

    let partOfLanguage = this.isPartOfLanguage('00001000101110');
    console.log(partOfLanguage);

    this.canvas = document.getElementById('dfa-visualizer-canvas') as HTMLCanvasElement;
    this.createGrid();

    this.drawDFA();
  }

  drawDFA () : void 
  {

    // Draw States
    let offsetx = 100;
    let offsety = 100;
    this.dfa.getStates().forEach((state, key, map) => {
      // check if this state is a final state
      let isFinal = this.dfa.getFinalStates().get(state.getName()) ? true : false;

      state.draw(100 + offsetx, 100 + offsety, 50, this.canvas.getContext('2d'), isFinal);
      
      // Increase Offset
      offsetx += 200;
      if(offsetx >= this.canvas.width)
      {
        offsetx = 0;
        offsety += 200;
      }
    });

    // Draw Transitions
    for(let transition of this.dfa.getTransitions())
    {
      transition.drawTransition(this.canvas.getContext('2d'));
    }
  }

  createGrid () : void 
  {

    let context = this.canvas.getContext('2d');
    let width = this.canvas.clientWidth;
    let height = this.canvas.clientHeight;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height)

    context.strokeStyle = 'lightblue';

    // Draw Grid
    for(let i = 100; i < width; i += 100)
    {
      context.moveTo(i, 0);
      context.lineTo(i, height);
      context.stroke();
    }

    for(let i = 100; i < height; i += 100)
    {
      context.moveTo(0, i);
      context.lineTo(width, i);
      context.stroke();
    }
  }

  /**
   * Checks a string against a DFA to see if its
   * in the language.
   * @param str string to check
   * @returns whether or not the string is in the
   * language
   */
  isPartOfLanguage(str: string) : boolean
  {
    for(let char of str)
    {
      let condition = this.dfa.read(char);

      if(condition !== 1)
      {
        return false;
      }
    }

    return this.dfa.isAtFinalState();
  }

}
