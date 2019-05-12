import React from 'react'
import { Route } from 'react-router-dom'

import Metadata from '../containers/Datascience/Metadata/Metadata'
import Datasource from '../components/Datascience/Metadata/Datasource/Datasource'
import DataTraining from '../containers/Datascience/DataTraining/DataTraining'

const DatascienceRoute = (props) => {
    return (
        <div>
            <Route exact path="/datascience/metadata" component={Metadata} />
            <Route exact path="/datascience/metadata/:datasourceId" component={Datasource} />
            <Route exact path="/datascience/lab" component={DataTraining} />
        </div>
    )
}

export default DatascienceRoute;