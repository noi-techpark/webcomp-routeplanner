export const getStyle = array => array[0][1];

export const debounce = func => {
  let timer;
  return function(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
};

export function getSearchContainerHeight() {
  const search__search_container = this.shadowRoot.querySelector('.search__search_container');
  this.search_results_height = search__search_container.offsetHeight;
}
/**
 * returns a fetch function that aborts previous request
 * useful for autosuggestion-like requests
 */
export const fetch_no_parallel = () => {
  let old_request_controller = null;
  return async (url, params) => {
    if (old_request_controller) {
      old_request_controller.abort();
    }
    const controller = new AbortController();
    old_request_controller = controller;
    const { signal } = controller;

    // try {
    const response = await fetch(url, { ...params, signal });
    return response;
    // } catch (e) {
    //   if (!e.name === 'AbortError') {
    //     throw e;
    //   }
    // }
  };
};
