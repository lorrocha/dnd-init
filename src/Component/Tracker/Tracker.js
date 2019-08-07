import React from 'react';
import EditableCell from '../EditableCell/EditableCell';
import NewParticipantForm from '../NewParticipantForm/NewParticipantForm';
import CurrentPlayer from '../CurrentPlayer/CurrentPlayer';
import ParticipantRow from '../ParticipantRow/ParticipantRow';
import SavedParticipantsList from '../SavedParticipantsList/SavedParticipantsList';

import './Tracker.scss';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      participants: [],
      recentEntries: [],
      currentTurnIndex: 0
    };
  }

  newParticipant(args) {
    this.state.recentEntries.push(args)

    this.closeModal();
    this.addToCurrentParticipants(args);
  }

  addToCurrentParticipants(participant) {
    participant.key = `${participant.name}.${participant.hp}.${this.state.participants.length}.${participant.ac}`

    this.state.participants.push(participant)
    this.setState(
      { participants: this.sortParticipants(this.state.participants)}
    )
  }

  removeParticipant(participantKey) {
    let filtered = this.state.participants.filter((participant) => {
      return participant.key !== participantKey;
    });

    this.setState({
      currentTurnIndex: filtered.indexOf(this.currentPlayersTurn()),
      participants: filtered
    })

  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  clearParticipants() {
    this.setState({
      participants: [],
      currentTurnIndex: 0
    })
  }

  updateInfoFor(key, valueType, newValue) {
    let entry = this.fetchParticipant(key);
    entry[valueType] = newValue;

    this.setState({
      participants: this.state.participants
    })
  }

  nextTurn() {
    let newIndex = this.state.currentTurnIndex + 1;
    let participants = this.state.participants;

    if (newIndex >= participants.length) {
      newIndex = 0
    }

    this.setState({
      currentTurnIndex: newIndex
    })
  }

  sortParticipants(participants) {
    return participants.sort((a, b) => {
      let initiativeA = parseInt(a.initiative);
      let initiativeB = parseInt(b.initiative);
      if(initiativeA < initiativeB) {
        return 1;
      } else if(initiativeA > initiativeB) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  fetchParticipant(key) {
    return this.state.participants.find((participant) => {
      return participant.key === key
    });
  }

  currentPlayersTurn() {
    let currentTurn = this.state.currentTurnIndex;
    let participants = this.state.participants;

    return participants[currentTurn]
  }

  isCurrentPlayer(participant) {
    return this.currentPlayersTurn().key === participant.key
  }

  render() {
    return(
      <div>
        <div id="tracker" className="container-grid">
          <div className="container-header">
            <CurrentPlayer
              player={this.currentPlayersTurn()} />
          </div>

          <div className="container-left">
            <div className={
                "add-participant tracker-controls " + (this.state.modalIsOpen ? 'active' : '')
              }
              onClick={this.openModal.bind(this)}
            >
              <div>
                Add Participant
              </div>
            </div>
            <div className="next tracker-controls"
              onClick={this.nextTurn.bind(this)}
            >
              <div>
                Next Turn!
              </div>
            </div>
            <div className="end tracker-controls"
              onClick={this.clearParticipants.bind(this)}
            >
              <div>
                End
              </div>
            </div>
          </div>

          <div className="container-right">
            <SavedParticipantsList
              entries={this.state.recentEntries}
              addEntry={this.addToCurrentParticipants.bind(this)}
              />

          </div>
          <div className="container-bod">
            <div style={{ display: this.state.modalIsOpen ? 'none' : 'block'}}>
              <table id="participant-list">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Current Health</th>
                    <th>Current AC</th>
                    <th>Current Status</th>
                    <th>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.participants.map(participant => (
                    // Without the `key`, React will fire a key warning
                    <React.Fragment key={participant.key}>
                      <ParticipantRow
                        participant={participant}
                        isActivePlayer={this.currentPlayersTurn() === participant}
                        updateInfo={this.updateInfoFor.bind(this)}
                        removeParticipant={this.removeParticipant.bind(this)}
                        />
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: this.state.modalIsOpen ? 'block' : 'none'}}>
              <div
                className="close-form"
                onClick={this.closeModal.bind(this)}
              >	&lt; Back</div>
              <NewParticipantForm
                addParticipant={this.newParticipant.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
