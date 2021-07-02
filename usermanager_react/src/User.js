import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Modal, Row, Col, Form} from 'react-bootstrap';


import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddUserModal} from './AddUserModal';
import {EditUserModal} from './EditUserModal';


export class User extends Component{

    constructor(props){
        super(props);
        this.state={users:[], groups:[], addModalShow:false, editModalShow:false}
    }


    componentDidMount(){
        fetch(process.env.REACT_APP_TEST+'group/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    refreshList(){
        fetch(process.env.REACT_APP_TEST+'user/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
        fetch(process.env.REACT_APP_TEST+'group/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteUser(userid){
    
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_TEST+'user/'+userid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }

    }
    

    render(){
        // bизменить названия под мою бд и сделать кнопки для edit, как треша?) Ты молодец)
        //треша - зоебись)
        const {groups, users, userid, username, user_group_id, user_data_of_creating} = this.state; 
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
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
                                    {groups.find(group => group.id == user.GroupId).GroupName}                                                             
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

                                    <EditUserModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    userid={userid}
                                    username={username}
                                    user_group_id={user_group_id}
                                    user_data_of_creating={user_data_of_creating}/>
                                </ButtonToolbar>
                                    
                                </td>
                            </tr>)}

                    </tbody>
                    </Table>

                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Use</Button>

                    <AddUserModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                    </ButtonToolbar>

             
            </div>
        )
    }

}