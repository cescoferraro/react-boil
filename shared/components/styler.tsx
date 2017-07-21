import * as React from "react"
export const Styler = ({ rules, id }) => {
    return (
        <style
            type="text/css"
            id={id}
            dangerouslySetInnerHTML={{ __html: rules }}
        />
    )
}
