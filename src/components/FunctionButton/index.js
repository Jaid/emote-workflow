import classnames from "classnames"
import {isString} from "lodash"
import PropTypes from "prop-types"
import React from "react"

import api from "lib/api"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  *   title: string,
  *   functionName: string,
  *   emote: string
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
    emote: PropTypes.string.isRequired,
  }

  state = {
    phase: "idle",
  }

  handleClick() {
    const myFunction = require(`./functions/${this.props.functionName}`).default
    this.setState({phase: "running"})
    myFunction(this.props.emote).then(result => {
      if (result !== undefined) {
        console.log(result)
      }
      this.setState({phase: "success"})
    }).catch(error => {
      console.error(error)
      this.setState({phase: "error"})
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