import * as React from "react"
import { Styler } from "../components/styler"
import { Scripter } from "../components/scripter";
const rules = require("-!raw-loader!./api.js")
export const PushComponent = () => <Scripter async={true} rules={rules} id="pushApi" />
