import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {postGraduate} from './postGraduate'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'

function Home()
{
    return(
        <Router>
         <Route path="/postGraduate" exact  component={postGraduate}/>
         <Route path="/" exact  component={App}/>
        <div className='Home'>
         

        </div>
        </Router>

    );
}

ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));

serviceWorker.unregister();
