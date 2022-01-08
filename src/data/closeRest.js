class CloseRest {
    static host = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8087/api/";

    static rest(req) {
        return new Promise(resolve => {
            fetch(`${this.host}${req}`, {
                headers: {
                    "Authorization": "Basic YWRtaW46c21hcnRob21l",
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
                    if (d.error !== 0) {
                        console.error(d.message);
                        resolve();
                    }
                    else {
                        resolve(d.data);
                    }
                })
                .catch(e => {
                    console.error(e);
                    resolve();
                });
        });
    }

    static sse(req, cb) {
        const evt = new EventSource(`${this.host}${req}`, {
            withCredentials: true,
        });
        evt.addEventListener("message", e => cb(e.data));
        return _ => evt.close();
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

    static varSet(id, val) {
        return new Promise(resolve => {
            this.rest(`var/set?q=${encodeURIComponent(id)}&v=${encodeURIComponent(val)}`).then(resolve);
        });
    }

    static varSub(id, cb) {
        const close = this.sse(`var/sub?q=${encodeURIComponent(id)}`, cb);
        return _ => close();
    }

    static setup() {
        return new Promise(resolve => {
            this.rest("setup").then(resolve);
        });
    }
}

export default CloseRest;
