var React = require('react');
var ReactDOM = require('react-dom');

const github = require('octonode');
const fullTextSearch = require('full-text-search');

class GistArea extends React.Component {
  constructor(props) {
    super(props);
    this.searchText = this.searchText.bind(this);
    this.search = new fullTextSearch();
    this.state = { gists: [], count: 0, term: null };
  }

  getGistUser(){
    const settings = require('electron').remote.getGlobal('sharedObject');
    var gistUser = settings.gistUser;
    return gistUser;
  }

  handleCallback(err, status, body, headers){
    // Add the gists to search index.
    var outSearch = this.search;
    status.forEach(function(gist) {
      outSearch.add(gist);
    });
    // Set the current state.
    this.setState({gists: status, count: status.length});
  }

  loadData(){
    console.log('Loading data for GistArea.');
    const client = github.client();
    const ghgist = client.gist();
    const pagination = {page: 1, per_page: 100};
    const user = this.getGistUser();
    if(!user) {
      console.warn('Global variable sharedObject.gistUser is not set. Using public gist.');
      ghgist.list(pagination, this.handleCallback.bind(this));
    } else {
      console.log('Loading user specific data.');
      ghgist.user(pagination, user, this.handleCallback.bind(this));
    }
  }

  componentDidMount() {
    this.loadData()
    console.log("GistArea componentDidMount.")
  }

  searchText(event){
    if(event) event.preventDefault();
    var results = this.search.search(this.input.value || 'gists');
    // Reset the text box value.
    this.setState({
      gists: results,
      count: results.length,
      term: `(Filter: ${this.input.value})`
    });
    this.input.value = ''; // Reset search box to blank.
    console.log('Search results: ', this.input.value, results);
  }
  render() {
    console.log('Rendering data in GistArea.');
    var rows = [];
    this.state.gists.forEach(function(gist) {
      rows.push(<GistListItem gist={gist} key={gist.id} />);
    });
    return (
      <div className="row">
          <div className="col-sm-4 no-padding gist-column">
            <div className="well well-sm no-margin">
              <form className="form-inline" onSubmit={this.searchText}>
                <input type="text" className="form-control" placeholder="Search" ref={(input) => this.input = input}  />
                <button type="submit" className="btn btn-default" >Search</button>
              </form>
            </div>
            <div className="well well-sm no-margin">Gists: {this.state.count} {this.state.term}</div>
            <div className="list-group no-margin">{rows}</div>
          </div>
          <div className="col-sm-8 col-sm-offset-4 no-padding gist-area" id="fileview"></div>
      </div>);
  }
}

ReactDOM.render(<GistArea />, document.getElementById('container'));
