import React from 'react';
import EditableCell from '../EditableCell/EditableCell';

export default class ParticipantRow extends React.Component {
  render() {
    return(
      <React.Fragment key={this.props.participant}>
        <tr>
          <EditableCell
            id={this.props.participant.key}
            value={this.props.participant.name}
            />
          <EditableCell
            id={this.props.participant.key}
            value={this.props.participant.hp}
            />
          <EditableCell
            id={this.props.participant.key}
            value={this.props.participant.ac}
            />
          <EditableCell
            id={this.props.participant.key}
            name='status'
            value={this.props.participant.status}
            updateInfo={this.props.updateInfo}
            />
          <td
            onClick={() => {this.props.removeParticipant(this.props.participant.key)}}
            >
            Remove
          </td>
        </tr>
      </React.Fragment>
    )
  }
}
