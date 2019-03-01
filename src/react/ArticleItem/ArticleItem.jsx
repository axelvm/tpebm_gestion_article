import React from 'react';
import Paragraphes from '../Paragraphes/Paragraphes'
import {Link} from "react-router-dom";

export default class ArticleItem extends React.Component {


    render() {
        let {article} = this.props;
        if (this.props.accessRender !== 0) {
          let tableitems = this.props.article.article.split("],[")
          return (
            <div>
              {tableitems.map((value, index) => (
                <li key={index}>
                  <div className="view">
                    <Paragraphes paragraphe={value} index={index}/>
                    <button className="destroy" onClick={() => this.removePara(index)}/>
                  </div>
                </li>
              ))}
            </div>

            )
        } else {
            return (
                <li key={article.id}>
                    <div className="view" >
                        <label >{article.title}</label>
                        <Link to="/article"><button className="access"
                                      onClick={this.access}/></Link>
                        <button className="destroy"
                                onClick={this.destroy}/>
                    </div>
                </li>
            )
        }
    }

    destroy = () =>{
        this.props.onDestroy(this.props.article)
    }
    access = () =>{
        this.props.access(this.props.article)
    }

    removePara = (index) => {

        this.props.removePara(index, this.props.article)
    }

}