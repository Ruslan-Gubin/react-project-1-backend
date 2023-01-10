const timeout = (callback, delay) => {
    const tick = () => callback();
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
};
export { timeout };
