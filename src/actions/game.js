export const START_GAME = 'START_GAME';
export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';

export function startGame(roomId) {
  return {
    type: START_GAME,
    roomId,
    meta: {
      remote: true
    }
  };
}

export function getGame(gameId) {
  return {
    type: GET_GAME,
    gameId,
    meta: {
      remote: true
    }
  };
}

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    game
  }
}
