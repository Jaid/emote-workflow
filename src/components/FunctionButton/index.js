import classnames from "classnames"
import {isString} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class FunctionButton extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    title: PropTypes.string.isRequired,
    functionName: PropTypes.string.isRequired,
  }

  state = {
    phase: "idle",
  }

  handleClick() {
    this.setState({phase: "running"})
    window.api.evalScript(`functions.${this.props.functionName}()`, result => {
      if (isString(result)) {
        console.log(result)
        this.setState({phase: "error"})
        return
      }
      this.setState({phase: "success"})
    })
  }

  render() {
    const style = {
      color: {
        running: "#8ff9ff",
        error: "#ff7777",
        success: "#c5ffca",
      }[this.state.phase] || "white",
    }
    return <div className={classnames(css.container, this.props.className)} style={style} onClick={() => this.handleClick()}>
      {this.props.title}
    </div>
  }

}