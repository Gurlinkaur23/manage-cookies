// Add event listener
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Select HTML element
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export { onEvent, select, selectAll };
