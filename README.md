Live version: http://marianban.github.io/

# Possible improvements

- react-select has performance issues with large datasets 1000+ https://github.com/JedWatson/react-select/issues/3128. Could be fixed by custom menu item and virtualized components (https://github.com/bvaughn/react-virtualized).
- d3 is referenced as a single dependency - affects final js bundle size. Can be fixed by using individual d3 packages (d3-scale, ...)
- path rendering performance can be optimized with https://mourner.github.io/simplify-js/
- add automated tests (unit, e2e - cypress.io has visual regression tests which can be used for graphs)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
