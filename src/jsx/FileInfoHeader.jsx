
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
    copyToClipboard(url, function(data){
      document.getElementById(elementId).innerText = data;
    });
  }
  render() {
    const file = this.state.file
    return (<div className="panel-heading">
      <span className="label label-default">&lt;{file.language}&gt;</span> <strong>{file.filename}</strong>&nbsp;
      <a className="hand" onClick={this.copyFileContents}>Copy</a> - <a className="hand" onClick={this.openFile}>Open</a>
    </div>)
  }
}
