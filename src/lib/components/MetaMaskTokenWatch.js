import React, {Component} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
    Sample usage:
    By default type is ERC20 and decimals is 18. No need to provide in props
    
    <WatchTokenInMetaMask 
        address='0x155040625D7ae3e9caDA9a73E3E44f76D3Ed1409' 
        symbol='REVO'
    >
    </WatchTokenInMetaMask>
*/
export default class MetaMaskTokenWatch extends Component {
    constructor(props) {
        super(props);
    }

    btnMetaMaskTokenWatch = () => {
        window.ethereum
        .request({
            method: 'wallet_watchAsset',
            params: {
            type: this.props.type,
            options: {
                address: this.props.address,
                symbol: this.props.symbol,
                decimals: this.props.decimals,
                image: this.props.image,
            },
            },
        })
        .then((success) => {
            if (success) {
                console.log('FOO successfully added to wallet!');
            } else {
                throw new Error('Something went wrong. Cannot add token to MetaMask!');
            }
        })
        .catch(console.error);
        }

    render () {
        return (
            <Button color='primary' onClick={this.btnMetaMaskTokenWatch}>Add {this.props.symbol} to MetaMask</Button>
        );
    }
}

MetaMaskTokenWatch.propTypes = {
    address : PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired,
    image: PropTypes.string,
    type: PropTypes.string.isRequired
}

MetaMaskTokenWatch.defaultProps = {
    type: 'ERC20',
    decimals: 18
}