var React = require('react');
var ReactDOM = require('react-dom');

function GistFile(props){
  const link = `javascript:openUrl('${props.file.raw_url}')`
  const copyTo = `javascript:showAndCopyUrlText('${props.file.raw_url}')`
  return (
    <span>{props.file.language}:
      <a href={copyTo}>{props.file.filename}</a><a href={link}>(Open)</a>
    </span>);
}

class GistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    var gist = this.props.gist;
    var files = [];
    for(var key in gist.files){
      var info = gist.files[key];
      files.push(<GistFile key={info.filename} file={info} />);
    }
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{gist.description}</h4>
        <p className="list-group-item-text">{files}</p>
      </div>);
  }
}

class ListGists extends React.Component {
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
      rows.push(<GistItem gist={gist} key={gist.id} />);
    });
    return (
      <div className="row">
          <div className="col-sm-4">
            <div className="list-group">{rows}</div>
          </div>
          <div className="col-sm-8 fileview" id="fileview">View area</div>
      </div>);
  }
}

ReactDOM.render(
  <ListGists />,
  document.getElementById('container')
);

function showAndCopyUrlText(url){
  copyToClipboard(url, function(data){
    document.getElementById('fileview').innerText = data
  });
}
