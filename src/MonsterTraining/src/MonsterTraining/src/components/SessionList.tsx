﻿import * as React from "react";
import { Session, SessionListState } from "./SessionData";
import { SessionDisplay } from "./SessionDisplay";
import { SelectedSessionList } from "./SelectedSessionList";

declare var Tippy: any;
 
var Sessions: Session[] = [
    { Name: "Entity Framework", Description: "If you've got data in a database and you need to get it out then Entity Framework Core is you best friend. In this session we'll cover the basics: building a data context, structuring entities and doing queries", Length: 2, Selected: false },
    { Name: "Introduction to .NET Core", Description: ".NET Core is a streamlined version of .NET which supports cross platform development and .NET Standard", Length: 1, Selected: false }
];

export class SessionList extends React.Component<undefined, SessionListState>
{
    constructor()
    {
        super();
        this.state = { Sessions: Sessions, SelectedSessions: [] };
        this.selectItem = this.selectItem.bind(this);
    }

    render() {
        var rows = [];
        for (var session of this.state.Sessions) {
            rows.push(<SessionDisplay Name={session.Name} Description={session.Description} Length={session.Length} key={session.Name} selectItem={this.selectItem} />);
        }
        return <div>
            <SelectedSessionList Sessions={this.state.SelectedSessions} />
            {rows}
        </div>
    }

    componentDidUpdate() {
        new Tippy("span");
    }

    selectItem(name: any) {
        var sessions = this.state.Sessions;

        var item = sessions.filter((x) => x.Name === name.target.attributes["data-key"].value)[0];
        item.Selected = name.target.checked;
        var selectedSessions = sessions.filter((x) => x.Selected);
        this.setState({ Sessions: sessions, SelectedSessions: selectedSessions });
    }
}
