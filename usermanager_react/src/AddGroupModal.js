import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddGroupModal extends Component{
 
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_TEST+'group/',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:null,
                GroupName:event.target.GroupName.value,
                GroupDescription:event.target.GroupDescription.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.props.fetchGroups();
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
            Add Group
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="GroupName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" name="GroupName" required 
                        placeholder="Group Name"/>                       
                    </Form.Group>
                    <Form.Group controlId="GroupDescription">
                        <Form.Label>Group Description</Form.Label>                       
                         <Form.Control type="text" name="GroupDescription" required 
                        placeholder="Group Description"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Group
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