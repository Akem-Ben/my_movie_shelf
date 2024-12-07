import axios, { AxiosResponse, AxiosError } from 'axios';

// Environment configuration
import config from './axiosLinkToBackend';

const { apiHost } = config().secrets;

const customAxios = axios.create({
  baseURL: apiHost,
});

// Intercept responses
customAxios.interceptors.response.use(
  (response) => handleResponse(response),
  (error) => handleError(error)
);

// Helper to handle successful responses
const handleResponse = (response: AxiosResponse): AxiosResponse => {
  // Update tokens if they exist in the response headers
  const newAccessToken = response.headers['x-access-token'];
  const newRefreshToken = response.headers['x-refresh-token'];

  if (newAccessToken && newRefreshToken) {
    storeTokens(newAccessToken, newRefreshToken);
  }

  return response;
};

// Helper to handle errors
const handleError = async (error: AxiosError | any): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    // Attempt token renewal if refresh token is available
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        // Retry the original request
        return await retryWithNewTokens(error.config) as any
      } catch (retryError) {
        // Clear storage and redirect if retry fails
        clearClientStorage();
        redirectToHomePage();
        return Promise.reject(retryError);
      }
    }

    // No refresh token or failure in renewal
    clearClientStorage();
    redirectToHomePage();
  }

  return Promise.reject(error);
};

// Retry original request with new tokens
const retryWithNewTokens = async (originalConfig: any): Promise<AxiosResponse> => {
  const newAccessToken = getAccessToken();

  if (newAccessToken) {
    originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await axios(originalConfig);
  }

  throw new Error('Failed to retry with new access token.');
};

// Intercept requests
customAxios.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to get access token
const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if(user){
     const accessToken = JSON.parse(user).accessToken
     return accessToken
    }
    return null
  }
  return null;
};

// Helper to get refresh token
const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
   const user = localStorage.getItem('user')
   if(user){
    const refreshToken = JSON.parse(user).refreshToken
    return refreshToken
   }
   return null
  }
  return null;
};

// Helper to store tokens
const storeTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

// Helper to clear client storage
const clearClientStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

// Redirect to home page
const redirectToHomePage = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

export default customAxios;
