import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/Groups.less");
const meta = {
    title: "Groups",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Groups"
        }
    }
};

interface IGroupsProps {}
interface IGroupsState {}

export default class GroupsEntry extends React.Component<IGroupsProps, IGroupsState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.groups}>
                    <DocumentMeta {...meta} />
                    Groups
                </div>
            </>
        );
    }
}
