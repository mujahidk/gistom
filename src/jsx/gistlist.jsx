var React = require('react');
var ReactDOM = require('react-dom');

function GistFile(props){
  return (<div><span>{props.language}: <a href={props.raw_url}>{props.file}</a></span></div>);
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
      console.log('Loading files for each gist: ' + key);
      var info = gist.files[key];
      files.push(<GistFile key={info.filename} file={key} language={info.language} raw_url={info.raw_url} />);
    }
    return (
    <li>
      <strong>{gist.description}</strong><br />
      {files}
    </li>);
  }
}

class ListGists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gists: []};
  }
  loadData(){
    console.log("Loading data from rest service.");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.props.source);
    var that = this;
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Received successful response.")
        that.setState({gists: JSON.parse(xhr.responseText)});
      } else {
        console.log("Request failed to load the data." + xhr.status);
      }
    };
    xhr.send();
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
    return (<ol>{rows}</ol>);
  }
}

ReactDOM.render(
  <ListGists source="https://api.github.com/gists" />,
  document.getElementById('gists')
);
