import * as React from "react"
const rules = require("-!raw-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css")
const Styler = ({ rules }) => {
    return (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: rules }}
        />
    )
}

export const ToastrCSS = () => <Styler rules={rules} />
