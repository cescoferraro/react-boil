import Subheader from "material-ui/Subheader"
import * as cs from "classnames"
import * as React from "react"
import AppBar from "material-ui/AppBar"
import * as CSS from "./shell.css"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
const BoilLogo = require("../../images/boil.svg")
const Cancel = require("../../images/cancel.svg")
const Boy = require("../../images/boy.svg")
const Girl = require("../../images/girl.svg")
import ReduxToastr from "react-redux-toastr"

export const Shell = (props) => {
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
    return (
        <div>
            <AppBar
                showMenuIconButton={false}
                onTitleTouchTap={goBack}
                iconElementRight={boilLogo}
                title="React-Boil"
            />
            <div className={CSS.container}>
                {props.children}
            </div>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates={true}
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar={true}
            />
            <Drawer
                onRequestChange={closeOnClick}
                docked={false}
                open={props.drawer}
            >
                <div className={cs(CSS.flex, CSS.main)}>
                    <BoilLogo
                        onClick={goBack}
                        className={cs(CSS.svg)}
                    />
                </div>
                <Subheader>React-boil</Subheader>
                <MenuItem
                    leftIcon={<Boy className={CSS.button} />}
                    onClick={goUser(432)}
                >
                    User 123
                </MenuItem>
                <MenuItem
                    leftIcon={<Girl className={CSS.button} />}
                    onClick={goUser(324)}
                >
                    User 456
                </MenuItem>
                <MenuItem
                    role="ksdjnf"
                    leftIcon={<Cancel className={CSS.button} />}
                    onClick={props.DRAWER_TOGGLE_ACTION}
                >
                    Close
                </MenuItem>
            </Drawer>
        </div>
    )
}
