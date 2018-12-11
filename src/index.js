import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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
