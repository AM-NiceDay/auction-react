export const CREATE_ROOM = 'CREATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';

export function createRoom(owner) {
  return {
    type: CREATE_ROOM,
    owner,
    meta: {
      remote: true
    }
  }
}

export function joinRoom(player) {
  return {
    type: JOIN_ROOM,
    player,
    meta: {
      remote: true
    }
  }
}
