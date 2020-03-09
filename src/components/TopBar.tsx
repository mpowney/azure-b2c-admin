import * as React from "react";
import { IconButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Panel } from "office-ui-fabric-react/lib/Panel";

import { LogFactory } from "common/utils/InitLogger";

const styles = require("styles/components/TopBar.less");
const log = LogFactory.getLogger("TopBar.tsx");

interface ITopBarProps {
    userLoggedIn: boolean;
    loginHandler: any;
}
interface ITopBarState {
    expanded: boolean;
}

export class TopBar extends React.Component<ITopBarProps, ITopBarState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);

        this.userButtonClick = this.userButtonClick.bind(this);
        this.dismissPanelClick = this.dismissPanelClick.bind(this);
        this.startLogin = this.startLogin.bind(this);

        this.state = {
            expanded: false
        };

    }

    private userButtonClick() {
        log.debug(`userButtonClick() executing`);
        this.setState({
            expanded: true
        });
    }

    private dismissPanelClick() {
        log.debug(`dismissPanelClick() executing`);
        this.setState({
            expanded: false
        });
    }

    private startLogin() {
        log.debug(`startLogin() executing`);
        this.props.loginHandler();

    }

    render() {
        log.debug(`render() executing`);

        return (
            <div className={styles.TopBar}>
                <div className={styles.AccountButton}>
                    <IconButton
                        onClick={this.userButtonClick}
                        iconProps={{ iconName: this.props.userLoggedIn ? `UserFollowed` : `UserOptional` }}
                        styles={{ root: { width: 50, height: 50, color: "#fff" }, icon: { fontSize: 24 } }} />

                    <Panel
                        headerText={this.props.userLoggedIn ? `Logged in to Azure B2C` : `Login to Azure B2C`}
                        isOpen={this.state.expanded}
                        onDismiss={this.dismissPanelClick}
                        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                        closeButtonAriaLabel="Close">

                        {this.props.userLoggedIn ?
                            <></>
                        :
                            <>
                                <p>To continue, please login to Azure B2C</p>
                                <PrimaryButton
                                    text={`Login`}
                                    onClick={this.startLogin} />
                            </>
                        }

                    </Panel>

                </div>
            </div>
        );
    }
}

export default TopBar;
