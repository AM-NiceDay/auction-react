export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export function createUser(name) {
  return {
    type: CREATE_USER,
    name,
    meta: {
      remote: true
    }
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function removeUser() {
  return {
    type: REMOVE_USER
  }
}
