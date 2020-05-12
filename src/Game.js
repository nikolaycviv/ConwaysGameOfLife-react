import React, { Component } from 'react'
import { CELL_SIZE, WIDTH, HEIGHT } from './consts'
import Cells from './Cells'
import './Game.css'

class Game extends Component {

  constructor() {
    super()
    this.rows = HEIGHT / CELL_SIZE
    this.cols = WIDTH / CELL_SIZE

    this.board = this.makeEmptyBoard()
  }

  state = {
    cells: [],
    isRunning: false,
    interval: 100
  }

  makeEmptyBoard() {
    let board = []
    for (let y = 0; y < this.rows; y++) {
      board[y] = []
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false
      }
    }

    return board
  }

  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value })
  }

  handleClear = () => {}
  handleRandom = () => {}

  render() {
    const { cells, interval } = this.state
    return (
      <div>
        <div className="Board"
          style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
        >

          {cells.map(cell => (
            <Cells x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>

        <div className="controls">
          Update every <input value={interval} onChange={this.handleIntervalChange} /> msec
          <button className="button" onClick={this.handleRandom}>Random</button>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    )
  }
}


export default Game
