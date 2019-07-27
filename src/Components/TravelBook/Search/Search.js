import React, { Component } from 'react';
import waterside from '../../../images/waterside.jpg';
import './Search.scss';

class Search extends Component {
    constructor(){
    super()
    this.state = {

    }
    }

    render(){
        return(
            <div className="search">
                <img className="waterside" src={waterside} alt="costal line" />
                <div className="search-box">
                    <h1 className="title-search"> Travel Book</h1>
                    <h4 className="subtitle-search"> Book your dream vacation now</h4>
                </div>
            </div>
        )
    }
}
export default Search