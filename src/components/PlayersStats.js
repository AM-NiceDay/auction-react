import React from 'react';

export default ({ players, playersStats }) => {
  return <table>
    <thead>
    <tr>
      <td>Name</td>
      <td>Money</td>
      <td>Things</td>
    </tr>
    </thead>
    <tbody>
    { players.toJS().map(player => <tr key={player._id}>
        <td>{ playersStats[player._id].name }</td>
        <td>{ playersStats[player._id].money }</td>
        <td>{ playersStats[player._id].things.join(', ') }</td>
      </tr>)
    }
    </tbody>
  </table>;
}
