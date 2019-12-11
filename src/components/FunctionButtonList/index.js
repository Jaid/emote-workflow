import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import FunctionButton from "components/FunctionButton"

import css from "./style.scss"

const functions = {
  init: require("lib/functions/init"),
  finishOutline: require("lib/functions/finishOutline"),
  finishWidthChanges: require("lib/functions/finishWidthChanges"),
  finishOverlapRemoval: require("lib/functions/finishOverlapRemoval"),
}

/**
  * @typedef {{
  *   className: *,
  *   emote: string
  * }} Props
  */

@connect(({form}) => ({
  emote: form?.controls?.values?.emote,
}))

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class FunctionButtonList extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    emote: PropTypes.string,
  }

  render() {
    if (isEmpty(this.props.emote)) {
      return null
    }
    const buttons = []
    for (const [functionName, properties] of Object.entries(functions)) {
      const key = `${this.props.emote}-${functionName}`
      buttons.push(<FunctionButton key={key} emote={this.props.emote} functionName={functionName} handler={properties.default} title={properties.title}/>)
    }
    return <div className={classnames(css.container, this.props.className)}>
      {buttons}
    </div>
  }

}