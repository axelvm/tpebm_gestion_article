import React from 'react';
import ArticleItem from '../ArticleItem/ArticleItem'
import InputArticle from '../InputArticle/InputArticle'
import InputParagraphe from '../InputParagraphe/InputParagraphe'
import HeaderTitle from "../HeaderTitle/HeaderTitle";
import {arrayMove} from "react-sortable-hoc";



export default class Journal extends React.Component{


    state = {
        articles: [],
        newtitle: "",
        newArticle: {id: 0, title: "", contents: []},
        access: 0,
        contents: [],
        newContent: "",
    };

    componentDidMount() {

        fetch('http://127.0.0.1:5000/article')
            .then(res => {
                return res.json()
            })
            .then((data) => {
                this.setState({articles: data.result})
            })

    }

    render() {
        return <section className="articleapp">
            <div data-reactid=".0">
                <header className="header" data-reactid=".0.0">
                    <HeaderTitle access={this.state.access} articles={this.state.articles}/>
                    <button className="add" data-reactid=".0.0.2"/>
                    {this.setInput()}
                </header>
                <section className="main" data-reactid=".0.1">
                    <ul className="article-list" data-reactid=".0.1.2">
                        {this.state.articles.map(article => {
                            return <ArticleItem article={article} key={article.id} onDestroy={this.removeArticle}
                                                 access={this.showArticle} accessRender={this.state.access}
                                                 contents={this.state.contents} articles={this.state.articles}
                                                 onSortEnd={this.onSortEnd} removePara={this.removePara} />
                        })}
                    </ul>
                </section>

            </div>
        </section>;
    }


    removeArticle = (article) => {
        console.log("article à supprimer : ", article.id)
        let copyArticle = [...this.state.articles]
        copyArticle = copyArticle.filter(t => t !== article);

        this.setState({articles: copyArticle})

        fetch('http://127.0.0.1:5000/article', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": article.id
            }),
        }).then(res => {
            return res.json()
        })
            .catch((error) => {
                console.error(error);
            });
    }

    addArticle = (title) => {


        let copyNewArticle = Object.assign(this.state.newArticle)
        copyNewArticle.title = title
        let copyArticle = [...this.state.articles]
        copyArticle.push(copyNewArticle)

        this.setState({articles: copyArticle})


        fetch('http://127.0.0.1:5000/article', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "titre": title,
                "article": "[]",
            }),
        }).then(res => {
            console.log(res)
            return res.json()
        })
            .catch((error) => {
                console.error(error);
            });
    };


    setInput = () => {
        console.log("access : ", this.state.access)
        if (this.state.access === 0) {
            return (
                <InputArticle addArticle={this.addArticle}/>
            )
        }

        return this.state.articles.map(article =>
        {
            console.log("yolo", article)
            return (
                <InputParagraphe article={article} addParagraphe={this.addParagraphe}/>
            )
        })




    }




    addParagraphe = (newContent, article) => {

        let copyContents = [...this.state.contents]
        copyContents.push(newContent)


        this.setState({
            newArticle: {id: article.id, title: article.title, contents : copyContents},
        })

        fetch('http://127.0.0.1:5000/article', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.newArticle.id,
                "titre": this.state.newArticle.title,
                "article": this.state.newArticle.contents,
            }),
        }).then(res => {
            return res.json()
        })
            .catch((error) => {
                console.error(error);
            });
    }



    showArticle = (article) => {

        let articleToShow = [];
        articleToShow.push(article);

        this.setState({articles: articleToShow}, () => {
            console.log("article to show : ",this.state.articles)
        })

        fetch('http://127.0.0.1:5000/article?id='+article.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        }).then(res => {
            return res.json()
        }).then((data) => {
            console.log("data result ", data.result)
            this.setState({
                articles: data.result,
                access: article.id,
                contents: data.result.article,
            }, () => {
                this.state.articles.map(article => {
                    this.setState({
                        contents: JSON.parse(article.article)
                    })
                })
                console.log("articles shown ", this.state.articles)
            })
        })

    }

    onSortEnd = ({oldIndex, newIndex}, article) => {

        let sortingContents = this.state.contents
        this.setState({
            contents: arrayMove(sortingContents, oldIndex, newIndex),
        }, () => {
            fetch('http://127.0.0.1:5000/article?id='+article.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": article.id,
                    "title": article.title,
                    "article": this.state.contents,
                })
            }).then(res => {
                return res.json()
            })
        })};

        removePara = (index, article) => {
            console.log("index removing", index)
            let copyContents = [...this.state.contents]
            copyContents = copyContents.filter(t => t !== index);


            /**
             * TO DO : gérer le CORS et ajouter le PUT en BDD pour que le DELETE soit effectif
             */
            this.setState({contents: copyContents}, () =>{
                fetch('http://127.0.0.1:5000/article', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": article.id,
                        "titre": article.title,
                        "article": this.state.contents,
                    }),
                }).then(res => {
                    return res.json()
                })
                    .catch((error) => {
                        console.error(error);
                    });
            })

        }

}
