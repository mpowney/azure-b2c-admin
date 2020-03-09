import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/User.less");
const meta = {
    title: "User",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "User"
        }
    }
};

interface IUserProps {}
interface IUserState {}

export default class UserEntry extends React.Component<IUserProps, IUserState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.user}>
                    <DocumentMeta {...meta} />
                    User
                </div>
            </>
        );
    }
}
