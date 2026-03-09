import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { loginUser as apiLoginUser } from '../api/apiService';

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser));
                } else {
                    // Clear any partial/invalid data
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
                // Clear corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (credentials) => {
        setError(null);
        try {
            const response = await apiLoginUser(credentials);
            const { access, refresh, user: userData } = response.data;

            // Store tokens and user data
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Logout function
    const logout = useCallback(() => {
        // Clear all auth data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Clear user state
        setUser(null);
        setError(null);
    }, []);

    // Refresh token function
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
            logout();
            return false;
        }

        try {
            const response = await axiosInstance.post('/auth/token/refresh/', {
                refresh: refreshToken
            });

            const { access } = response.data;
            
            // Update access token
            localStorage.setItem('token', access);
            
            return true;
        } catch (err) {
            console.error('Token refresh failed:', err);
            // If refresh fails, logout the user
            logout();
            return false;
        }
    };

    // Check if user is authenticated
    const isAuthenticated = useCallback(() => {
        return !!user && !!localStorage.getItem('token');
    }, [user]);

    // Get current user data
    const getCurrentUser = useCallback(() => {
        return user;
    }, [user]);

    // Update user data
    const updateUserData = useCallback((updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }, [user]);

    // Context value
    const value = {
        user,
        loading,
        error,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated,
        getCurrentUser,
        updateUserData,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;