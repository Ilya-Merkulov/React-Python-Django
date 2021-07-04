import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";

export class User extends Component {
    state = {
      users: [],
      groups: [],
      addModalShow: false,
      editModalShow: false
    };

    fetchUsers = () => {
        fetch(process.env.REACT_APP_TEST + "user/")
          .then(response => response.json())
          .then(data => {
            this.setState({ users: data });
          });
      };
    
      fetchGroups = () => {
        fetch(process.env.REACT_APP_TEST + "group/")
          .then(response => response.json())
          .then(data => {
            this.setState({ groups: data });
          });
      };
    
    
  componentDidMount() {
    this.fetchUsers();
    this.fetchGroups();
  }

  deleteUser(userid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_TEST + "user/" + userid, {
        method: "DELETE",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
      }).then(() => {
        this.fetchUsers();
      });
    }
  }

  addModalClose = () => this.setState({ addModalShow: false });
  editModalClose = () => this.setState({ editModalShow: false });

    render(){      
    const {groups, users, userid, username, user_group_id, user_data_of_creating} = this.state;
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Group Name</th>
                            <th>Data of Creating</th>
                            <th>Options</th>
                         </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.UserName}</td>
                                <td>                                   
                                     {groups.find(group => group.id === user.GroupId)?.GroupName}                                                
                                </td>   
                                <td>{user.DateOfCreating}</td>                      
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        userid:user.id,
                                        username:user.UserName,
                                        user_group_id:user.GroupId,
                                        user_data_of_creating: user.DateOfCreating })}>
                                            Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteUser(user.id)}>
                                            Delete
                                        </Button>

                                    <EditUserModal 
                                    show={this.state.editModalShow}
                                    onHide={this.editModalClose}
                                    userid={userid}
                                    username={username}
                                    user_group_id={user_group_id}
                                    user_data_of_creating={user_data_of_creating}
                                    fetchUsers={this.fetchUsers}
                                    groups={groups}/>
                                </ButtonToolbar>
                                    
                                </td>
                            </tr>)}

                    </tbody>
                    </Table>

                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Use</Button>

                    <AddUserModal 
                     show={this.state.addModalShow}
                     onHide={this.addModalClose}
                    fetchUsers={this.fetchUsers}
                    groups={groups}/>
                    </ButtonToolbar>

            </div>
        )
    }

}