export const GET_ROOMS = 'GET_ROOMS';
export const UPDATE_ROOMS = 'UPDATE_ROOMS';

export function getRooms() {
  return {
    type: GET_ROOMS,
    meta: {
      remote: true
    }
  };
}

export function updateRooms(rooms) {
  return {
    type: UPDATE_ROOMS,
    rooms
  }
}
