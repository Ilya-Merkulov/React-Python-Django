import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditGroupModal extends Component{
  
    handleSubmit = event => {
        event.preventDefault();
        fetch(process.env.REACT_APP_TEST+'group/',{
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:event.target.id.value,
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
            Edit Group
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                     <Form.Group controlId="id">
                            <Form.Label>Group ID</Form.Label>
                            <Form.Control type="text" name="id" required 
                            disabled
                            defaultValue={this.props.groupid} />                       
                    </Form.Group>
                    <Form.Group controlId="GroupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="text" name="GroupName" required 
                            defaultValue={this.props.groupname}
                            />                       
                    </Form.Group>
                    <Form.Group controlId="GroupDescription">
                        <Form.Label>Group Description</Form.Label>                       
                         <Form.Control type="text" name="GroupDescription" required 
                          defaultValue={this.props.groupdescription}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Group
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