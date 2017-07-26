import Subheader from "material-ui/Subheader"
import * as cs from "classnames"
import * as React from "react"
import AppBar from 'material-ui/AppBar'
import FlatButton from "material-ui/FlatButton"
import * as CSS from "./shell.css"
import Link from 'redux-first-router-link'
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
const BoilLogo = require("../../images/boil.svg");
const Cancel = require("../../images/cancel.svg");
const Boy = require("../../images/boy.svg");
const Girl = require("../../images/girl.svg");
import { isServer } from "../../../store/logger"
import ReduxToastr from 'react-redux-toastr'

export const Shell = (props) => {
    return (
        <div>
            <AppBar
                showMenuIconButton={false}
                onTitleTouchTap={() => {
                    props.dispatch({ type: "HOME" })
                    props.DRAWER_ACTION(false)
                }}
                iconElementRight={
                    <BoilLogo
                        onClick={props.DRAWER_TOGGLE_ACTION}
                        className={CSS.button}
                    />
                }
                title="React-Boil" />
            <div className={CSS.container}>
                {props.children}
            </div>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar />
            <Drawer
                onRequestChange={open => { props.DRAWER_ACTION(open) }}
                docked={false}
                open={props.drawer}
            >
                <div className={cs(CSS.flex, CSS.main)}>
                    <BoilLogo
                        onClick={() => {
                            props.GO_HOME_ACTION()
                            props.DRAWER_ACTION(false)
                        }}
                        className={cs(CSS.svg)}
                    />
                </div>
                <Subheader>React-boil</Subheader>
                <MenuItem
                    leftIcon={<Boy className={CSS.button} />}
                    onClick={() => {
                        props.USER_ACTION(6542)
                        props.DRAWER_ACTION(false)
                    }}
                >
                    User 123
                </MenuItem>
                <MenuItem
                    leftIcon={<Girl className={CSS.button} />}
                    onClick={() => {

                        props.USER_ACTION(6534)
                        props.DRAWER_ACTION(false)
                    }}
                >
                    User 456
                </MenuItem>
                <MenuItem
                    role="ksdjnf"
                    leftIcon={<Cancel className={CSS.button} />}
                    onClick={props.DRAWER_TOGGLE_ACTION} >
                    Close
                </MenuItem>
            </Drawer>
        </div>
    )
}
