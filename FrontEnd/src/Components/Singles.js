import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

const Singles = () => {

    const [songs, setSong] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            const {data} = await axios.get("http://localhost:5000/products")
            setSong(data)
        }
        fetchData();
        return () => {

        };
    }, []);

    return (
        <Fragment>
            <Router>
                <main className="main">
                    <div className="content">
                        <ul className="products">
                            {
                            songs.map(song =>
                            <li key={song.id}>
                                <div className="product">
                                <img className="product-image" src={song.image} alt="album art" />
                                <div className="product-name">
                                <a href=""></a>{song.name}</div>
                                <div className="product-price">{song.price}</div>
                                <div className="product-rating">{song.description}</div>
                                </div>
                            </li>)
                            }
                        </ul>
                    </div>
                </main>
            </Router>
        </Fragment>
    );
};

export default Singles;