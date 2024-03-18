import React, { Component } from "react";
import CustomModal from "./components/Modal";

import axios from "axios"



const users = [
  {
    id: 1,
    name: 'Ajeet kumar',
    age: 20,
    gender: 'Male',
    created_at: ''
  },
  {
    id: 2,
    name: 'Amit kumar',
    age:25,
    gender: 'Male',
    created_at: ''
  },
  {
    id: 3,
    name: 'Sam kumar',
    age:35,
    gender: 'Male',
    created_at: ''
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: users,
      modal: false,
      activeUser: {
        name: '',
        age: '',
        gender: '',
      },
    };
  }


  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
    .get("https://django-server-production-2cf0.up.railway.app/users/")
    .then((res) => this.setState({ userList: res.data}))
    .catch((err) => console.log(err))
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    
    if(item.name === '') {
      return false;
    }
    this.toggle();

    if (item.id) {
      axios
        .put(`https://django-server-production-2cf0.up.railway.app/users/user_detail/${item.id}`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("https://django-server-production-2cf0.up.railway.app/users/create_user/", item)
      .then((res) => this.refreshList());
  };



  handleDelete = (item) => {
    console.log(item)
    axios
    .delete(`https://django-server-production-2cf0.up.railway.app/users/user_detail/${item.id}`)
    .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { name: "", age: "", gender: '' };
    console.log('new item:', item)
    this.setState({modal: !this.state.modal });    
  };

  editItem = (item) => {
    this.setState({ activeUser: item, modal: !this.state.modal });
  };



  renderItems = () => {
    

    return this.state.userList.map((user) => (
      <li
        key={user.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
        >
          {user.name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(user)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(user)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">User app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add User
                </button>
              </div>
            
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <CustomModal
            activeItem={this.state.activeUser}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;