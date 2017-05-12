import * as React from "react"
import { asyncComponent } from 'react-async-component'

export default asyncComponent({
    resolve: () => Promise.resolve().then(() => require("./Product.tsx"))
});
