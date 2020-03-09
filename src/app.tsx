import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import { IS_NODE } from "../config/env";
import routes from "./routes";

import theme from "styles/theme";
import { Customizations } from "@uifabric/utilities";

require("common/polyfill");
require("styles/global.less");
require("office-ui-fabric-core/dist/css/fabric.min.css");

const styles = require("styles/app.less");

export const PACKAGE_NAME = "Application Name";
export const Routes = routes;

export interface IAppProps {}
export interface IAppState {}

// Browser App entry
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {};
    }

    componentDidMount(): void {}

    render() {
        Customizations.applySettings({ theme: theme });
        initializeIcons();

        const renderMergedProps = (component, ...rest) => {
            const finalProps = Object.assign({}, ...rest);
            return React.createElement(component, finalProps);
        };

        const PropsRoute = ({ component, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={routeProps => {
                        return renderMergedProps(component, routeProps, rest);
                    }}
                />
            );
        };

        return (
            <div id={`appContainer`} className={styles.appContainer}>
                <BrowserRouter location={location}>
                    <Switch>
                        {routes.map((route: any, index) =>
                            route.redirect ? (
                                <Route key={index} exact={!!route.exact} path={route.path}>
                                    <Redirect key={index} from={route.path} to={route.redirect} />
                                </Route>
                            ) : (
                                <PropsRoute
                                    key={index}
                                    exact={!!route.exact}
                                    path={route.path}
                                    component={route.component}
                                />
                            )
                        )}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

if (!IS_NODE) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
