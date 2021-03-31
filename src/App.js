import React from 'react';
import data from './folderData';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: data
    }
  }

  generateKey() {
    let key = Math.floor(Math.random() * 500) + 1

    return key + Math.floor(Math.random() * 100) + 1
  }

  render() {
    let files = this.state.data

    return (
      <div className="app">
        <h1 className="heading">Filebase</h1>
        <Folder name="Desktop">
          {files.desktop.softwares.map(software => <File key={this.generateKey()} name={software}/>)}
        </Folder>
        <Folder name="Documents">
          {Object.keys(files.documents).map(file => 
              <Folder key={this.generateKey()} name={file}>
                {files.documents[file].map(items => <File key={this.generateKey()} name={items}/>)}
              </Folder>
            )}
        </Folder>
        <Folder name="Pictures">
          {files.pictures.map(picture => <File key={this.generateKey()} name={picture}/>)}
        </Folder>
        <Folder name="Music">
          {files.music.map(audio => <File key={this.generateKey()} name={audio}/>)}
        </Folder>
        <Folder name="Videos">
          {files.videos.map(clip => <File key={this.generateKey()} name={clip}/>)}
        </Folder>
      </div>
    )
  }
}

class Folder extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      icons: {
        Desktop: "desktop icon",
        Documents: "folder icon",
        Pictures: "images icon",
        Music: "play icon",
        Videos: "video icon"
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => {
      return({
        isOpen: !prevState.isOpen
      })
    })
  }

  render() {
    let {name, children} = this.props
    let caretDirection = this.state.isOpen ? "down" : "right"
    let icon = this.state.icons[name] ? this.state.icons[name] : "folder icon"

    return(
      <div className="content">
        <div className="icon-layout">
          <span>
            <i className={icon} onClick={this.handleClick}></i>
            <i className={`caret ${caretDirection} icon`} onClick={this.handleClick}></i>
          </span>
          <span><h3 onClick={this.handleClick}>{name}</h3></span>
        </div>
        <div className="children">{(children && this.state.isOpen) ? children : null}</div>
      </div>
    )
  }
}

function File(props) {
  let icons = {mp3: "headphones icon", mp4: "file video icon", png: "file image outline icon",
    jpeg: "file image icon", exe: "bullseye icon", pdf: "file pdf icon", doc: "file word icon",
    html: "html5 icon", css: "css3 alternate icon", js: "js icon"
  }

  let fileExtension = props.name.split('.')[1]

  return(
    <div>
      <span><i className={icons[fileExtension] ? icons[fileExtension]: "folder icon"}></i></span>
      <span className="filename">{fileExtension === "exe" ? props.name.split('.')[0] : props.name}</span>
    </div>
  )
}

export default App;
