// src/redux/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mobileMenuOpen: false,
    notifications: []
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },
        setMobileMenu: (state, action) => {
            state.mobileMenuOpen = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        }
    }
});

export const {
    toggleMobileMenu,
    setMobileMenu,
    addNotification,
    removeNotification
} = uiSlice.actions;

export default uiSlice.reducer;