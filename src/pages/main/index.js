import React, { Component } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom'; // liga as paginas

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }; //reactJS cria estado

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page= 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo} = response.data;

        this.setState({products: docs, productInfo, page}); 
    }; 
    // pega lista de produtos na api e desistrutura
    
    prevPage = () => {
        const { page, productInfo} = this.state;
       
        if (page === 1)return;
        const pageNumber = page -1;
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, productInfo} = this.state;
       
        if (page === productInfo.pages)return;
        const pageNumber = page +1;
        this.loadProducts(pageNumber);
    };// CHANGE PAGE


    render() {
        const { products, page, productInfo } = this.state;
        return (
            <div className="product-list">
                { products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Access</Link> 
                    </article>
                ))}
                <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>
                    Before
                    </button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>
                    Next
                    </button>
            </div>
            </div>
            
        );
    }
}