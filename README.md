# First Person Blackjack written with React + React-babylonjs + MobX

## https://evo-blackjack.surge.sh/

Welcome to my version of first person blackjack!

My objective was to integrate 3D graphics from Babylonjs with JSX syntax and write code in the style of Reactjs, creating 3D objects as functional and reusable components.

If you are interested in exploring my blackjack app, i suggest starting your journey with the GameScene component, which is responsible for rendering all 3D and will help you understand better how Babylonjs is intagrated with the JSX syntax.

Updated version: https://github.com/Tvoncher/blackjack

## Local launch

1. Clone this repo: git clone https://github.com/Tvoncher/evo-blackjack
2. Run `yarn install` in the root folder
3. Run server with `yarn start`.
4. Enjoy coding.

### Available scripts

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

And yes, hot reload works fine even with babylonjs!

#### `yarn test`

Launches the test runner in the interactive watch mode.\
You can turn configure({ enforceActions: "always" }) in MainStore to 'never' to get rid of console warnings

#### `yarn test --coverage`

Add coverage flag to see coverage %

#### `yarn build`

Builds the app for production to the `build` folder.\
I suggest using https://surge.sh/ for future deployment as the easiest possible solution.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

#### Probably, you will need this to preconfigure jest. Right now it's fine,but keep in mind.

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
