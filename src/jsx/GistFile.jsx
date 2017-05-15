
class GistFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: props.file.filename,
      componentDidMount: false,
      outerContainerId: `container-${props.file.filename}`
    };
  }
  loadFile(url, containerId){
    var thatState = this.state;
    loadUrlData(url, function(data){
      document.getElementById(containerId).innerText = data;
      if(thatState.componentDidMount){
        console.log('GistFile component is mounted and loaded.', thatState.outerContainerId);
        hljs.highlightBlock(document.getElementById(thatState.outerContainerId))
      }
    });
  }
  componentDidMount(){
    this.state.componentDidMount = true;
    console.log('GistFile component loaded.', this.state.filename);
  }
  render(){
    const file = this.props.file
    this.loadFile(file.raw_url, file.filename)
    return (
    <div className="panel panel-default">
      <FileInfoHeader file={file} filename={file.filename} />
      <div className="panel-body">
        <pre id={this.state.outerContainerId} className="fileview"><code id={file.filename}></code></pre>
      </div>
    </div>)
  }
}
