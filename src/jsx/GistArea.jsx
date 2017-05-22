var React = require('react');
var ReactDOM = require('react-dom');

const github = require('octonode');

class GistArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gists: []};
  }

  getGistUser(){
    const settings = require('electron').remote.getGlobal('sharedObject');
    var gistUser = settings.gistUser;
    return gistUser;
  }

  handleCallback(err, status, body, headers){
    this.setState({gists: status});
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
      ghgist.user(pagination, user, this.handleCallback.bind(this));
      console.log('Loading user specific data.');
    }
  }

  componentDidMount() {
    this.loadData()
    console.log("componentDidMount.")
  }
  render() {
    var rows = [];
    console.log('Rendering data in GistArea.');
    this.state.gists.forEach(function(gist) {
      rows.push(<GistListItem gist={gist} key={gist.id} />);
    });
    return (
      <div className="row">
          <div className="col-sm-4 no-padding gist-column">
            <div className="list-group no-margin">{rows}</div>
          </div>
          <div className="col-sm-8 col-sm-offset-4 no-padding gist-area" id="fileview"></div>
      </div>);
  }
}

ReactDOM.render(<GistArea />, document.getElementById('container'));
