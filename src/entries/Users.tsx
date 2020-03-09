import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/Users.less");
const meta = {
    title: "Users",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Users"
        }
    }
};

interface IUsersProps {}
interface IUsersState {}

export default class UsersEntry extends React.Component<IUsersProps, IUsersState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.users}>
                    <DocumentMeta {...meta} />
                    Users
                </div>
            </>
        );
    }
}
