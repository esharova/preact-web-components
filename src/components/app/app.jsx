import { h, Component } from 'preact'; /** @jsx h */

import { SearchBox } from '../search-box/search-box';

export class App extends Component {
    render() {
        return (
            <SearchBox query={ this.props.query }/>
        );
    }
}
