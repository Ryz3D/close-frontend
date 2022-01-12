# close-frontend

### The official frontend of [closedHAB](https://github.com/Ryz3D/closedHAB)!

This is the frontend part of the ["close" addon](https://github.com/Ryz3D/closedHAB/blob/master/setup/addons/close.js) for [closedHAB](https://github.com/Ryz3D/closedHAB). The addon also provides a REST/SSE API for closedHAB that this web app uses.

The layouts are provided by the server, you can find them in ``setup/addons/close/layouts``. To reload layouts you just need to refresh the web page.

It uses [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) for most components and [react-service-worker](https://github.com/maxjf1/react-service-worker) to provide a Progressive Web App.

You can run the two seperately by starting a React debug server (Port 3000 by default) and a closedHAB instance with the close addon on the same machine (Port 8087 by default). You might run into CORS issues though, as a different port is considered a different origin, for debugging enable ``cors: "localhost:3000"`` or ``cors: echo`` in your close setup.

If you want to host another frontend, just put it into ``setup/addons/close/public``. If it's a single-page site like this one, set the close setting ``notFoundPath: /``.
