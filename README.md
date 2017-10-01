# Code Development Project

## Install and run the application

This application depends on `NodeJS` and `npm` (developed on node version >= 8.x).

```
git clone https://rishijavia@bitbucket.org/rishijavia/filmstrip-gallery.git
```

### Terminal 1 (server)
```
cd server
```

**Install dependencies**
```
npm install
```

**Run tests**

Make sure that the server is not running for the tests to run as it starts its own server internally using `chai-http`.

```
npm test
```

**Start the server**

This command will start the server at `http://localhost:8081`
```
npm start
```

### Terminal 2 (client)
```
cd client
```

**Install dependencies**
```
npm install
```

**Run tests**
```
npm test
```

If you see the following error: `error while loading shared libraries: libfontconfig.so.1` install `libfontconfig1` using the following command: `sudo apt-get install libfontconfig1`

**Start the client**

This command will automatically open your browser window and start the client-side at `http://localhost:8080`
```
npm start
```

## Stack

### Server

The server is implemented using ExpressJS. The tests for server is written using MochaJS and ChaiJS. It has the following routes:

```
GET '/' : Returns a JSON array of all the data
GET '/images/large/<img-name>.jpg' : Returns corresponding large image
GET '/images/thumbnails/<img-name>.jpg' : Returns corresponding thumbnail image
```

Justification for routes:

1. The dataset and their meta-data is small, and thus the whole dataset can be served at once without any issues

2. How would I implement this if the dataset was big?
  - I would have a route that would only send data for the thumbnails that are visible on the page to reduce the load on the server and request fulfillment time
  - The next/previous button would call a route that would then return the next/previous 4 thumbnails
  - The highlighted template (one that is selected) would be one of the thumbnails, so it would be easy to update as its information would be already available to us

### Client

The client-side is implemented using VueJS with AxiosJS to request data from the server. The tests for client-side are written using KarmaJS and MochaJS.

The whole app is a single page application developed using only one Vue component.

I chose Vue because it is easy to learn and implement and they have good and easy to follow documentation.
