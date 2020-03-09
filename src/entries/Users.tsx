import * as React from "react";
import DocumentMeta from "react-document-meta";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";

import Navigation from "components/Navigation";
import Header from "components/Header";
import { LogFactory } from "common/utils/InitLogger";
import UsersColumns from "components/UsersColumns";
import ISortingInformation from "common/utils/ISortingInformation";
import { IColumn, SelectionMode, DetailsListLayoutMode, DetailsList, ISelection } from "office-ui-fabric-react/lib/DetailsList";
import { User } from "@microsoft/microsoft-graph-types";

const log = LogFactory.getLogger("Users.tsx");
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

const commandBarItems = [
    {
        key: "adduser",
        text: "Add a user",
        iconProps: { iconName: "AddFriend" }
    },
    {
        key: "refresh",
        text: "Refresh",
        iconProps: { iconName: "Refresh" }
    },
    {
        key: "deleteuser",
        text: "Delete user",
        iconProps: { iconName: "Delete" }
    },
    {
        key: "resetpassword",
        text: "Reset password",
        iconProps: { iconName: "Permissions" }
    }
];

interface IUsersProps {}
interface IUsersPersistedState {
    usersSorting: ISortingInformation[];
    usersSearch: string;
}
interface IUsersState extends IUsersPersistedState {
    usersLoading: boolean;
    usersSourceData: User[];
    usersSearchData?: User[];
}

export default class UsersEntry extends React.Component<IUsersProps, IUsersState> {
    static STORE_CLASSES = [];

    constructor(props) {
        super(props);

        this.userColumnClick = this.userColumnClick.bind(this);

        const dummyUser: User = {
            mail: "dummy"
        };

        this.state = {
            usersSorting: [],
            usersLoading: true,
            usersSearch: "",
            usersSourceData: [
                dummyUser, dummyUser, dummyUser, dummyUser, dummyUser
            ]
        };
    }

    private _selection: ISelection;
    private _getKey(item: any, index?: number): string {
        log.debug(`_getKey() executed with item ${JSON.stringify(item)} and index ${index}`);
        return item.key;
    }

    private renderSearchBox() {
        return (<SearchBox
            styles={{ root: { marginTop: 4, width: 180 } }}
            placeholder="Search"
            onSearch={newValue => log.debug(`Search with value ${newValue}`)}
            onFocus={() => log.debug("Search onFocus called")}
            onBlur={() => log.debug("Search onBlur called")}
            onChange={() => log.debug("Search onChange called")}
          />);
    }

    private userColumnClick = (
        ev: React.MouseEvent<HTMLElement>,
        column: IColumn
    ): void => {
        log.debug(
            `userColumnClick() executed with column ${JSON.stringify(
                column
            )}, event target ${JSON.stringify(ev.pageY)}`
        );

        const currentSorting: ISortingInformation[] = this.state.usersSorting;
        let newSorting: (ISortingInformation | undefined)[] = [];
        if (
            currentSorting.filter(currentSort => {
                return currentSort.fieldName === column.fieldName;
            }).length > 0
        ) {
            newSorting = currentSorting.map(currentSortingColumn => {
                if (currentSortingColumn.fieldName === column.fieldName) {
                    if (currentSortingColumn.isSortedDescending) {
                        return undefined;
                    } else {
                        return {
                            fieldName: currentSortingColumn.fieldName,
                            isSorted: true,
                            isSortedDescending: !currentSortingColumn.isSortedDescending
                        };
                    }
                } else {
                    return currentSortingColumn;
                }
            });
        } else if (column.fieldName !== undefined) {
            newSorting.push({
                fieldName: column.fieldName,
                isSorted: true,
                isSortedDescending: false
            });
        }

        this.setState({
            usersSorting: newSorting.filter(sort => {
                return sort !== undefined;
            }) as ISortingInformation[]
        });
    };

    render() {
        const commandBarFarItems = [
            {
                key: "searchBox",
                onRender: this.renderSearchBox.bind(this)
            },
            {
                key: "filter",
                text: "Filter",
                iconProps: { iconName: "Filter" }
            }
        ];

        const columns = new UsersColumns();
        const items = this.state.usersSourceData;

        // const items = this._applySorting(
        //     (this.state.usersSearchData || this.state.usersSourceData)
        // );

        return (
            <>
                <Navigation />
                <main id={`viewport`} className={styles.users}>
                    <DocumentMeta {...meta} />
                    <Header />
                    <h1>Active Users</h1>
                    <CommandBar styles={{ root: { padding: 0 } }}
                        items={commandBarItems}
                        farItems={commandBarFarItems} />

                    <DetailsList
                        items={items}
                        compact={false}
                        columns={columns.Columns(
                            this.userColumnClick,
                            this.state.usersSorting,
                            this.state.usersLoading
                        )}
                        selectionMode={SelectionMode.multiple}
                        getKey={this._getKey}
                        setKey="multiple"
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        isHeaderVisible
                        selection={this._selection}
                        selectionPreservedOnEmptyClick
                        // onItemInvoked={this._onItemInvoked}
                        enterModalSelectionOnTouch
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                    />

                </main>
            </>
        );
    }
}
