import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import itemsData from './itemsData.json';
import Button from "../../components/layouts/Button";
import QuantitySelector from "../../components/quantitySelector/QuantitySelector";
import useCarts from "../../hooks/useCart";

function Home() {
    const { addToCart, itemQuantities, addToCartList } = useCarts();
    const [currentDayOfWeek] = useState(new Date().getDay());

    useEffect(() => {
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(itemsData));
        }
    }, []);

    const isSpecialDay = (specialDays) => {
        return specialDays.includes(currentDayOfWeek);
    };

    return (
        <>
            <Header />
            <div className="row mt-4 mb-4">
                <div className="col-md-12" style={{ position: 'relative', height: '500px' }}>
                    <img
                        src="/assets/homePageImage.jpg"
                        className="card-img-top img-fluid"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
            <h2 className="mt-3 ps-3 pt-2" style={{ color: "rgb(98, 98, 137)" }}>Products</h2>
            <div className="container mt-4 mb-4">
                <div className="row mb-4">
                    {itemsData.map(item => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="box" style={{ paddingTop: '80%', position: 'relative' }}>
                                    <img
                                        src={`/assets/items/${item.image}`}
                                        className="card-img-top img-fluid"
                                        alt={item.name}
                                        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text" style={{ color: isSpecialDay(item.specialDays) ? "green" : "inherit" }}>
                                        Price: ${isSpecialDay(item.specialDays) ? item.specialPrice : item.price}
                                    </p>
                                    <span className="d-flex align-items-center mt-auto">
                                        <p className="mb-0 me-2">Quantity:</p>
                                        <QuantitySelector
                                            onChange={(quantity) => addToCartList(item.id, quantity)}
                                            initialValue={itemQuantities[item.id] || 1}
                                        />
                                    </span>
                                    <Button buttonName="Add to cart" onClick={() => addToCart(item.id)} className="btn btn-primary mt-auto" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;