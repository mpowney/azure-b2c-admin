import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as Msal from "msal";

import { IS_NODE } from "../config/env";
import routes from "./routes";

import theme from "styles/theme";
import TopBar from "components/TopBar";
import { Customizations } from "@uifabric/utilities";
import { LogFactory } from "common/utils/InitLogger";

require("common/polyfill");
require("styles/global.less");
require("office-ui-fabric-core/dist/css/fabric.min.css");

const styles = require("styles/app.less");
const log = LogFactory.getLogger("app.tsx");

export const PACKAGE_NAME = "Application Name";
export const TENANT_NAME = "ticketingjam";
export const TENANT_ID = "b7be5cb8-ed3b-44c0-9ad5-9bb312432196";
export const CLIENT_ID = "f5ffdea3-d1d6-4eb4-9893-550d48219d0e";
export const POLICY_NAME = "B2C_1_signupsignin1";

export const Routes = routes;

export interface IAppProps {}
export interface IAppState {}

// Browser App entry
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }

    public async handleLogin() {

        log.debug(`handleLogin() executing`);

        const msalConfig = {
            auth: {
                clientId: `${CLIENT_ID}`,
                authority: `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com/${POLICY_NAME}`,
                validateAuthority: false
            }
        };

        const loginRequest = {
            // scopes: ['User.ReadWrite.All'] // optional Array<string>
            // scopes: ['openid']
        };

        const msalInstance = new Msal.UserAgentApplication(msalConfig);

        msalInstance.handleRedirectCallback((error, response) => {
            // handle redirect response or error
            if (error) {
                log.error(error.errorMessage);
            } else if (response) {
                log.debug(`Response from MSAL: ${response.account}`);
            }
        });

        try {
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            log.debug(`Access token: ${loginResponse.accessToken}`);
        } catch (err) {
            log.error(`Error occurred during loginPopup: ${err}`);
        }

    }

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
            <>
                <TopBar userLoggedIn={false} loginHandler={this.handleLogin} />
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
            </>
        );
    }
}

if (!IS_NODE) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
