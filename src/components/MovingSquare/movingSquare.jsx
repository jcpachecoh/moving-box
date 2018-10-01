import * as React from 'react'
import PropTypes from 'prop-types'
import './movingSquare.css'

export class MovingSquare extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      positionX: 0,
      positionY: 0,
      coordinateX: 0,
      coordinateY: 0
    }
  }
  componentDidMount () {
    const { squareHeight, squareWidth } = this.props
    this.drawRect(
      this.state.positionX,
      this.state.positionY,
      squareWidth,
      squareHeight
    ) // Drawing rectangle on initial load
    this.movingAction = this.movingAction.bind(this)
    this.moveToLeft = this.moveToLeft.bind(this)
    this.moveToRight = this.moveToRight.bind(this)

    window.addEventListener('keydown', this.movingAction)
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.canvasHeight === this.props.canvasHeight || nextProps.canvasWidth === this.props.canvasWidth) return //validte if the canvasheight or canvaswidth didn't change

    const { squareWidth, squareHeight, canvasHeight, canvasWidth } = this.props
    this.setState({
      positionX: 0,
      positionY: 0,
      coordinateX: 0,
      coordinateY: 0
    })
    const ctx = this.refs.canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    const { positionX, positionY } = this.state
    this.drawRect(positionX, positionY, squareWidth, squareHeight)
  }

  drawRect (x, y, w, h) {
    const ctx = this.refs.canvas.getContext('2d')
    ctx.fillStyle = this.props.color
    ctx.fillRect(x, y, w, h)
  }
  moveToLeft () {
    const x = this.state.positionX <= 0 ? 0 : this.state.positionX - 10

    this.setState({
      positionX: x,
      coordinateX: x + 20
    })
  }
  moveToRight () {
    const x = this.state.positionX + 10

    this.setState({
      positionX: x,
      coordinateX: x === 0 ? x + 10 : x + 20 // validating inital state to move the coodinates, when initial state is 0 put 10px ahead if not put 20 ahead
    })
  }
  moveToUp () {
    const y = this.state.positionY <= 0 ? 0 : this.state.positionY - 10
    this.setState({
      positionY: y,
      coordinateY: y - 20
    })
  }
  moveToDown () {
    const y = this.state.positionY + 10
    this.setState({
      positionY: y,
      coordinateY: y - 20
    })
  }

  movingAction (event) {
    const { canvasWidth, canvasHeight, squareWidth, squareHeight } = this.props

    var keyPr = event.keyCode // Key code of key pressed

    if (keyPr === 39 && this.state.positionX <= canvasWidth - 30) {
      this.moveToRight()
    } else if (keyPr === 37) {
      this.moveToLeft()
    } else if (keyPr === 38) {
      this.moveToUp()
    } else if (keyPr === 40 && this.state.positionY <= canvasHeight - 30) {
      this.moveToDown()
    }

    const ctx = this.refs.canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // validating new state to draw new square
    const { positionX, positionY } = this.state
    // Drawing rectangle at new position
    this.drawRect(positionX, positionY, squareWidth, squareHeight)
  }

  render () {
    const { positionX, positionY, coordinateX, coordinateY } = this.state,
      { canvasWidth, canvasHeight } = this.props
    return (
      <div className='square__canvas'>

        <canvas ref='canvas' width={canvasWidth} height={canvasHeight} />
        <div
          className='square__coordinates'
          style={{
            left: coordinateX,
            top: coordinateY
          }}
        >
          <span>( {positionX} , {positionY} )</span>
        </div>
      </div>
    )
  }
}

MovingSquare.propTypes = {
  squareWidth: PropTypes.number,
  squareHeight: PropTypes.number,
  color: PropTypes.string,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number
}
