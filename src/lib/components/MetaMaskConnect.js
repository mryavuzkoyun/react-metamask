import React, {Component} from 'react';
import { Button, Badge, InputGroup, InputGroupText, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './metamask-fox.svg';

export default class MetaMaskConnect extends Component {
    
    state = {networkId: null, address: null, connected: false};
    
    constructor(props) {
        super(props);

        if(window.ethereum) {
            window.ethereum.on('chainChanged', this.buttonConnectMetaMask);
            window.ethereum.on('accountsChanged', this.buttonConnectMetaMask);
        }
    }

    componentWillUnmount() {
        if (window.ethereum) {
            window.ethereum.removeListener('chainChanged', this.buttonConnectMetaMask);
            window.ethereum.removeListener('accountsChanged', this.buttonConnectMetaMask);
        }
    }

    getNetworkName(networkId) {
        switch(networkId){
          case '1': return "Ethereum";
          case '56': return "Binance Smart Chain";
          case '43114': return 'Avalanche';
          case '61': return 'Ethereum Classic';
          case '250': return 'Fantom Opera';
          case '137': return 'Polygon MATIC';
          case '106': return 'Velas';
          case '321': return 'KCC';
          default: return "Unknown Network";
        }
    }

    btnMetaMaskConnect = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const networkId = window.ethereum.networkVersion;
            
            this.setState({address: accounts[0], networkId: networkId, connected: true});
        } 
        catch(e) {
            alert('Please make sure MetaMask is installed and logged in !');
        }
    }

    componentDidMount() {
        if (window.ethereum) {
            this.btnMetaMaskConnect();
        }
    }

    render() {
        return (
            <div width={window.width} align='right'>
                <Container align='right'>
                <Row>
                    <Col xs='6'></Col>
                    <Col xs='6' align='right'> 
                        <InputGroup>
                            <InputGroupText>
                                <img src={logo} />
                            </InputGroupText>
                            <InputGroupText>
                                <Badge color='success'>
                                    @{this.getNetworkName(this.state.networkId)} 
                                </Badge>
                            </InputGroupText>
                            <InputGroupText>
                                {this.state.address}
                            </InputGroupText>
                            {
                            this.state.connected ?
                            ''
                            :
                            <InputGroupText>
                                    <Button outline color='danger' onClick={this.btnMetaMaskConnect}>
                                        Connect to MetaMask
                                    </Button>
                            </InputGroupText>
                            }
                        </InputGroup>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
}
