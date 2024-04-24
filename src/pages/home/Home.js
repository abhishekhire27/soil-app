import { useEffect } from "react";
import Header from "../../components/header/Header";
import itemsData from './itemsData.json';
import Button from "../../components/layouts/Button";
import Card from '../../components/cards/Card';

function Home(props) {

    useEffect(() => {
        // if(!localStorage.getItem('soil-app')){
        //     localStorage.setItem('soil-app', {})
        // }
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(itemsData));
            console.log(itemsData);
        }

    }, [])

    const addToCart = () => {

    }

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />

            {/* <h2 className="mt-3 ps-3 pt-2" style={{ backgroundColor: "rgb(33, 139, 178)" }}> */}
            <h2 className="mt-3 ps-3 pt-2">
                Fruits and Vegetables
            </h2>

            <div className="container mt-4">
                <div className="row">
                    {itemsData.map(item => (
                        <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                            <Card title={item.name}>
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    {/* <h5 className="card-title">{item.name}</h5> */}
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Price: ${item.price}</p>
                                </div>
                                <Button buttonName="Add to cart" onClick={addToCart} style={{ width: "5rem" }} />

                            </Card>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default Home;