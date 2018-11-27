/**
 * state.ts
 * 
 * @author Daquaris Chadwick
 * 
 * State representation as class.
 */

export class State {

    private name: string;
    
    private x: number;
    private y: number;

    getName () : string 
    {
        return this.name;
    }

    getX() : number 
    {
        return this.x;
    }

    getY() : number
    {
        return this.y;
    }

    
    setName (name : string) : void 
    {
        this.name = name;
    }

    draw (x, y, radius, context: CanvasRenderingContext2D, final: boolean) : void 
    {
        this.x = x;
        this.y = y;

        context.textAlign = "center";
        
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "center";
        context.fillStyle = "black";
        context.font = "18px Arial"
        context.fillText(this.name, x, y, radius * 2);
    }
}
