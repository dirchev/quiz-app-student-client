import React, { Component } from "react"

class Swipable extends Component {
  constructor () {
    super()
    this.containerRef = React.createRef();
    this.state = {
      x0: null,
      dragX: 0,
      locked: false
    }
    this.lock = this.lock.bind(this)
    this.change = this.change.bind(this)
    this.move = this.move.bind(this)
  }

  lock (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    this.setState({
      x0: event.clientX,
      locked: true
    })
  }

  change (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    if (this.state.locked) {
      // if the x0 was recorded
      let dx = event.clientX - this.state.x0
      let s = 0
      if (Math.abs(dx) > this.containerRef.current.clientWidth / 2 / this.props.children.length) {
        s = Math.sign(dx) // s is -1 or 1
      }

      this.props.onSelectedChildIndexChange(this.props.selectedChildIndex - s)
      this.setState({x0: null, dragX: 0, locked: false})
    }
  }

  move (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    if (this.state.locked) {
      this.setState({dragX: Math.round(event.clientX - this.state.x0)})
    }
  }

  render() {
    let containerStyle = {
      '--n': this.props.children.length,
      '--i': this.props.selectedChildIndex.toString(),
      '--tx': (this.state.dragX || 0) + 'px',
    }
    let classNames = ['swipable']
    if (this.props.className) classNames.push(this.props.className)
    if (this.state.locked) classNames.push('smooth')
    return (
      <div className={classNames.join(' ')}>
        <div ref={this.containerRef} style={containerStyle} className="items">
          {
            this.props.children.map((child, index) => {
              return (
                <div
                  key={index}
                  className="swipable-item"
                  onMouseDown={this.lock}
                  onTouchStart={this.lock}
                  onTouchMove={this.move}
                  onMouseUp={this.change}
                  onTouchEnd={this.change}
                >
                  {child}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Swipable
