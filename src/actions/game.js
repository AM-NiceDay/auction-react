export const START_GAME = 'START_GAME';
export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const GAME_REMOVED = 'GAME_REMOVED';
export const NEXT_TICK = 'NEXT_TICK';
export const BUY_THING = 'BUY_THING';
export const BUY_JOKER = 'BUY_JOKER';

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

export function removeGame(gameId) {
  return {
    type: REMOVE_GAME,
    gameId,
    meta: {
      remote: true
    }
  }
}

export function gameRemoved() {
  return {
    type: GAME_REMOVED
  }
}

export function nextTick(gameId) {
  return {
    type: NEXT_TICK,
    gameId,
    meta: {
      remote: true
    }
  }
}

export function buyThing(gameId, playerId) {
  return {
    type: BUY_THING,
    gameId,
    playerId,
    meta: {
      remote: true
    }
  }
}

export function buyJoker(joker, gameId, playerId) {
  return {
    type: BUY_JOKER,
    joker,
    gameId,
    playerId,
    meta: {
      remote: true
    }
  }
}
