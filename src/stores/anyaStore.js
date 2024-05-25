import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAnyaStore = defineStore('anya', () => {
    const anyaAPI = `https://api.anyafacts.com/fetch-news?rowsPerPage=24`;

    const state = reactive({
        anyaData: [],
        singleAnyaData: null,
        loading: false,
        error: null
    });

    const fetchAnyaData = async () => {
        try {
            state.loading = true;
            const response = await axios.get(anyaAPI);
            state.anyaData = response.data;
        } catch (error) {
            state.error = error.message;
        } finally {
            state.loading = false;
        }
    };

    const fetchSingleAnyaData = async (id) => {
        state.loading = true;
        console.log("fetchSingleAnyaData called with id:", id); // Debug log
        try {
            console.log("Current anyaData:", state.anyaData.data); // Debug log
            const item = state.anyaData.data.find(data => data.id === id);
            if (item) {
                state.singleAnyaData = item;
                console.log("Item found:", item); // Debug log
            } else {
                state.error = `Data with ID ${id} not found.`;
                state.singleAnyaData = null;
                console.log("Data not found, error:", state.error); // Debug log
            }
        } catch (error) {
            state.error = error.message;
            console.error(state.error); // Optionally log the error
        } finally {
            state.loading = false;
        }
    };
    

    return {
        state,
        fetchAnyaData,
        fetchSingleAnyaData
    };
});
