import { h, render, cloneElement, Component } from 'preact'; /** @jsx h */

const SEARCH = '//api.github.com/search/repositories?q=';

export class SearchResults extends Component {
    render() {
        const { query } = this.props;
        return (
            <Fetch url={SEARCH+encodeURIComponent(query)} as="json">
                { ({ loading, data }) => (
                    <div class="items">
                        { (data && data.items || []).map( item => <Result {...item} /> ) }
                        { loading && <progress-spinner /> }
                    </div>
                ) }
            </Fetch>
        );
    }
}

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
    render({ children:[child] }, state) {
        return typeof child==='function' ? child(state) : cloneElement(child, state);
    }
}

const Result = ({ html_url, full_name, stargazers_count, description }) => (
    <div style="padding:15px; background:#FFF; border-bottom:1px solid #DDD;">
        <a href={html_url} target="_blank">{full_name}</a> 🌟 <b>{stargazers_count}</b>
        <div>{description}</div>
    </div>
);