import React from 'react';


export default class Paragraphes extends React.Component {


    render(){
        return (
                <div className="view">
                    <label>{this.props.paragraphe}</label>
                </div>
        )
    }
}