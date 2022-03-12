import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, Button, InputGroup, InputGroupText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
    Sample usage:
    showNetworkConfig is by default false. Will just show a button. 
    Set showNetworkConfig to true to see the network config details.

    <MetaMaskAddNetwork chainId='0x42' chainName='O K Exchain'  
        rpcUrl='https://exchainrpc.okex.org' 
        blockExplorerUrl='https://www.oklink.com/okexchain' 
        nativeCurrency={{name: 'OKEX', symbol: 'OKT', decimals: 18}}
        showNetworkConfig=true
    >
    </MetaMaskAddNetwork>
*/

export default class MetaMaskAddNetwork extends Component {
    
    btnMetaMaskAddNetwork = async () => {
        try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
            {
                chainId: this.props.chainId,
                chainName: this.props.chainName,
                rpcUrls: [this.props.rpcUrl],
                blockExplorerUrls: [this.props.blockExplorerUrl],
                nativeCurrency: {
                    name: this.props.nativeCurrency.name,
                    symbol: this.props.nativeCurrency.symbol, 
                    decimals: this.props.nativeCurrency.decimals
                }
            },
            ],
        });
        } catch (addError) {
            alert(`Cannot add ${this.props.chainName} (${this.props.chainId}) to MetaMask!`)
        }
    }

    render() {
        if (!this.props.showNetworkConfig) {
            return (
                <div style={{padding: '2px'}}>
                    <InputGroup>
                        <InputGroupText>
                            <Button size='sm' color='primary' onClick={this.btnMetaMaskAddNetwork}>
                                Add {this.props.chainName} Network
                            </Button>
                        </InputGroupText>
                    </InputGroup>
                </div>
            );
        }

        return (
        <div style={{padding: '2px'}}>    
        <Table bordered striped>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope='row'>
                    Chain Id
                    </th>
                    <td>
                    {this.props.chainId}
                    </td>
                </tr>
                <tr>
                    <th scope='row'>
                    Chain Name
                    </th>
                    <td>
                    {this.props.chainName}
                    </td>
                </tr>
                <tr>
                    <th scope='row'>
                    Rpc Url
                    </th>
                    <td>
                    {this.props.rpcUrl}
                    </td>
                </tr>
                <tr>    
                    <th scope='row'>
                    Block Explorer Url
                    </th>
                    <td>
                    {this.props.blockExplorerUrl}
                    </td>
                </tr>
                <tr>
                <th scope='row'>
                    Native Currency Name
                    </th>
                    <td>
                    {this.props.nativeCurrency.name}
                    </td>
                </tr> 
                <tr> 
                    <th scope='row'>
                    Native Currency Symbol
                    </th>
                    <td>
                    {this.props.nativeCurrency.symbol}
                    </td>
                </tr>
                <tr>    
                    <th scope='row'>
                    Native Currency Decimals
                    </th>
                    <td>
                    {this.props.nativeCurrency.decimals}
                    </td>
                </tr>
            </tbody>
        </Table>
        <div style={{padding: '2px'}}>
            <InputGroup>
                <InputGroupText>
                    <Button size='sm' color='primary' onClick={this.btnMetaMaskAddNetwork}>
                        Add {this.props.chainName} Network
                    </Button>
                </InputGroupText>
            </InputGroup>
        </div>
        </div>
    )}
} 

MetaMaskAddNetwork.protoTypes = {
    chainId: PropTypes.string.isRequired,
    chainName: PropTypes.string.isRequired,
    rpcUrl: PropTypes.string.isRequired,
    blockExplorerUrl: PropTypes.string.isRequired,
    nativeCurrency: PropTypes.exact({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        decimals: PropTypes.number.isRequired
    }),
    showNetworkConfig: PropTypes.bool.isRequired
}

MetaMaskAddNetwork.defaultProps = {
    showNetworkConfig: false
}
