import * as React from "react";
import DocumentMeta from "react-document-meta";
import Navigation from "components/Navigation";
import { Header } from "components/Header";

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
                <main id={`viewport`} className={styles.user}>
                    <DocumentMeta {...meta} />
                    <Header />
                    User
                </main>
            </>
        );
    }
}
