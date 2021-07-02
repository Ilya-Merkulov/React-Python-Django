import React,{Component} from 'react';
//import moment from "moment";
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';




export class AddUserModal extends Component{
    constructor(props){
        super(props);
        this.state={groups:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    


    componentDidMount(){
        fetch(process.env.REACT_APP_TEST+'group/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_TEST+'user/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:null,
                UserName:event.target.UserName.value,
                GroupId:event.target.GroupId.value,
                DateOfCreating:event.target.DateOfCreating.value 
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="UserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" name="UserName" required 
                        placeholder="User Name"/>                       
                    </Form.Group>


                    <Form.Group controlId="GroupId">
                        <Form.Label>User Group</Form.Label>   

                        <Form.Control as="select">
                        {this.state.groups.map(group=>
                            <option key={group.id} value={group.id}>{group.GroupName}</option>)}
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId="DateOfCreating">
                        <Form.Label>Date Of Creating</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfCreating"
                        required
                        placeholder="DateOfCreating"
                        />  
                    </Form.Group>
                 

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}