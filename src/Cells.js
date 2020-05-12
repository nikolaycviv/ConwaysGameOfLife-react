import React, { Component } from 'react'
import { CELL_SIZE } from './consts'


class Cells extends Component {

  render() {
    const { x, y } = this.props
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`
      }} />
    )
  }
}


export default Cells