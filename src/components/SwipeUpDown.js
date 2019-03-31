import React, { Component, createRef } from "react"
import { debounce } from 'lodash'

class SwipeUpDown extends Component {
  constructor() {
    super()
    this.state = {
      y0: null,
      dragY: 0,
      locked: false,
      contentHeightOnLock: 0,
      stepOnStart: 0,
      smoothHeight: 0
    }
    this.targetElementRef = createRef()
    this.lock = this.lock.bind(this)
    this.change = this.change.bind(this)
    this.move = this.move.bind(this)
  }

  componentDidMount () {
    let debouncedLock = this.lock
    let debouncedMove = this.move
    let debouncedChange = this.change
    this.targetElementRef.current.addEventListener('mousedown', (e) => {
      e.preventDefault()
      debouncedLock(e)
    })
    this.targetElementRef.current.addEventListener('touchstart', (e) => {
      e.preventDefault()
      debouncedLock(e)
    })
    this.targetElementRef.current.addEventListener('touchmove', (e) => {
      e.preventDefault()
      debouncedMove(e)
    })
    this.targetElementRef.current.addEventListener('mousemove', (e) => {
      e.preventDefault()
      debouncedMove(e)
    })
    this.targetElementRef.current.addEventListener('touchend', (e) => {
      e.preventDefault()
      debouncedChange(e)
    })
    this.targetElementRef.current.addEventListener('mouseup', (e) => {
      e.preventDefault()
      debouncedChange(e)
    })
  }

  lock(e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    this.setState({
      y0: event.clientY,
      locked: true,
      contentHeightOnLock: this.props.contentRef.current.offsetHeight,
      stepOnStart: this.props.step,
      smoothHeight: 0
    })
  }

  change(e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    if (this.state.locked) {
      let dy = event.clientY - this.state.y0

      let movingUp = false
      if (Math.sign(dy) === Math.sign(this.props.steps[0])) movingUp = true
      let treshIndex = movingUp
        ? this.props.step
        : this.props.step - 1
      if (treshIndex < 0) treshIndex = 0
      if (treshIndex >= this.props.steps.length) treshIndex = this.props.steps.length - 1
      let tresh = this.props.steps[treshIndex]
      if (Math.abs(dy) > Math.abs(tresh)) {
        this.props.onSwipeChange(movingUp ? this.state.stepOnStart + 1 : this.state.stepOnStart - 1)
      } else {
        this.props.onSwipeChange(this.state.stepOnStart)
      }

      this.setState({ y0: null, dragY: 0, locked: false })
    }
  }

  move(e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    if (this.state.locked) {
      let dy = event.clientY - this.state.y0

      // let movingUp = false
      // if (Math.sign(dy) === Math.sign(this.props.steps[0])) movingUp = true
      // let treshIndex = movingUp
      //   ? this.props.step
      //   : this.props.step - 1
      // if (treshIndex < 0) treshIndex = 0
      // if (treshIndex >= this.props.steps.length) treshIndex = this.props.steps.length - 1
      // let tresh = this.props.steps[treshIndex]
      // if (Math.abs(dy) > Math.abs(tresh)) {
      //   this.props.onSwipeChange(movingUp ? this.state.stepOnStart + 1 : this.state.stepOnStart - 1)
      // } else if (Math.abs(dy) > 10) {
      //   this.props.onSwipeChange(this.state.stepOnStart)
      // }
      let smoothHeight = this.state.contentHeightOnLock + (dy * Math.sign(this.props.steps[0]))
      if (smoothHeight < 0) smoothHeight = 0

      this.setState({ dragY: dy, smoothHeight })
    }
  }

  render() {
    let containerStyle = {}
    if (this.state.locked) {
      containerStyle = {
        '--swipe-updown-y': this.state.smoothHeight + 'px'
      }
    } else {
      containerStyle = {
        '--swipe-updown-y': 'auto'
      }
    }
    let classNames = ['swipeup']
    if (this.props.className) classNames.push(this.props.className)
    if (this.state.locked) classNames.push('smooth')
    return (
      <div className={classNames.join(' ')}>
        <div style={containerStyle} className="items">
          <div ref={this.targetElementRef}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default SwipeUpDown
