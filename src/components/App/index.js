import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field, reduxForm} from "redux-form"

import EmoteSelect from "components/EmoteSelect"
import FunctionButtonList from "components/FunctionButtonList"

import css from "./style.scss"

@reduxForm({
  form: "controls",
})
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
    return <div className={classnames(css.container, this.props.className)}>
      <form>
        <Field component={EmoteSelect} name="emote"/>
      </form>
      <FunctionButtonList/>
    </div>
  }

}