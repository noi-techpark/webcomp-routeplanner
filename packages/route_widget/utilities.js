export const getStyle = array => array[0][1];

export const debounce = func => {
  var timer;
  return function(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
};

export function getSearchContainerHeight() {
  const search__search_container = this.shadowRoot.querySelector('.search__search_container');
  this.search_results_height = search__search_container.offsetHeight;
}
