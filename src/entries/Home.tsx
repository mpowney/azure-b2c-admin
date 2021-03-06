import * as React from "react";
import DocumentMeta from "react-document-meta";

const styles = require("styles/entries/Home.less");
const meta = {
    title: "Home",
    description: "",
    meta: {
        charset: "utf-8",
        name: {
            keywords: "Home"
        }
    }
};

interface HomeProps {}
interface HomeState {}

export default class HomeEntry extends React.Component<HomeProps, HomeState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.home}>
                <DocumentMeta {...meta} />
                Welcome
            </div>
        );
    }
}
