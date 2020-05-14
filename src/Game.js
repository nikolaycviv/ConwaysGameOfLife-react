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

  makeCells() {
    let cells = []
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y })
        }
      }
    }

    return cells
  }

  calculateNeighbours(board, x, y) {
    let neighbours = 0
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]
      let y1 = y + dir[0]
      let x1 = x + dir[1]

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbours++
      }
    }

    return neighbours
  }

  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value })
  }

  handleClear = () => {
    this.board = this.makeEmptyBoard()
    this.setState({ cells: this.makeCells() })
  }

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = (Math.random() >= 0.5)
      }
    }

    this.setState({ cells: this.makeCells() })
  }

  startGame = () => {
    this.setState({ isRunning: true })
    this.runGame()
  }

  stopGame = () => {
    this.setState({ isRunning: false })
  }

  runGame() {
    let newBoard = this.makeEmptyBoard()
    this.board = newBoard
    this.setState({ cells: this.makeCells() })
  }

  render() {
    const { cells, interval, isRunning } = this.state
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
          Update every <input value={interval} onChange={this.handleIntervalChange} /> msec
          {isRunning ?
            <button className="button" onClick={this.stopGame}>Stop</button> :
            <button className="button" onClick={this.startGame}>Start</button>
          }
          <button className="button" onClick={this.handleRandom}>Random</button>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    )
  }
}


export default Game
