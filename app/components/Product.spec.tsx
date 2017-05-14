import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
declare const it, expect: any;
const Product = require("./Product.tsx").default

it('CheckboxWithLabel changes the text after click', () => {
    const checkbox = renderer.create(
        <Product id={22} />
    );
});
