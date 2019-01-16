import React from 'react';

export default class InputParagraphe extends React.Component {

    state = {newContent: "",}

render(){
    return (<input id="newtitle" className="new-article" placeholder="Tapez le paragraphe à ajouter"
                   value={this.state.newContent}
                   onInput={this.updateNewContent}
                   onKeyPress={this.enterParagraphe}/>
    )
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
        let id = this.props.article.id;
        this.props.addParagraphe(this.state.newContent, id);
    }


}