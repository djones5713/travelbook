import React, { Component } from 'react';
import NavBar from '../../Navigation/NavBar';
import { Link } from 'react-router-dom';
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
                <NavBar />
                <div className="search-box">
                    <h1 className="title-search"> Travel Book</h1>
                    <h4 className="subtitle-search"> Book your dream vacation</h4>
                        <Link  to="/explore" >
                            <button className="search-btn">Explore</button>
                        </Link>
                </div>
                
            </div>
        )
    }
}
export default Search