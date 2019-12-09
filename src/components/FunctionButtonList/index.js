import classnames from "classnames"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import api from "lib/api"
import FunctionButton from "components/FunctionButton"

import functions from "./functions.yml"
import css from "./style.scss"

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
    api.addDocument()
    if (isEmpty(this.props.emote)) {
      return null
    }
    const buttons = []
    for (const [functionName, properties] of Object.entries(functions)) {
      const key = `${this.props.emote}-${functionName}`
      buttons.push(<FunctionButton key={key} emote={this.props.emote} functionName={functionName} {...properties}/>)
    }
    return <div className={classnames(css.container, this.props.className)}>
      {buttons}
    </div>
  }

}