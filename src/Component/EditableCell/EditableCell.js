import React from 'react';

export default class EditableCell extends React.Component {
  constructor(props) {
    super();

    this.state = {
      value: null,
      isEditing: false,
    };
  }

  openEdit() {
    this.setState({
      isEditing: true
    })
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      this.props.updateInfo(this.props.id, this.props.name, event.target.value)

      this.setState({
        isEditing: false
      })
    }
  }

  render() {
    var content;
    if (this.state.isEditing) {
      content = <input
        defaultValue={this.props.value}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    } else {
      content = this.props.value
    }

    return(
      <td
        onClick={this.openEdit.bind(this)}
      >
        {content}
      </td>
    )
  }
}
