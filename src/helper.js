export const setLocalstorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/* istanbul ignore next */
export const getLocalstorage = key => {
    return JSON.parse(localStorage.getItem(`${key}`) || null);
};

/* istanbul ignore next */
export const removeItemFromLocalStorage = key => {
    localStorage.removeItem(key);
};
