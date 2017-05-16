var Prism = require('prismjs');
var languages = require('prism-languages')
Object.keys(languages)['bash','sql','javascript','xml','json', 'groovy', 'docker', 'batch', 'markdown']

class GistFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: props.file.filename,
      language: props.file.language,
      outerContainerId: `container-${props.file.filename}`
    };
    this.languageMap = {
      'shell': 'bash',
      'plsql': 'sql',
      'sublime text config': 'json',
      'dockerfile': 'docker',
      'batchfile': 'batch'
    }
  }
  highlight(code, lang) {
    if(this.languageMap[lang]){
      lang = this.languageMap[lang]
    }
    var grammar = lang !== undefined ? Prism.languages[lang] : Prism.languages.markup;
    var returnVal = code
    try {
      returnVal = Prism.highlight(code, grammar, lang);
    }catch(err){
      console.error('Error highlighting code for language: ', lang);
    }
    return returnVal
  }
  loadFile(url, containerId){
    // Get the language or default to markup.
    var language = (this.state.language || 'markup').toLowerCase();
    var that = this
    loadUrlData(url, function(data){
      console.log('Language: ', language)
      // Do the hightlighting using prism here.
      document.getElementById(containerId).innerHTML = that.highlight(data, language);;
    });
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
