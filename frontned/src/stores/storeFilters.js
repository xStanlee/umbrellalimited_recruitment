import { reactive } from "vue";
import { serviceTable } from "../services/ServiceTable";

//Unnecessary to use pinia for this
export const storeFilters = reactive({
    sourceCountryFilters: [...serviceTable.records],
    destinationCountryFilters: [...serviceTable.records],

    setSourceCountryFilters(filters) {
        this.clearFilters(this.sourceCountryFilters);
        Object.assign(this.sourceCountryFilters, filters);
    },

    setDestinationCountryFilters(filters) {
        this.clearFilters(this.destinationCountryFilters);
        Object.assign(this.destinationCountryFilters, filters);
    },

    clearFilters(filters) {
        filters.length = 0;
    }
});