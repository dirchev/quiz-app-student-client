import React, { Component } from "react"

class Swipeable extends Component {
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

  /**
   * Invoked when the drag is engaged (mousedown or touchstart)
   * @param {Event} e
   */
  lock (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    // update the state
    this.setState({
      x0: event.clientX, // initial position of the click/touch
      locked: true // indicate that touch has been initiated
    })
  }

  /**
   * Invoked when the mouse/touch has been moved
   * @param {Event} e
   */
  move (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e
    // check if there is no mousedown - do not do anything
    // (happens on desktop when the mouse cursor comes over the element)
    if (!this.state.locked) return

    // set the current drag value
    this.setState((currentState) => {
      // calculate the drag value by taking the inital position on lock
      // and the current position
      let currentDrag = Math.round(event.clientX - currentState.x0)
      return {dragX: currentDrag}
    })
  }

  /**
   * Invoked when the drag has ended (mouseup or touchend)
   * @param {Event} e
   */
  change (e) {
    let event = e.changedTouches ? e.changedTouches[0] : e

    // reset the state
    this.setState({x0: null, dragX: 0, locked: false})

    // update the parent with the new index if lock had occured
    if (this.state.locked) {
      // if the x0 was recorded
      let dx = event.clientX - this.state.x0
      let s = 0
      // calculate what the minimum drag is in order to trigger an element change
      // set to a third of the width of a single element
      let minimumDragToChangeTheItem = this.containerRef.current.clientWidth / 3 / this.props.children.length
      if (Math.abs(dx) > minimumDragToChangeTheItem) {
        s = Math.sign(dx) // s is -1 or 1
      }

      // update the selected child index if a change is required
      if (s) this.props.onSelectedChildIndexChange(this.props.selectedChildIndex - s)
    }
  }

  render() {
    // construct CSS variables for the .items div
    let containerStyle = {
      '--n': this.props.children.length,
      '--i': this.props.selectedChildIndex.toString(),
      '--tx': (this.state.dragX || 0) + 'px',
    }
    // construct classes for the parent element
    let classNames = ['swipeable']
    if (this.props.className) classNames.push(this.props.className)
    if (this.state.locked) classNames.push('smooth') // faster animations
    return (
      <div className={classNames.join(' ')}>
        <div ref={this.containerRef} style={containerStyle} className="items">
          {
            // render all of the children elements, wrapped in a swipable-item
            this.props.children.map((child, index) => {
              return (
                <div
                  key={index}
                  className="swipeable-item"
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

export default Swipeable
