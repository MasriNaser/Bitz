import Layout from "../components/Layout";
import React from "react";
import Notification from "../components/Notification";


class Any extends React.Component {
    state = {
        title: "",
        list: [],
        editMode: false,
        idToEdit: -1,
        showNotification: false,
        selectedElement: ""
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {list, title, editMode, idToEdit} = this.state;
        if (title.trim() !== "") {
            if (editMode) {
                const copyList = [...list];
                copyList[idToEdit] = title;
                this.setState({
                    list: [...copyList],
                });
            } else {
                this.setState({
                    list: [...list, title],
                });
            }
            this.setState({
                title: "",
                editMode: false,
            });
        }
    };
    // l is the index from mapping the list down
    // i is the index from filter in onClick
    handleDelete = (l) => {
        const {list} = this.state;
        this.setState({
            list: list.filter((_, i) => l !== i),
            showNotification: true,
            selectedElement: list.find((_, i) => l === i)
        });


        setTimeout(() => {
            this.setState(() => ({
                showNotification: false
            }))
        }, 3000)

    };
    handleEdit = (index) => {
        const {list} = this.state;
        if (index > -1) {
            const selectedElement = list.find((_, id) => id === index);
            if (selectedElement) {
                this.setState({
                    editMode: true,
                    idToEdit: index,
                    title: selectedElement,
                });
            }
        }
    };


    render() {
        const {showNotification, title, list, selectedElement} = this.state;
        return (
            <Layout>
                <div className={"container"}>
                    {showNotification &&
                    <Notification title={`${selectedElement} has been deleted!`}/>}
                    <h1>
                        Welcome to To do
                    </h1>
                    <p>
                        Application to do something!
                    </p>
                    <p>Todos:{list.length}</p>
                    {list.length === 0 ?
                        <p className="emptyTodo">
                            You do not have todos...lets add one!
                        </p> : null
                    }
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="exampleInputEmail1">Title:</label>
                        <input autoComplete="off" name="title" type="text" onChange={this.handleChange}
                               value={title} className="form-control" id="exampleInputEmail1"
                               placeholder="Enter todo..."/>
                    </form>
                    <ul class="list-group">
                        {list.map((item, l) =>
                            (<li class="list-group-item" key={l}>
                                <h4>{item}</h4>
                                <div>
                                    <img src="/edit.png" alt={"edit"} className={'icon'}
                                         onClick={() => this.handleEdit(l)}/>
                                    <img src="/delete.png" alt="delete"  onClick={() => this.handleDelete(l)}/>
                                </div>
                            </li>))}
                    </ul>
                </div>
                <style jsx>{`
                .container{
                    position: relative;
                    }
                 .form-control{
                margin-bottom: 0.6em;}
                 form label{
                margin: 0.5em;
                }
                ul{
                display: flex;
                flex-direction: column;
                padding-left: 0;
                margin-bottom: 0;
                }
                .icon {
                    margin-right: 10px;
                }
                li{position: relative;
                    display: flex;
                    justify-content: space-between;
                    padding: .5em 1em;
                    background-color: #fff;
                    border-radius: 0.2em;
                    margin-bottom: 0.6em;
                    border: 0.1em solid rgba(197, 239, 247, 1);}
                    button{
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;}
                    .emptyTodo{
                    color: #732d00;
                    background-color: #f8ddcc;
                    border-color: #f5d0b8;
                    padding-right: 4rem;
                    padding: 0.75rem 1.25rem;
                    margin-bottom: 1rem;
                    border: 1px solid transparent;
                    border-radius: 0.25rem;
                    }
                   img{ cursor: pointer;}
                `}</style>
            </Layout>
        );
    }
}

export default Any;
