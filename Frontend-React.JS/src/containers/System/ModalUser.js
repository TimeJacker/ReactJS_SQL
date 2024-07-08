import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('Check inside loop', this.state[arrInput[i], arrInput[i]])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }


        return isValid;
    }
    handleOneChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered

            >
                <ModalHeader toggle={() => { this.toggle() }} >
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-cotainer'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "email")
                                }}
                                value={this.state.email} />
                        </div>

                        <div className='input-cotainer'>
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "password")
                                }}
                                value={this.state.password} />
                        </div>

                        <div className='input-cotainer'>
                            <label>First name</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "firstName")
                                }}
                                value={this.state.firstName} />
                        </div>

                        <div className='input-cotainer'>
                            <label>Last name</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "lastName")
                                }}
                                value={this.state.lastName} />
                        </div>

                        <div className='input-cotainer max-width-input'>
                            <label>Addres</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "address")
                                }}
                                value={this.state.address} />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        Add New
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
