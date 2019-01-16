import React from 'react';

export default class HeaderTitle extends React.Component {

    render() {
        if(this.props.access === 0){
            return <h1 data-reactid=".0.0.1">Articles</h1>
        }else{
            return (
                this.props.articles.map(article =>{
                    return <h1 data-reactid=".0.0.1">{article.title}</h1>
                })

            )
        }

    }
}