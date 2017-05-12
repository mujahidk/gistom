var React = require('react');
var ReactDOM = require('react-dom');

class GistArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gists: []};
  }

  getGistUrl(){
    var source = require('electron').remote.getGlobal('sharedObject').gistUrl;
    if(!source) {
      console.warn('Global variable sharedObject.gistUrl is not set. Using default.');
      source = 'https://api.github.com/gists';
    }
    return source;
  }

  loadData(){
    var that = this;
    loadUrlData(this.getGistUrl(), function(data){
      that.setState({gists: JSON.parse(data)});
    });
  }

  componentDidMount() {
    this.loadData()
    console.log("componentDidMount.")
  }
  render() {
    var rows = [];
    console.log('Rendering data.');
    this.state.gists.forEach(function(gist) {
      rows.push(<GistListItem gist={gist} key={gist.id} />);
    });
    return (
      <div className="row">
          <div className="col-sm-4 no-padding">
            <div className="list-group no-margin">{rows}</div>
          </div>
          <div className="col-sm-8 no-padding" id="fileview"></div>
      </div>);
  }
}

ReactDOM.render(
  <GistArea />,
  document.getElementById('container')
);
