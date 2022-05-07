import React from 'react';
const data = ''

function ProductDetails(props) {
    const product = data.products.find(x => x._id === props.match.parmas.id)
    if(!product) {
        return <div>Product Not Found</div>
    }
    return <div>
        <div  className="row">
            <div className="col-2">
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="col-1">

            </div>
            <div className="col-1">

            </div>
        </div>
    </div>;
}
export default ProductDetails;