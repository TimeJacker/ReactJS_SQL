import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })

    }


    componentDidMount() {
        let user = this.props.currentUser;
        // {currentUser} = this.props;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmount edit user modal', this.props.currentUser)
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

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //cal api edit user
            this.props.editUser(this.state);
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
                    Edit User
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-cotainer'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "email")
                                }}
                                value={this.state.email}
                                disabled />
                        </div>

                        <div className='input-cotainer'>
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => {
                                    this.handleOneChangeInput(event, "password")
                                }}
                                value={this.state.password}
                                disabled />
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
                        onClick={() => { this.handleSaveUser() }}>
                        Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
