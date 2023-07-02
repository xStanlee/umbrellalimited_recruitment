import { reactive } from "vue";

//Unnecessary to use pinia for this
export const storeHeaders = reactive({
    row: "",
    column: "",
    errorId: null,

    setHeaders(row, column) {
        this.row = row;
        this.column = column;
    },

    resetHeaders() {
        this.row = "";
        this.column = "";
    },

    setErrorId(id) {
        this.errorId = id;
    },

    resetErrorId() {
        this.errorId = null;
    }
});