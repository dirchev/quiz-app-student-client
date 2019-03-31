import React, { Component } from "react"

class SwipeUpDown extends Component {
  constructor () {
    super()
    this.state = {
      y0: null,
      dragY: 0,
      locked: false,
      contentHeightOnLock: 0,
      stepOnStart: 0
    }
    this.lock = this.lock.bind(this)
    this.change = this.change.bind(this)
    this.move = this.move.bind(this)
  }

  lock (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    this.setState({
      y0: event.clientY,
      locked: true,
      contentHeightOnLock: this.props.contentRef.current.offsetHeight,
      stepOnStart: this.props.step
    })
  }

  change (e) {
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

      this.setState({y0: null, dragY: 0, locked: false})
    }
  }

  move (e) {
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
      let dragY = Math.round(event.clientY - this.state.y0)
      let smoothHeight = this.state.contentHeightOnLock + (dragY * Math.sign(this.props.steps[0]))
      if (smoothHeight < 0) smoothHeight = 0

      this.setState({dragY, smoothHeight})
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
        <div ref={this.containerRef} style={containerStyle} className="items">
          <div
            onMouseDown={this.lock}
            onTouchStart={this.lock}
            onTouchMove={this.move}
            onMouseUp={this.change}
            onTouchEnd={this.change}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default SwipeUpDown
