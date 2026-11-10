// DanbiEduCorp customization: when several cookies share a name, the last non-empty value wins.
import { afterEach, describe, expect, it, vi } from 'vitest';

import axios from '../../index.js';
import cookies from '../../lib/helpers/cookies.js';

const withCookieString = (cookieString, callback) => {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'cookie');

  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get() {
      return cookieString;
    },
  });

  const restore = () => {
    if (descriptor) {
      Object.defineProperty(document, 'cookie', descriptor);
    } else {
      delete document.cookie;
    }
  };

  try {
    const result = callback();
    // Async callbacks keep the stubbed cookie string until they settle.
    return result instanceof Promise ? result.finally(restore) : (restore(), result);
  } catch (error) {
    restore();
    throw error;
  }
};

describe('helpers::cookies duplicate names (DanbiEduCorp)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('read', () => {
    it('returns the last value when the same name appears several times', () => {
      withCookieString('XSRF-TOKEN=first; foo=bar; XSRF-TOKEN=second', () => {
        expect(cookies.read('XSRF-TOKEN')).toBe('second');
      });
    });

    it('skips empty duplicates and keeps the last non-empty value', () => {
      withCookieString('XSRF-TOKEN=first;XSRF-TOKEN=', () => {
        expect(cookies.read('XSRF-TOKEN')).toBe('first');
      });
    });

    it('returns null when every duplicate is empty', () => {
      withCookieString('XSRF-TOKEN=; XSRF-TOKEN=', () => {
        expect(cookies.read('XSRF-TOKEN')).toBeNull();
      });
    });

    it('keeps "=" characters inside the selected value', () => {
      withCookieString('XSRF-TOKEN=old; XSRF-TOKEN=abc==', () => {
        expect(cookies.read('XSRF-TOKEN')).toBe('abc==');
      });
    });

    it('decodes only the selected value', () => {
      withCookieString('XSRF-TOKEN=old%25; XSRF-TOKEN=abc%2Fdef%3D', () => {
        expect(cookies.read('XSRF-TOKEN')).toBe('abc/def=');
      });
    });
  });

  describe('readAsync with Cookie Store', () => {
    it('returns the last non-empty value from getAll', async () => {
      const getAll = vi
        .fn()
        .mockResolvedValue([{ value: 'first' }, { value: 'second' }, { value: '' }]);
      const get = vi.fn();
      vi.stubGlobal('cookieStore', { get, getAll });

      expect(await cookies.readAsync('XSRF-TOKEN')).toBe('second');
      expect(getAll).toHaveBeenCalledWith('XSRF-TOKEN');
      expect(get).not.toHaveBeenCalled();
    });

    it('returns null when getAll finds nothing', async () => {
      vi.stubGlobal('cookieStore', { get: vi.fn(), getAll: vi.fn().mockResolvedValue([]) });

      expect(await cookies.readAsync('XSRF-TOKEN')).toBeNull();
    });

    it('falls back to the synchronous reader when getAll rejects', async () => {
      vi.stubGlobal('cookieStore', {
        get: vi.fn(),
        getAll: vi.fn().mockRejectedValue(new Error('denied')),
      });

      await withCookieString('XSRF-TOKEN=first; XSRF-TOKEN=second', async () => {
        expect(await cookies.readAsync('XSRF-TOKEN')).toBe('second');
      });
    });

    it('sends the last token as the XSRF header through the XHR adapter', async () => {
      const get = vi.fn().mockResolvedValue({ value: 'stale' });
      vi.stubGlobal('cookieStore', {
        get,
        getAll: vi.fn().mockResolvedValue([{ value: 'stale' }, { value: 'fresh%3D' }]),
      });
      const setHeader = vi.spyOn(XMLHttpRequest.prototype, 'setRequestHeader');

      await axios.get(new URL('../../package.json', import.meta.url).href, {
        adapter: 'xhr',
        timeout: 5000,
      });

      expect(setHeader).toHaveBeenCalledWith('X-XSRF-TOKEN', 'fresh=');
      expect(get).not.toHaveBeenCalled();
    });
  });

  describe('fetch adapter', () => {
    it('sends the last token as the XSRF header through the synchronous reader', async () => {
      const fetch = vi.fn(async (request) => new Response(request.headers.get('X-XSRF-TOKEN')));

      const response = await withCookieString('XSRF-TOKEN=stale; XSRF-TOKEN=fresh%3D', () =>
        axios.get(window.location.href, { adapter: 'fetch', env: { fetch } })
      );

      expect(response.data).toBe('fresh=');
    });
  });
});
