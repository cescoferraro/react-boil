import * as React from "react"

export const Item = ({ CSS, icon, title, value }) => {
    return (
        <div className={CSS.item}>
            <div className={CSS.itemIcon}>
                {icon}
            </div>
            <div className={CSS.itemText}>
                <a className={CSS.key}> {title} </a>
                <a className={CSS.value}> {value} </a>
            </div>
        </div>
    )
}
