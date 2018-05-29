import { h, Component } from 'preact'; /** @jsx h */

import { SearchResults } from '../search-results/search-results';

export class SearchBox extends Component {
    state = {
        text: this.props.query || ''
    };
    render(props, { text }) {
        return (
            <div {...props}>
                <header>
                    <h1>Github Search</h1>
                    <input
                        type="search"
                        value={ text}
                        onInput={ this.handleSearch.bind(this) }
                    />
                </header>
                <main>
                    <SearchResults query={text} />
                </main>
            </div>
        );
    }

    handleSearch(e) {
        this.setState({ text: e.target.value });
    }
}