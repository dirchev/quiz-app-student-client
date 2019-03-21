import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

class ContextMenu extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen (e) {
    e.preventDefault()
    this.setState({opened: true})
  }

  handleClose (e) {
    e.preventDefault()
    this.setState({opened: false})
  }

  render() {
    return (
      <div className={`context-menu ${this.state.opened ? 'opened' : false}`}>
        <button  onClick={this.handleOpen} className="context-menu-button">
          <FontAwesomeIcon icon={faEllipsisV}/>
        </button>
        <div className="context-menu-items" onClick={this.handleClose}>
          {this.props.children}
        </div>
        <div onClick={this.handleClose} className="context-menu-overlay"></div>
      </div>
    )
  }
}

export default ContextMenu
