import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//this file contains 3 react components Square, Board and Game
//Square renders a button
function Square(props) {
    // 3 change square render method to show a value
    // TODO 7 add constructor to class to initialize the state so can "remember" the "click"
    //TODO 8 constructor deleted because not used but used in board
    /*constructor(props) {
        //always call super when defining the constructor of a subclass
        // all react components classes that have a constructor have to start with super(prop) call
        super(props);
        this.state = {
            value: null,
        };
    }*/
        return (
                // TODO 6 making an interactive component
                // 6.1 fill the squared component with X on click
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
            // 4 if i check the app now the values are displayed in the squares
            // 5 passed a prop from parent Board component to children
    );
}
//Board renders 9 squares
//The Board component can tell each Square what to display by passing a prop
// just like we did when we passed a number to each Square.
class Board extends React.Component {
    //add constructor to declare the shared state and allow communication between parent (board)
    // and its children square
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //Each time a player moves, xIsNext (a boolean) will be flipped
            // to determine which player goes next and the game’s state will be saved.
            // We’ll update the Board’s handleClick function to flip the value of xIsNext:
            xIsNext: true,

        };
        // when we fill the board later this.state.square array will look similar to this
        //[
        //   'O', null, 'X',
        //   'X', 'X', 'O',
        //   'O', null, null,
        // ]
    }
    //add handle click
    handleClick(i){
        // slice create a copy of the squares array to modify instead of modifying the existing array
        // either mutate or replace data
        // replace data is generally better
        const squares = this.state.squares.slice();
        //return early by ignoring a click if someone has won the game or if a Square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    //render square method
    renderSquare(i) {
        // TODO 1 passing a prop named value to square component
        // 2 now go to square render method and modify
        // instruct each individual Square about its current value prop('X', 'O', or null)
        return (
            <Square value={this.state.squares[i]}
        //state is private so need to call the function when square is clicked
        onClick={() => this.handleClick(i)}
        />
    );
    }

    render() {
        //calculate the winner
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            //display which player has the next turn
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
    </div>
        <div className="board-row">
            {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
    </div>
        <div className="board-row">
            {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
    </div>
        </div>
    );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
            </div>
    );
    }
}
//helper function to calculate the winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render(
<Game />,
    document.getElementById('root')
);
