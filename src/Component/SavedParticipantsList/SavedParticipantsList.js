import React from 'react';

import './SavedParticipantsList.scss';

export default class SavedParticipantsList extends React.Component {
  render() {
    return(
      <div>
        <div className="entry-title">
          Recent Entries (Click to Add)
        </div>

        <div className='entry-list'>
          {this.props.entries.map(singleEntry => (
            <React.Fragment>
              <div className='entry-container'>
                <div className='entry' onClick={() => { this.props.addEntry(Object.assign({}, singleEntry)) }}>
                  {singleEntry.name} <span className='plus'>+</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
}
