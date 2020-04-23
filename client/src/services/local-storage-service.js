const USERNAME_KEY = 'username';

export const getUsername = () => localStorage.getItem(USERNAME_KEY);

export const setUsername = (username) => localStorage.setItem(USERNAME_KEY, username);
