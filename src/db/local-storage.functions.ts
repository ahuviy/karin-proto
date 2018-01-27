const inBrowser = (typeof window !== 'undefined');

/**
 * Add an item to local-storage
 */
export function set(id, val) {
    if (!inBrowser) return;
    localStorage.setItem(id, JSON.stringify(val));
}

/**
 * Retrieve an item from local-storage
 */
export function get(id) {
    if (!inBrowser) return null;
    const val = localStorage.getItem(id);
    return val ? JSON.parse(val) : null;
}

/**
 * Remove an item from local-storage
 */
export function remove(id) {
    if (!inBrowser) return;
    localStorage.removeItem(id);
}

/**
 * Remove all items from local-storage
 */
export function clear() {
    if (!inBrowser) return;
    localStorage.clear();
}
