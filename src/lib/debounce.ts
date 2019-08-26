/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The
 * function will be called after it stops being called for N milliseconds. If `immediate` is passed,
 * trigger the function on the leading edge, instead of the trailing. The function also has a
 * property 'clear' that is a function which will clear the timer to prevent previously scheduled
 * executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
export const debounce = function<F extends Function>(func: F, wait: number = 100) {
  let timeout: any
  let context: Function | null
  let args: any[] | null
  let timestamp: number

  function later() {
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      clearTimeout(timeout)
      timeout = null
      console.log('calling debounced function')
      func.apply(context, args)
      context = args = null
    }
  }

  var debounced = function(this: Function) {
    args = [...arguments]
    timestamp = Date.now()
    if (!timeout) timeout = setTimeout(later, wait)
  }

  return debounced
}
