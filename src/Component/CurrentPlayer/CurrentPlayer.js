import React from 'react';

import './CurrentPlayer.scss';

export default class CurrentPlayer extends React.Component {
  render() {
    if (!this.props.player) {
      return null;
    }

    let player = this.props.player;

    return (
      <div className="current-player">
        <div className="pname statblock">
          <div className="title">Name</div>
          <div className="val">{player.name}</div>
        </div>
        <div className="pstatus statblock">
          <div className="title">Status</div>
          <div className="val">{player.status}</div>
        </div>
        <div className="php statblock">
          <div className="title">HP</div>
          <div className="val">{player.hp}</div>
        </div>
        <div className="pac statblock">
          <div className="title">AC</div>
          <div className="val">{player.ac}</div>
        </div>
        <div className="pinitiative statblock">
          <div className="title">Initiative</div>
          <div className="val">{player.initiative}</div>
        </div>
        <div className="pstr statblock">
          <div className="title">Str</div>
          <div className="val">{player.str}</div>
        </div>
        <div className="pdex statblock">
          <div className="title">Dex</div>
          <div className="val">{player.dex}</div>
        </div>
        <div className="pcon statblock">
          <div className="title">Con</div>
          <div className="val">{player.con}</div>
        </div>
        <div className="pint statblock">
          <div className="title">Int</div>
          <div className="val">{player.int}</div>
        </div>
        <div className="pwis statblock">
          <div className="title">Wis</div>
          <div className="val">{player.wis}</div>
        </div>
        <div className="pcha statblock">
          <div className="title">Cha</div>
          <div className="val">{player.cha}</div>
        </div>
      </div>
    )
  }
}
