export const START_GAME = 'START_GAME';

export function startGame(room) {
  const roomJS = room.toJS();
  return {
    type: START_GAME,
    game: {
      owner: roomJS.owner,
      players: roomJS.players
    }
  }
}