import React,{Component} from 'react';
import {Table} from 'react-bootstrap';


import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddGroupModal} from './AddGroupModal';
import {EditGroupModal} from './EditGroupModal';


export class Group extends Component{

    constructor(props){
        super(props);
        this.state={groups:[],users:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_TEST+'group')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
        fetch(process.env.REACT_APP_TEST+'user/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteGroup(users, groupid){
        if(users.find(user=> user.GroupId == groupid)){ 
            window.alert('You cannon do it. Group has mambers')    
            return 0
        }
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_TEST+'group/'+groupid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }

    }
    

    render(){
        const {users, groups, groupid, groupname, groupdescription} = this.state; 
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>Group Description</th>
                            <th>Options</th>
                         </tr>
                    </thead>
                    <tbody>
                        {groups.map(group=>
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.GroupName}</td>
                                <td>{group.GroupDescription}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        groupid:group.id,groupname:group.GroupName, 
                                        groupdescription: group.GroupDescription })}>
                                            Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteGroup(users, group.id)}>
                                            Delete
                                        </Button>

                                    <EditGroupModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    groupid={groupid}
                                    groupname={groupname}
                                    groupdescription={groupdescription}/>
                                </ButtonToolbar>
                                    
                                </td>
                            </tr>)}

                    </tbody>
                    </Table>

                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Group</Button>

                    <AddGroupModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                    </ButtonToolbar>

               
            </div>
        )
    }

}