# People's Parcel App

In the interest of good business sense and to gain clarity:
This application is built for Peoples to tracking spending and requests and provide approval systems.
It will integrate technologies from familiar sources to make this work.

1. MongoDB
  * For storing the request data in a format that can be easily asscessed later
  * To allow for quick changes on the fly to future data models

2. React

3. Docusign API
  * For it's well documented API
  * Familiarity with people

4. AWS for easy deployment


## Service Design

The service will have a react frontend and be built upon deployment and served using a node js api to listen for requests and communicate with the docusign service. The page will always be up and waiting for clients to submit their request.
With the low usage expected it will be deployed on to AWS using their free tier T2 servers.


## Startup Script

In order for the server to start you need an env file
```
MONGO_INITDB_ROOT_USERNAME=*
MONGO_INITDB_ROOT_PASSWORD=*
DB_HOST=127.0.0.1
PORT=*
```


- `npm start` — This will spawn a development server with a default port of `3000`.
- `npm run build` — This will output a production build in the `dist` directory.

___
## nano-react-app-template

The template project for [nano-react-app](https://github.com/adrianmcli/nano-react-app).

- `npm start` — This will spawn a development server with a default port of `1234`.
- `npm run build` — This will output a production build in the `dist` directory.

### Custom port

You can use the `-p` flag to specify a port for development. To do this, you can either run `npm start` with an additional flag:

```
npm start -- -p 3000
```

Or edit the `start` script directly:

```
parcel index.html -p 3000
```

### Adding styles

You can use CSS files with simple ES2015 `import` statements in your Javascript:

```js
import "./index.css";
```

### Babel transforms

The Babel preset [babel-preset-nano-react-app](https://github.com/adrianmcli/babel-preset-nano-react-app) and a small amount of configuration is used to support the same transforms that Create React App supports.

The Babel configuration lives inside `package.json` and will override an external `.babelrc` file, so if you want to use `.babelrc` remember to delete the `babel` property inside `package.json`.
