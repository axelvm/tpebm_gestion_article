import React from 'react';
import {Link} from "react-router-dom";

export default class InputParagraphe extends React.Component {

    state = {newContent: "",}

render(){
    return (
      <div>
        <Link to="/Journal"><button className="back-button" onClick={this.backToJournal}>Back</button></Link>
          <input id="newtitle" className="new-article" placeholder="Tapez le paragraphe à ajouter"
               value={this.state.newContent}
               onInput={this.updateNewContent}
               onKeyPress={this.enterParagraphe}/>
      </div>
    )
}

    backToJournal = () =>{
        this.props.backToJournal()
    }
    enterParagraphe = (e) => {
            if(e.key === 'Enter'){
                if(this.state.newContent !== "") {
                    this.addParagraphe()
                    this.setState({newContent: ""})
                }
            }
    }
    updateNewContent = (e) => {
        this.setState({newContent: (e.target).value})
    }

    addParagraphe = () => {
        let article = this.props.article;
        this.props.addParagraphe(this.state.newContent, article);
    }


}