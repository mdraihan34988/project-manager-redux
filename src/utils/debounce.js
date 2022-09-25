 const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  export default debounce;