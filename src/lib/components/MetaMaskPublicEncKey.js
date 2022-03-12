import React, {Component} from 'react';
import {Button, InputGroup, InputGroupText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MetaMaskPublicEncKey extends Component {

    // We get same Encryption Public Key for same account regargdless of selected chain
    state = {pubEncKey: null};

    componentDidMount() {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                this.setState({pubEncKey: null})
            });
        }
    }

    componentWillUnmount() {
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', () => {
                this.setState({pubEncKey: null})
            });
        }
    }

    btnFetchPublicEncKey = () => {
        window.ethereum
        .request({
            method: 'eth_getEncryptionPublicKey',
            params: [window.ethereum.selectedAddress], 
        })
        .then((result) => {
            this.setState({pubEncKey: result});
        })
        .catch((error) => {
            console.error(error);
         });
    }

    render() {
        return (
            <div style={{padding: '2px'}}>
                <InputGroup>
                    <InputGroupText>
                        <Button size='sm' outline color='dark' onClick={this.btnFetchPublicEncKey} >
                            Fetch
                        </Button>
                    </InputGroupText>
                    <InputGroupText>
                    {this.state.pubEncKey}
                    </InputGroupText>
                </InputGroup>
            </div>
        );
    }
}