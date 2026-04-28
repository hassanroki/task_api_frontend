/**
 * Logout Utility Functions
 * Centralized logout logic for the application
 */

/**
 * Clear all user session data
 * - Local storage
 * - Session storage
 * - User tokens
 * - User data
 */
export const clearSessionData = () => {
  // Clear local storage
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')
  
  // Clear session storage
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  
  // Clear all localStorage if needed (nuclear option)
  // localStorage.clear()
  // sessionStorage.clear()
}

/**
 * Perform logout and redirect to login page
 * @param {Router} router - Vue Router instance
 * @param {String} redirectPath - Path to redirect to (default: /login)
 */
export const performLogout = async (router, redirectPath = '/login') => {
  // Clear session data
  clearSessionData()
  
  // Redirect to logout page (which will handle final redirect)
  await router.push('/logout')
}

/**
 * Check if user is authenticated
 * @returns {Boolean} True if user has valid session/token
 */
export const isUserAuthenticated = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return !!token
}

/**
 * Get current user data from session
 * @returns {Object|null} User object or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const userJSON = localStorage.getItem('user') || sessionStorage.getItem('user')
    return userJSON ? JSON.parse(userJSON) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

/**
 * Get auth token from session
 * @returns {String|null} Auth token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null
}
