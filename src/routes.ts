import Home from "entries/Home";
import NotFound from "entries/NotFound";

const routes = [
    { path: "/", exact: true, component: Home },
    { path: "", exact: false, component: NotFound }
];

export default routes;
