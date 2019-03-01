import React from 'react';
import classNames from './headertitle.module.css'

export default class HeaderTitle extends React.Component {

    render() {
        if(this.props.access === 0){
            return <h1 className={classNames.title}>Articles</h1>
        }else{
            return (
                this.props.articles.map(article =>{
                    return <h1 className={classNames.title}>{article.title}</h1>
                })

            )
        }

    }
}