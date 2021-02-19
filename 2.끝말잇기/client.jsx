const React = require('react');
const ReactDom = require('react-dom');
import WordRelay_class from './WordRelay_class';
import WordRelay_hooks from './WordRelay_hooks';

ReactDom.render(<><WordRelay_hooks/></>, document.querySelector('#root'));