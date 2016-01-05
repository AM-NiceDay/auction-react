import React from 'react';

export default ({ players, playersStats, playersPoints }) => {
  return <table>
    <thead>
    <tr>
      <td>Name</td>
      <td>Money</td>
      <td>Things</td>
      <td>Points</td>
    </tr>
    </thead>
    <tbody>
    { players.toJS().map(player => <tr key={player._id}>
        <td>{ playersStats[player._id].name }</td>
        <td>{ playersStats[player._id].money }</td>
        <td>{ playersStats[player._id].things.join(', ') }</td>
        <td>{ playersPoints[player._id] }</td>
      </tr>)
    }
    </tbody>
  </table>;
}
