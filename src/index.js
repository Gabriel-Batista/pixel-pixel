import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import ToolsReducer from './Reducers/ToolsReducer'
import CanvasReducer from './Reducers/CanvasReducer'
import HistoryReducer from './Reducers/HistoryReducer'
import UsersReducer from './Reducers/UsersReducer'
import ProjectsReducer from './Reducers/ProjectsReducer'
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    canvas: CanvasReducer,
    history: HistoryReducer,
    tools: ToolsReducer,
    users: UsersReducer,
    projects: ProjectsReducer
});

export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
