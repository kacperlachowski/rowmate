import { AuthResponse } from 'api/gql/graphql';

export const setPersistUser = (value: AuthResponse | null) => {
  if (!value) {
    localStorage.removeItem('user');
  }
  localStorage.setItem('user', JSON.stringify(value));
};

export const getPersistUser = (): AuthResponse | null => {
  const token = localStorage.getItem('user');

  if (token) {
    return JSON.parse(token) as AuthResponse;
  }

  return null;
};
