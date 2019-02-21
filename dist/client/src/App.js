"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./App.css");
const logo_svg_1 = require("./logo.svg");
;
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchDefaultTemplate();
    }
    render() {
        return (<div className="App">
        <header className="App-header">
          <logo_svg_1.default className="App-logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reloaddd.
        </p>
      </div>);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map