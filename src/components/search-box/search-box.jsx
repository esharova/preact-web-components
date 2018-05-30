import { h, Component } from 'preact'; /** @jsx h */
import cn from 'cn-decorator';

import { SearchResults } from '../search-results/search-results';
import './search-box.css';

@cn('search-box')
export class SearchBox extends Component {
    state = {
        text: this.props.query || ''
    };
    render(cn) {
        return (
            <div className={ cn() } { ...this.props }>
                <header>
                    <h1>Github Search</h1>
                    <input
                        type="search"
                        value={ this.state.text}
                        onInput={ this.handleSearch.bind(this) }
                    />
                </header>
                <main>
                    <SearchResults query={ this.state.text } />
                </main>
            </div>
        );
    }

    handleSearch(e) {
        this.setState({ text: e.target.value });
    }
}