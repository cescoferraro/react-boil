import { ListSubheader } from 'material-ui/List'
import * as cs from "classnames"
import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
import Drawer from "material-ui/Drawer"
import Menu, { MenuItem } from 'material-ui/Menu';
const BoilLogo = require("../../../shared/images/boil.svg")
const Cancel = require("../../../shared/images/cancel.svg")
const Boy = require("../../../shared/images/boy.svg")
const Girl = require("../../../shared/images/girl.svg")
import { withStyles, createStyleSheet } from 'material-ui/styles';
/* import ReduxToastr from "react-redux-toastr-cesco"*/
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
const styleSheet = createStyleSheet({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
});

export const Shell = withStyles(styleSheet)((props) => {
    const closeOnClick = (open) => { props.DRAWER_ACTION(open) }
    const boilLogo = (
        <BoilLogo
            onClick={props.DRAWER_TOGGLE_ACTION}
            className={CSS.button}
        />
    )
    const goBack = () => {
        props.GO_HOME_ACTION()
        props.DRAWER_ACTION(false)
    }
    const goUser = (id) => () => {
        props.USER_ACTION(id)
        props.DRAWER_ACTION(false)
    }
    const classes = props.classes;
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Title
          </Typography>

                        <BoilLogo
                            onClick={props.DRAWER_TOGGLE_ACTION}
                            className={CSS.button}
                        />
                    </Toolbar>
                </AppBar>
            </div>
            <div className={CSS.container}>
                {props.children}
            </div>
            <Drawer
                docked={false}
                open={props.drawer}
            >
                <div className={cs(CSS.flex, CSS.main)}>
                    <BoilLogo
                        onClick={goBack}
                        className={cs(CSS.svg)}
                    />
                </div>
                <ListSubheader>React-boil</ListSubheader>
                <MenuItem
                    onClick={goUser(432)}
                >
                    User 123
                </MenuItem>
                <MenuItem
                    onClick={goUser(324)}
                >
                    User 456
                </MenuItem>
                <MenuItem
                    role="ksdjnf"
                    onClick={props.DRAWER_TOGGLE_ACTION}
                >
                    Close
                </MenuItem>
            </Drawer>
        </div>
    )
}
)
