import axios from 'axios';

/**
 * Creates an instance of axios configured with the base URL of the API,
 * the 'Content-Type: application/json' header for POST requests, and
 * the 'withCredentials' option enabled. The 'withCredentials' option
 * allows for sending the browser credentials along with the request, such
 * as the session cookie.
 */
export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    post: { 'Content-Type': 'application/json' },
    put: { 'Content-Type': 'application/json' },
  },
  withCredentials: true,
});

export const prod = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    put: { 'Content-Type': 'application/json' },
  },
  withCredentials: true,
});
