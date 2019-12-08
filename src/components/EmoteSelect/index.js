import classnames from "classnames"
import globby from "globby"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
import RcSelect, {Option} from "rc-select"
import React from "react"

import css from "./style.scss"

/**
  * @typedef {{
  *   className: *,
  * }} Props
  */

/**
  * @class
  * @extends {React.Component<Props>}
  */
export default class EmoteSelect extends React.Component {

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  state = {}

  componentDidMount() {
    globby("E:/Emote Projects", {
      objectMode: true,
      onlyDirectories: true,
    }).then(folders => {
      this.setState({
        entries: folders.map(folder => {
          return {
            name: folder.name,
          }
        }),
      })
    }).catch(console.error)
  }

  render() {
    let content
    if (isEmpty(this.state.entries)) {
      content = "-"
    } else {
      const options = this.state.entries.map(entry => <Option key={entry.name} value={entry.name}>
        {entry.name}
      </Option>)
      content = <RcSelect>{options}</RcSelect>
    }
    return <div className={classnames(css.container, this.props.className)}>
      {content}
    </div>
  }

}