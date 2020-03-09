import Home from "entries/Home";
import NotFound from "entries/NotFound";
import DeletedGroups from "entries/DeletedGroups";
import DeletedUsers from "entries/DeletedUsers";
import Group from "entries/Group";
import Groups from "entries/Groups";
import User from "entries/User";
import Users from "entries/Users";

const routes = [
    { path: "/", exact: true, component: Home },
    { path: "/users", exact: true, component: Users },
    { path: "/users/:user", exact: true, component: User },
    { path: "/deletedusers", exact: true, component: DeletedUsers },
    { path: "/deletedusers/:user", exact: true, component: User },
    { path: "/groups", exact: true, component: Groups },
    { path: "/groups/:group", exact: true, component: Group },
    { path: "/deletedgroups", exact: true, component: DeletedGroups },
    { path: "/deletedgroups/:group", exact: true, component: Group },
    { path: "", exact: false, component: NotFound }
];

export default routes;
