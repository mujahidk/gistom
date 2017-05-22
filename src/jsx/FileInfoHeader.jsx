
class FileInfoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: this.props.file};
    this.copyFileContents = this.copyFileContents.bind(this);
    this.openFile = this.openFile.bind(this);
  }
  openFile(){
    const url = this.state.file.raw_url;
    openUrl(url);
  }
  copyFileContents(){
    const url = this.state.file.raw_url;
    const elementId = this.props.filename;
    console.log(url);
    // TODO: Do not reload the contents from the API.
    copyToClipboard(url, function(data){
      // Do not refresh the contents. 
      // document.getElementById(elementId).innerText = data;
    });
  }
  render() {
    const file = this.state.file
    return (<div className="panel-heading">
      <span className="label label-default">{file.language}</span> <strong>{file.filename}</strong>&nbsp;
      <a className="hand" onClick={this.copyFileContents}>Copy</a> - <a className="hand" onClick={this.openFile}>Open</a>
    </div>)
  }
}
