import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ProjectsView from './views/ProjectsView';
import ProjectView from './views/ProjectView';
import SignInView from './views/SignInView';
import HelloWorld from './views/HelloWorld';
import LogOutView from './views/LogOutView';
import AuthRouter from "./components/AuthRouter";
import AuthService from "./services/AuthService";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },

    palette: {
        primary: {
            main: '#666',
        },
        secondary: {
            main: '#c1d82f'
        }
    },
});

function AppRouter() {
    AuthService.init()

    let history = createBrowserHistory({ forceRefresh: true });
    
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Route path="/" exact render={() => history.push({pathname: '/login'})}/>
                <Route path="/helloWorld" exact component={HelloWorld} />
                <Route path="/login" exact component={SignInView} />
                <Route path="/logout" exact component={LogOutView} />
                <AuthRouter path="/projects" exact component={ProjectsView} />
                <AuthRouter path="/projects/:projectId" exact component={ProjectView} />
            </Router>
        </ThemeProvider>
    );
}

export default AppRouter;
