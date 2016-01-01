export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function createUser(name) {
  return {
    type: CREATE_USER,
    name
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}
