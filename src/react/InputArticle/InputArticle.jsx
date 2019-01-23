import React from 'react';

export default class InputArticle extends React.Component {

    state = {newtitle : "",}


    render(){
        return (
            <input id="newtitle" className="new-article" placeholder="Tapez le titre de l'article à ajouter"
                   value={this.props.newtitle}
                   onInput={this.updateNewTitle}
                   onKeyPress={this.enterArticle}/>
        )
    }

    updateNewTitle = (e) => {
        this.setState({newtitle: (e.target).value},() => {console.log(this.state.newtitle)})
    }

    enterArticle = (e) => {
        if(e.key === 'Enter'){
            if(this.state.newtitle !== "") {
                this.addArticle()
                this.setState({newtitle: ""})
            }
        }
    }

    addArticle = () => {
        this.props.addArticle(this.state.newtitle)
    }

}