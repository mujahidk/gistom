
class GistViewer extends React.Component {
  render() {
    var gist = this.props.data;
    var files = [];
    for(var key in gist.files){
      var info = gist.files[key];
      files.push(<GistFile key={info.filename} file={info} />);
    }
    return <div>{files}</div>
  }
}
