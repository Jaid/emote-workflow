import classnames from "classnames"
import globby from "globby"
import {isEmpty} from "has-content"
import PropTypes from "prop-types"
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
    input: PropTypes.object.isRequired,
  }

  state = {}

  componentDidMount() {
    globby("E:/Emote Projects/*", {
      objectMode: true,
      onlyDirectories: true,
    }).then(folders => {
      const filteredFolders = folders.filter(folderObject => {
        return !folderObject.name.startsWith("_")
      })
      console.log(`Globbed folders: ${filteredFolders}`)
      this.setState({
        entries: filteredFolders.map(folder => {
          return {
            name: folder.name,
          }
        }),
      })
    }).catch(console.error)
  }

  handleChange(event) {
    console.log("Change: ", event)
    this.props.input.onChange(event)
  }

  render() {
    let content
    if (isEmpty(this.state.entries)) {
      content = "-"
    } else {
      const options = this.state.entries.map(entry => <option key={entry.name} value={entry.name}>
        {entry.name}
      </option>)
      content = <select onChange={this.handleChange.bind(this)}><option value=""/>{options}</select>
    }
    return <div className={classnames(css.container, this.props.className)}>
      {content}
    </div>
  }

}