export const CREATE_ROOM = 'CREATE_ROOM';

export function createRoom(owner) {
  return {
    type: CREATE_ROOM,
    owner
  }
}