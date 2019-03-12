import React, { Component, Fragment } from "react"

class MultilineText extends Component {
  getParts () {
    return this.props.text.split('\n\n').map(paragraph => {
      return paragraph.split('\n')
    })
  }
  render() {
    return (
      <Fragment>
        {
          this.getParts().map(function (paragraph, index) {
            return (
              <p key={`paragraph-${index}`}>
                {
                  paragraph.map((line, index) => {
                    return (
                      <Fragment key={`line-${index}`}>
                        {line} <br/>
                      </Fragment>
                    )
                  })
                }
              </p>
            )
          })
        }
      </Fragment>
    )
  }
}

MultilineText.defaultProps = {
  text: ''
}

export default MultilineText
