
class GistFile extends React.Component {
  loadFile(url, containerId){
    loadUrlData(url, function(data){
      document.getElementById(containerId).innerText = data;
    });
  }
  render(){
    const file = this.props.file
    this.loadFile(file.raw_url, file.filename)
    return (
    <div className="panel panel-default">
      <FileInfoHeader file={file} filename={file.filename} />
      <div className="panel-body">
        <pre id={file.filename} className="fileview"></pre>
      </div>
    </div>)
  }
}
