import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/DeletedGroups.less");
const meta = {
    title: "Deleted Groups",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Deleted Groups"
        }
    }
};

interface IDeletedGroupsProps {}
interface IDeletedGroupsState {}

export default class DeletedGroupsEntry extends React.Component<
    IDeletedGroupsProps,
    IDeletedGroupsState
> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.deletedGroups}>
                    <DocumentMeta {...meta} />
                    Deleted Groups
                </div>
            </>
        );
    }
}
