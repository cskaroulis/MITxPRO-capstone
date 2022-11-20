// We have very simple state needs.
// Storing state in local storage will persist state after browser reloads.

const customizeKey = (key) => {
  return `capstone-bank-${key}`;
};

const get = (key) => {
  const customKey = customizeKey(key);
  return localStorage.getItem(customKey);
};

const set = (key, value) => {
  const customKey = customizeKey(key);
  localStorage.setItem(customKey, value);
};

const remove = (key) => {
  const customKey = customizeKey(key);
  localStorage.removeItem(customKey);
};

const clear = () => {
  localStorage.clear();
};

export const store = { get, set, remove, clear };
