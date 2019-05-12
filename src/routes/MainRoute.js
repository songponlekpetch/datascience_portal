import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../containers/Home/Home'
import Datascicence from '../containers/Datascience/Datascience'
import ConfirmEmail from '../containers/ConfirmEmail/ConfirmEmail'
import ResetPassword from '../containers/ResetPassword/ResetPassword'
import Test from '../containers/Test/Test'

const MainRoute = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/test" component={Test} />
                <Route exact path="/confirm/:userId" component={ConfirmEmail} />
                <Route exact path="/resetpassword/:userId" component={ResetPassword} />
                <Route path="/datascience" component={Datascicence} />
                <Route component={Home} />
            </Switch>

        </div>
    )
}

export default MainRoute;