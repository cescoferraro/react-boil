import * as React from "react"
import * as CSS from "./shell.css"
const BoilLogo = require("../../../shared/images/boil.svg")
/* const Cancel = require("../../../shared/images/cancel.svg")*/
/* const Boy = require("../../../shared/images/boy.svg")*/
/* const Girl = require("../../../shared/images/girl.svg")*/
import ReduxToastr from "react-redux-toastr"
import { withStyles, createStyleSheet } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"
import { compose } from "recompose"

export const Shell = compose(
    withStyles(createStyleSheet({
        flex: {
            flex: 1
        }
    }))
)((props) => {
    const goBack = () => {
        props.GO_HOME_ACTION()
        props.DRAWER_ACTION(false)
    }
    const goUser = () => {
        console.log(" <dsjfnsd></dsjfnsd>")
        const rand = Math.floor(Math.random() * 10000)
        console.log(rand)
        props.USER_ACTION(rand)
        props.DRAWER_ACTION(false)
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        onClick={goBack}
                        type="title"
                        color="inherit"
                        className={props.classes.flex}
                    >
                        React-boil
                    </Typography>

                    <BoilLogo
                        onClick={goUser}
                        className={CSS.button}
                    />
                </Toolbar>
            </AppBar>
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
        </div>
    )
})
