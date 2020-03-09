import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/DeletedUsers.less");
const meta = {
    title: "Deleted Users",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Deleted Users"
        }
    }
};

interface IDeletedUsersProps {}
interface IDeletedUsersState {}

export default class DeletedUsersEntry extends React.Component<
    IDeletedUsersProps,
    IDeletedUsersState
> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.deletedUsers}>
                    <DocumentMeta {...meta} />
                    Deleted Users
                </div>
            </>
        );
    }
}
