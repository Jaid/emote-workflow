import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import functions from "lib/functions.yml"
import EmoteSelect from "components/EmoteSelect"
import FunctionButton from "components/FunctionButton"

import css from "./style.scss"

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
    return <EmoteSelect/>
    // const buttons = []
    // for (const [functionName, properties] of Object.entries(functions)) {
    //   buttons.push(<FunctionButton key={functionName} functionName={functionName} {...properties}/>)
    // }
    // return <div className={classnames(css.container, this.props.className)}>
    //   Hi
    //   <hr/>
    //   {buttons}
    // </div>
  }

}