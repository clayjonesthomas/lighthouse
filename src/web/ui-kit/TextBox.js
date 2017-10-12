import React, {PropTypes, Component} from 'react'
import './TextBox.css'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class TextBox extends Component {

  //idk why but i do
  shouldComponentUpdate(nextProps){
    return this.props.label !== nextProps.label ||
        this.props.placeholder !== nextProps.placeholder ||
        this.props.className !== nextProps.className
  }

  handleKeyPress(target) {
    if (this.props.onEnter && target.charCode === 13) {
      this.props.onEnter()
    }
  }

  render () {
    return (
      <FormGroup
        className="text-box">
        {this.props.label &&
          <ControlLabel
            className={"text-box-label "+(this.props.classNameLabel || "")}>
            {this.props.label}
          </ControlLabel>
        }
        <FormControl
          defaultValue={this.props.textBoxValue || ''}
          type={this.props.inputType || "text"}
          placeholder={this.props.placeholder}
          className={"text-box-input "+this.props.className}
          inputRef={ref => this.props.refFunc(ref)}
          componentClass={this.props.componentClass}
          onKeyPress={(target) => this.handleKeyPress(target)}
        />
      </FormGroup>
    )
  }
}

TextBox.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  refFunc: PropTypes.func.isRequired,
  textBoxValue: PropTypes.string
}

export default TextBox