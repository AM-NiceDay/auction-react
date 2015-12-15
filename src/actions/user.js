export const CREATE_USER = 'CREATE_USER';

export function createUser(name) {
  return {
    type: CREATE_USER,
    name
  }
}