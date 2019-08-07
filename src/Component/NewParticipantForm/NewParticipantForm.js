import React from 'react';

import './NewParticipantForm.scss';

export default class NewParticipantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {key: 'Name', property: 'name'},
        {key: 'Current HP', property: 'hp'},
        {key: 'Initiative', property: 'initiative'},
        {key: 'Status', property: 'status'},
        {key: 'Armor Class', property: 'ac'},
        {key: 'Strength', property: 'str'},
        {key: 'Dexterity', property: 'dex'},
        {key: 'Constitution', property: 'con'},
        {key: 'Intelligence', property: 'int'},
        {key: 'Wisdom', property: 'wis'},
        {key: 'Charisma', property: 'cha'}
      ],
      values: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let values = this.state.values
    values[event.target.name] = event.target.value

    this.setState({
      values: values
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    this.props.addParticipant(this.state.values);
    this.setState({
      values: {}
    });
  }

  render() {
    return (
      <div id="new-participant">
        <form onSubmit={this.handleSubmit}>
          <div className="questions">
            {this.state.data.map((question) =>
              <div className="form-input">
                <label>{question.key}</label>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name={question.property} />
              </div>
            )}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
