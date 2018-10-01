import React, { Component } from 'react'
import './SquareContainer.css'
import { MovingSquare } from '../MovingSquare/movingSquare'

class SquareContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canvasWidth: 700,
      canvasHeight: 800
    }
    this.updateCanvasDimensions = this.updateCanvasDimensions.bind(this)
  }
  componentDidMount () {
    this.updateCanvasDimensions();
    window.addEventListener('resize', this.updateCanvasDimensions)
  }

  updateCanvasDimensions() {
    this.setState({
      canvasWidth: document.getElementById('square--container').offsetWidth,
      canvasHeight: document.getElementById('square--container').offsetHeight
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  compoe
  render () {
    const { canvasHeight, canvasWidth } = this.state
    return (
      <div className='moving-square-app'>
        <div className='square square--container' id='square--container'>
          <MovingSquare
            squareWidth={10}
            squareHeight={10}
            color={'#EB4769'}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
          <div className='x__axis'>
            <span>x-axis</span>
          </div>
          <div className='y__axis'>
            <span>y-axis</span>
          </div>
        </div>
      </div>
    )
  }
}

export default SquareContainer
