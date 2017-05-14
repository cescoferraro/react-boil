import * as React from "react"
import { asyncComponent } from 'react-async-component'

export default asyncComponent({
    resolve: () => require.ensure([], function(require) {
        var moment = require("./Product.tsx");
        console.log(moment().format());
    })


});
