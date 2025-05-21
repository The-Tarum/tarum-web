/**
 * Conditionally join CSS class names.
 * Filters out falsy values (false, undefined, null, "", 0) and joins the rest.
 *
 * @param  {...any} inputs strings or arrays of strings
 * @returns {string}
 */
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ")
}
