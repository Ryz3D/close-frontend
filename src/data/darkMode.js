import CloseRest from "./closeRest";

class DarkMode {
    static subClose;
    static callback;

    static checkConstant(cb) {
        const dark = parseInt(localStorage.getItem("dark")) || 0;
        const darkVar = localStorage.getItem("darkVar") || "";

        if (dark !== 2 || !darkVar) {
            this.lastVar = "";
            if (cb) {
                cb(dark === 1);
            }
            return true;
        }
        else {
            return false;
        }
    }

    static processData(d, cb) {
        if (!this.checkConstant(cb)) {
            const darkAbove = parseInt(localStorage.getItem("darkAbove")) || false;
            const darkLimit = localStorage.getItem("darkLimit") || 0;

            if (cb) {
                cb(darkAbove ? parseFloat(d) > darkLimit : parseFloat(d) < darkLimit);
            }
        }
    }

    static isDark(cb) {
        if (this.subClose) {
            this.subClose();
        }
        if (!this.checkConstant(cb)) {
            const darkVar = localStorage.getItem("darkVar") || "";
            this.subClose = CloseRest.varSub(darkVar, d => this.processData(d, cb));
            CloseRest.varGet(darkVar).then(d => this.processData(d, cb));
        }
    }
}

export default DarkMode;
