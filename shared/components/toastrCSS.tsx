import * as React from "react"
import { Styler } from "./styler"
const rules = require("-!raw-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css")
export const ToastrCSS = () => <Styler rules={rules} id="toaterCss" />
