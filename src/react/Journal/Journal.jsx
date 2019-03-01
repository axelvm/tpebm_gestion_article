import React from 'react';
import ArticleItem from '../ArticleItem/ArticleItem'
import InputArticle from '../InputArticle/InputArticle'
import InputParagraphe from '../InputParagraphe/InputParagraphe'
import HeaderTitle from "../HeaderTitle/HeaderTitle";




export default class Journal extends React.Component{


    state = {
        articles: [],
        newtitle: "",
        newArticle: {id: 0, title: "", contents: ""},
        access: 0,
        contents: "",
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
            <div>
                <header className="header">
                    <HeaderTitle access={this.state.access} articles={this.state.articles}/>
                    <button className="add"/>
                    {this.setInput()}
                </header>
                <section className="main">
                    <ul className="article-list">
                      {
                          this.state.articles.map(article => {
                            return <ArticleItem article={article} key={article.id} onDestroy={this.removeArticle}
                                                 access={this.showArticle} accessRender={this.state.access}
                                                 contents={this.state.contents} articles={this.state.articles}
                                                 removePara={this.removePara} />
                        })}
                    </ul>
                </section>

            </div>
        </section>;
    }


    //usefull function

    nextId = (articles) =>{
        let idMax = 0
        articles.map(article => {
            if (idMax < article.id ) {
              idMax = article.id
            }
            return null;
        })
        return idMax + 1;
    }

  setInput = () => {
    console.log("access : ", this.state.access)
    if (this.state.access === 0) {
      return (
        <InputArticle addArticle={this.addArticle}/>
      )
    }

    return this.state.articles.map(article =>
    {
      return (
        <div>
          <InputParagraphe article={article} addParagraphe={this.addParagraphe} backToJournal={this.backToJournal}/>
        </div>
      )
    })
  }

  backToJournal = () => {
    this.setState({access: 0}, () => {
      fetch('http://127.0.0.1:5000/article')
        .then(res => {
          return res.json()
        })
        .then((data) => {
          this.setState({articles: data.result})
        })
    })
  }

  setContent = (content) => {
    console.log("content",content)
    let output = ""
    for(var i = 0; i<content.length; i++){
      output = output.concat(content[i])
      if(i !== content.length-1){
        output= output.concat("],[")
      }
    }
    return output
  }


    //API functions

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
        let idNewArticle = this.nextId(this.state.articles)
        copyNewArticle.id = idNewArticle
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
                "article": "",
            }),
        }).then(res => {
            console.log(res)
            return res.json()
        })
            .catch((error) => {
                console.error(error);
            });
    };



    showArticle = (article) => {

        let articleToShow = [];
        articleToShow.push(article);

        this.setState({articles: articleToShow})

        fetch('http://127.0.0.1:5000/article?id='+article.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        }).then(res => {
            return res.json()
        }).then((data) => {
            this.setState({
                articles: data.result,
                access: article.id,
            }, () => {
                this.state.articles.map(article => {
                    this.setState({
                        contents: article.article
                    })
                  return null;
                })
            })
        })

    }

  addParagraphe = (newContent, article) => {
    console.log("conntennnts",article.article)

    let copyContents = article.article.concat("],[")
    let contentToAdd = copyContents.concat(newContent)

    console.log("state contents", contentToAdd)

    this.setState({newArticle: {id: article.id, title: article.title, contents : contentToAdd}}
      , () => {
        fetch('http://127.0.0.1:5000/article', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": this.state.newArticle.id,
            "titre": this.state.newArticle.title,
            "article":this.state.newArticle.contents,
          }),
        }).then(res => {
          this.showArticle(article)
          return res.json()

        })
          .catch((error) => {
            console.error(error);
          });
      })



  }
  removePara = (index, article) => {
    let tableitems = article.article.split("],[")
    let itemtoremove = tableitems[index]
    let newtableitems = tableitems.filter(t => t !== itemtoremove)

    let newContent = this.setContent(newtableitems)
    console.log("newcontent", newContent)

    this.setState({newArticle: {id: article.id, title: article.title, contents : newContent}}
      , () => {

        fetch('http://127.0.0.1:5000/article', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": this.state.newArticle.id,
            "titre": this.state.newArticle.title,
            "article":this.state.newArticle.contents,
          }),
        }).then(res => {
          this.showArticle(article)
          return res.json()

        })
          .catch((error) => {
            console.error(error);
          });
      })

  }








}
