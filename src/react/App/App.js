import React, { Component } from 'react';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Journal from "../Journal/Journal";

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <Switch>
                        <Route
                            exact
                            path="/journal"
                            component={Journal}
                        />
                        <Route
                            exact
                            path="/article"
                            component={Journal}
                        />
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;
