

WELCOME TO MY REACT DRAWING APP

Feel free to unleash your creativity.

How does this application operate?

1. Enter command in input 
2. Press send
3. If your command is validated, your drawing will be displayed in the canvas

What about pressing other buttons?

Clear: A clean empty canvas is displayed

Undo: Revert to the previous drawing

For example, current drawings shows big square, small square and horizontal line. Pressing undo, removes horizontal line, only big square and small square are left. 

Redo: Revert the undo command (only available when undo is pressed)

For example, current drawings shows big square, small square and horizontal line. Press undo, horizontal line is removed, only big square and small square are left. Press Redo, horizontal line is revived, drawing shows big square, small square and horizontal line.

What are some examples of operable commands?

Basic format: 
1. L x1 y1 x2 y2 
2. R x1 y1 x2 y2

Examples:
> L 150 100 350 300
> L 50 50 50 250
> R 80 20 200 200
> R 550 150 200 200

The Future of this creation:

> Command validation assisted by regular expression
> Save drawing (Java spring, MongoDb)
> Other drawing functions (circles, curvy lines, importing pictures etc)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<!-- ### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information. -->

<!-- 
### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
