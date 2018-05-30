import { h, render, cloneElement, Component } from 'preact'; /** @jsx h */
import cn from 'cn-decorator';

import './search-results.css';

const SEARCH = '//api.github.com/search/repositories?q=';

@cn('search-results')
export class SearchResults extends Component {
    render(cn) {
        const { query } = this.props;
        return (
            <Fetch className={ cn() } url={SEARCH+encodeURIComponent(query)} as="json">
                { ({ loading, data }) => (
                    <div className={ cn('items') }>
                        { (data && data.items || []).map( item => <Result {...item} /> ) }
                        { loading && <progress-spinner /> }
                    </div>
                ) }
            </Fetch>
        );
    }
}

// FIXME: dirty hack (use redux for this purpose)
class Fetch extends Component {
    state = { loading:true };
    cache = {};

    componentDidUpdate({ url }) {
        if (url!==this.props.url) this.componentWillMount();
    }
    componentWillMount() {
        let { url, as } = this.props;
        this.setState({ loading:true });
        (this.cache[url] || (this.cache[url] = fetch(url).then( r => r[as]() )))
            .then( data => this.setState({ loading:false, data }) );
    }
    render() {
        return typeof this.props.children[0] ==='function'
            ? this.props.children[0](this.state)
            : cloneElement(this.props.children[0], this.state);
    }
}

const Result = ({ html_url, full_name, stargazers_count, description }) => (
    <div style="padding:15px; background:#FFF; border-bottom:1px solid #DDD;">
        <a href={html_url} target="_blank">{full_name}</a> 🌟 <b>{stargazers_count}</b>
        <div>{description}</div>
    </div>
);