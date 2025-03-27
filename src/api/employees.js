/**
 * Employees API service
 * Handles CRUD operations for employee data
 */

import { API_BASE_URL, commonHeaders, getAuthHeader } from './config';

export const employeesApi = {
  /**
   * Get all employees with pagination
   * @param {string} token - Authentication token
   * @param {number} page - Page number (default: 1)
   * @param {number} perPage - Items per page (default: 6)
   * @returns {Promise<Object>} - Paginated list of employees with metadata
   */
  getAll: async (token, page = 1, perPage = 6) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          ...commonHeaders,
          ...getAuthHeader(token),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch employees');
      }

      return {
        data: data.data || [],
        total: data.total || 0,
        page: data.page || 1,
        total_pages: data.total_pages || 1,
        per_page: data.per_page || perPage
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get employee by ID
   * @param {string} id - Employee ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} - Employee data
   */
  getById: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          ...commonHeaders,
          ...getAuthHeader(token),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch employee');
      }

      return data.data || {};
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new employee
   * @param {Object} employeeData - Employee data
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} - Created employee data
   */
  create: async (employeeData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          ...commonHeaders,
          ...getAuthHeader(token),
        },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create employee');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update employee
   * @param {string} id - Employee ID
   * @param {Object} employeeData - Updated employee data
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} - Updated employee data
   */
  update: async (id, employeeData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          ...commonHeaders,
          ...getAuthHeader(token),
        },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update employee');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete employee
   * @param {string} id - Employee ID
   * @param {string} token - Authentication token
   * @returns {Promise<void>}
   */
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          ...commonHeaders,
          ...getAuthHeader(token),
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete employee');
      }
    } catch (error) {
      throw error;
    }
  },
};