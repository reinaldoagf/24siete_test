import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        selectedTab: 'todos',
    },
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload; // Actualiza la pestaña seleccionada
        },
    },
});
// Exportar la acción
export const { setSelectedTab } = tabsSlice.actions;

export default tabsSlice.reducer;