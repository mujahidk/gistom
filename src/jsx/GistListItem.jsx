
class GistListItem extends React.Component {
  constructor(props) {
    super(props);
    this.loadGistData = this.loadGistData.bind(this);
    this.state = {gist: this.props.gist};
  }

  loadGistData(){
    console.log(this.state.gist.url);
    loadUrlData(this.state.gist.url, function(data){
      const jsonData = JSON.parse(data)
      ReactDOM.render(<GistViewer data={jsonData} />, document.getElementById('fileview'));
    });
  }

  render() {
    const gist = this.props.gist;
    const files = [];
    for(var key in gist.files){
      var info = gist.files[key];
      files.push(<GistFileItem key={info.filename} file={info} />);
    }
    return (
      <a className="list-group-item hand" onClick={this.loadGistData}>
        <h4 className="list-group-item-heading">{gist.description}</h4>
        {files}
      </a>);
  }
}
