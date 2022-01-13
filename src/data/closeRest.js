class CloseRest {
    static host = process.env.NODE_ENV === "production" ? "/api/" : `${window.location.protocol}//${window.location.hostname}:8087/api/`;
    static auth = "";
    static varCb = {};
    static subConnection;

    static rest(req) {
        return new Promise(resolve => {
            fetch(`${this.host}${req}`, {
                headers: {
                    "Authorization": `Basic ${this.auth}`,
                },
            })
                .then(r => {
                    switch (r.status) {
                        case 200:
                            return r.json();
                        case 403:
                            console.error(`Forbidden: ${req}`);
                            resolve();
                            return;
                        default:
                            console.error(r.status, r.text());
                            resolve();
                            return;
                    }
                })
                .then(d => {
                    if (d === undefined) {
                        resolve();
                    }
                    else {
                        if (d.error !== 0) {
                            if (d.message !== "uninitialized") {
                                console.error("Close", d.error, d.message);
                            }
                            resolve();
                        }
                        else {
                            resolve(d.data);
                        }
                    }
                })
                .catch(e => {
                    console.error(e);
                    resolve();
                });
        });
    }

    static layoutList() {
        return new Promise(resolve => {
            this.rest(`layout/list`).then(resolve);
        });
    }

    static layoutGet(id) {
        return new Promise(resolve => {
            this.rest(`layout/get?q=${encodeURIComponent(id)}`).then(resolve);
        });
    }

    static layoutHome() {
        return new Promise(resolve => {
            this.rest("layout/home").then(resolve);
        });
    }

    static varList() {
        return new Promise(resolve => {
            this.rest(`var/list`).then(resolve);
        });
    }

    static varGet(id) {
        return new Promise(resolve => {
            this.rest(`var/get?q=${encodeURIComponent(id)}`).then(resolve);
        });
    }

    static varSet(id, val, force = false) {
        return new Promise(resolve => {
            this.rest(`var/set?q=${encodeURIComponent(id)}&v=${encodeURIComponent(val)}&f=${force ? '1' : '0'}`).then(resolve);
        });
    }

    static varSubConnected() {
        if (this.subConnection !== undefined && this.subConnection !== null) {
            return this.subConnection.readyState === this.subConnection.OPEN;
        }
        return false;
    }

    static varSubConnect() {
        return new Promise(resolve => {
            if (this.varSubConnected()) {
                resolve(_ => { });
            }
            else {
                this.subConnection = new EventSource(`${this.host}var/sub?a=${encodeURIComponent(`Basic ${this.auth}`)}`, {
                    withCredentials: true,
                });
                this.varList()
                    .then(vars => {
                        if (vars !== undefined) {
                            for (var v of vars) {
                                const idBuf = v;
                                this.subConnection.addEventListener(v, e => {
                                    if (this.varCb[idBuf] !== undefined) {
                                        for (var cb of this.varCb[idBuf]) {
                                            if (cb !== undefined) {
                                                cb(e.data);
                                            }
                                        }
                                    }
                                });
                            }
                            resolve(_ => this.subConnection.close());
                        }
                        resolve();
                    });
            }
        });
    }

    static varSub(id, cb) {
        if (this.varCb[id] === undefined) {
            this.varCb[id] = [];
        }
        const index = this.varCb[id].push(cb) - 1;
        return _ => this.varCb[id][index] = undefined;
    }

    static setup() {
        return new Promise(resolve => {
            this.rest("setup").then(resolve);
        });
    }
}

export default CloseRest;
