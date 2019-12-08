import classnames from "classnames"
import globby from "globby"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import functions from "lib/functions.yml"
import FunctionButton from "components/FunctionButton"

import css from "./style.scss"

window.globby = globby

const globResult = globby.sync("E:/Emote Projects/*")
console.log(globResult)

@connect(state => ({
  loginInfo: state.login,
}))
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  render() {
    const buttons = []
    for (const [functionName, properties] of Object.entries(functions)) {
      buttons.push(<FunctionButton key={functionName} functionName={functionName} {...properties}/>)
    }
    return <div className={classnames(css.container, this.props.className)}>
      Hi
      <hr/>
      {buttons}
    </div>
  }

}