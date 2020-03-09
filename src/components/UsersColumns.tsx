import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Shimmer } from "office-ui-fabric-react/lib/Shimmer";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

import ISortingInformation from "common/utils/ISortingInformation";

export default class UsersColumns {
    public Columns(
        onColumnClick: any,
        sorting: ISortingInformation[],
        isLoading: boolean
    ): IColumn[] {
        let columns = [
            {
                key: `column1`,
                name: "Display name",
                fieldName: "displayName",
                minWidth: 100,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                sortAscendingAriaLabel: "Sorted A to Z",
                sortDescendingAriaLabel: "Sorted Z to A",
                data: "string",
                onColumnClick: (event: any, column: any) => {
                    onColumnClick(event, column);
                },
                onRender: (item: MicrosoftGraph.User) => {
                    return isLoading ? (
                        <Shimmer width={`${60 + Math.floor(Math.random() * 20)}%`} />
                    ) : (
                        <>{item.displayName}</>
                    );
                },
                isPadded: true
            },
            {
                key: `column2`,
                name: "Username",
                fieldName: "userPrincipalName",
                minWidth: 90,
                maxWidth: 150,
                isResizable: true,
                sortAscendingAriaLabel: "Sorted A to Z",
                sortDescendingAriaLabel: "Sorted Z to A",
                data: "string",
                onColumnClick: (event: any, column: any) => {
                    onColumnClick(event, column);
                },
                onRender: (item: MicrosoftGraph.User) => {
                    return isLoading ? (
                        <Shimmer width={`${50 + Math.floor(Math.random() * 10)}%`} />
                    ) : (
                        <>{item.userPrincipalName}</>
                    );
                },
                isPadded: true
            },
            {
                key: `column3`,
                name: "Email address",
                fieldName: "mail",
                minWidth: 120,
                maxWidth: 240,
                isResizable: true,
                isCollapsible: true,
                data: "string",
                onColumnClick: (event: any, column: any) => {
                    onColumnClick(event, column);
                },
                onRender: (item: MicrosoftGraph.User) => {
                    return isLoading ? <Shimmer width={`${70 + Math.floor(Math.random() * 10)}%`} /> : <>{item.mail}</>;
                },
                isPadded: true
            }
        ];

        return columns.map(column => {
            const sortField = sorting.filter(sort => {
                return sort.fieldName === column.fieldName;
            });
            if (sortField.length > 0) {
                return { ...column, ...sortField[0] };
            } else {
                return { ...column };
            }
        });
    }
}
