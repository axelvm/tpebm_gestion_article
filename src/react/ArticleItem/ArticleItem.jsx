import React from 'react';
import Paragraphes from '../Paragraphes/Paragraphes'
import {
    sortableContainer,
    sortableElement,
    arrayMove,
} from 'react-sortable-hoc';

const SortableItem = sortableElement(({paragraphe, onRemove, sortIndex}) => {
    console.log("index", sortIndex)
    return(
    <li  className="" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086">
        <Paragraphes paragraphe={paragraphe} index={sortIndex}/>
        <button onClick={() => onRemove(sortIndex)} className="destroy" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086.0.2"></button>

    </li>)
})


const SortableContainer = sortableContainer(({items, onRemove}) => {

    return (
        <ul>
            {items.map((value, index) => {
                console.log("keyy", index)
                return (
                    <div >
                        <SortableItem key={`item-${index}`} sortIndex={index} paragraphe={value} onRemove={onRemove}/>

                    </div>
                )
            })}
        </ul>
    )
})

export default class ArticleItem extends React.Component {


    render() {
        let {article} = this.props;
        if (this.props.accessRender !== 0) {
            const subArticle = JSON.parse(this.props.article.article)
            return (<SortableContainer items={subArticle} onSortEnd={this.onSortEnd} onRemove={this.removePara}/>)

        } else {
            return (
                <li key={article.id} className="" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086">
                    <div className="view" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086.0">
                        <label data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086.0.1">{article.title}</label>
                        <button className="access" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086.0.2"
                                onClick={this.access}/>
                        <button className="destroy" data-reactid=".0.1.2.$46752b53-d84d-46b1-b800-352f6d12a086.0.2"
                                onClick={this.destroy}></button>
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

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.onSortEnd({oldIndex, newIndex}, this.props.article)
    };
    removePara = (index) => {

        this.props.removePara(index, this.props.article)


    }
}