import utils from '../utils.js';
import platform from '../platform/index.js';

const decodeCookieValue = (value) => {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
};

// DanbiEduCorp customization: duplicate names (e.g. parent/sub-domain cookies) resolve to the last non-empty value.
const pickLastCookieValue = (values) => {
  const nonEmptyValues = values.filter((value) => utils.isString(value) && value !== '');
  return nonEmptyValues.length
    ? decodeCookieValue(nonEmptyValues[nonEmptyValues.length - 1])
    : null;
};

export default platform.hasStandardBrowserEnv
  ? // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;

        const cookie = [`${name}=${encodeURIComponent(value)}`];

        if (utils.isNumber(expires)) {
          cookie.push(`expires=${new Date(expires).toUTCString()}`);
        }
        if (utils.isString(path)) {
          cookie.push(`path=${path}`);
        }
        if (utils.isString(domain)) {
          cookie.push(`domain=${domain}`);
        }
        if (secure === true) {
          cookie.push('secure');
        }
        if (utils.isString(sameSite)) {
          cookie.push(`SameSite=${sameSite}`);
        }

        document.cookie = cookie.join('; ');
      },

      read(name) {
        if (typeof document === 'undefined') return null;
        const cookieString = document.cookie;
        if (!cookieString) return null;
        // Match name=value by splitting on the semicolon separator instead of building a
        // RegExp from `name` — interpolating an unescaped string into a RegExp would let
        // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
        // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
        // "; ", so ignore optional whitespace before each cookie name.
        const matchedValues = cookieString
          .split(';')
          .map((cookie) => cookie.replace(/^\s+/, ''))
          .filter((cookie) => {
            const eq = cookie.indexOf('=');
            return eq !== -1 && cookie.slice(0, eq) === name;
          })
          .map((cookie) => cookie.slice(cookie.indexOf('=') + 1));
        return pickLastCookieValue(matchedValues);
      },

      async readAsync(name) {
        try {
          const store = typeof window !== 'undefined' && window.cookieStore;
          // getAll keeps document.cookie order, so duplicates resolve the same way as read().
          if (store && utils.isFunction(store.getAll)) {
            const cookieList = await store.getAll(name);
            return pickLastCookieValue(
              (Array.isArray(cookieList) ? cookieList : []).map((cookie) => cookie && cookie.value)
            );
          }
          if (store && utils.isFunction(store.get)) {
            const cookie = await store.get(name);
            // Both APIs expose stored bytes; preserve Axios's existing URI decoding.
            return cookie ? decodeCookieValue(cookie.value) : null;
          }
        } catch (e) {
          // Restricted or unavailable storage retains the synchronous fallback.
        }

        return this.read(name);
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000, '/');
      },
    }
  : // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      async readAsync() {
        return null;
      },
      remove() {},
    };
