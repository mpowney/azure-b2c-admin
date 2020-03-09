import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";

const styles = require("styles/entries/Group.less");
const meta = {
    title: "Group",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Group"
        }
    }
};

interface IGroupProps {}
interface IGroupState {}

export default class GroupEntry extends React.Component<IGroupProps, IGroupState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navigation />
                <div className={styles.group}>
                    <DocumentMeta {...meta} />
                    Group
                </div>
            </>
        );
    }
}
