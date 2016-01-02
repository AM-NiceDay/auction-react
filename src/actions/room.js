export const CREATE_ROOM = 'CREATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const GET_ROOM = 'GET_ROOM';

export function createRoom(owner) {
  return {
    type: CREATE_ROOM,
    owner,
    meta: {
      remote: true
    }
  }
}

export function joinRoom(roomId, player) {
  return {
    type: JOIN_ROOM,
    roomId,
    player,
    meta: {
      remote: true
    }
  }
}

export function updateRoom(room) {
  return {
    type: UPDATE_ROOM,
    room
  }
}

export function getRoom(roomId) {
  return {
    type: GET_ROOM,
    roomId,
    meta: {
      remote: true
    }
  }
}
