import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import QuantitySelector from "../../components/quantitySelector/QuantitySelector";
import useCarts from "../../hooks/useCart";
import { getAllItems } from '../../services/items.services';
import { useToast } from "../../components/Toaster/ToastContext";
import ReviewItem from "../../components/ReviewItem/ReviewItem";

const Deals = () => {
    const { addToast } = useToast();
    const [specialProducts, setSpecialProducts] = useState([]);
    const { addToCart, itemQuantities, addToCartList } = useCarts();
    
    const[itemsData, setItemsData] = useState([]);

    useEffect( () => {
        if(itemsData.length > 0){
            const currentDayOfWeek = new Date().getDay();
            const todaySpecialProducts = itemsData.filter(item => {
                const specialDays = JSON.parse(item.specialDays)
                if (specialDays && Array.isArray(specialDays)) {
                    return item.specialDays.includes(currentDayOfWeek);
                } else {
                    return false;
                }
            });

            setSpecialProducts(todaySpecialProducts);
        }
    },[itemsData])

    useEffect( () => {
        try{
            getAllItems().then(data => {
                setItemsData(data.data);
                
            });
        }
        catch(error){
            
        }

    }, []);

    return (
        <div>
            <Header />
            <div className="row mt-4 mb-4">
                <div className="col-md-12" style={{ position: 'relative', height: '500px' }}>
                    <img
                        src="/assets/dealImage.jpg"
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
            <h2 style={{ color: "rgb(98, 98, 137)" }} className="ms-4 mt-4">Special Products of the Week</h2>
            <div className="container mt-4">
                <div className="row mb-1">
                    {specialProducts.map(item => (
                        <div key={item.itemId} className="col-md-3 mb-4">
                            <div className="card h-100">
                                <div className="box" style={{ paddingTop: '80%', position: 'relative' }}>
                                    <img src={item.image} className="card-img-top img-fluid" alt={item.name} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Offer Price: ${item.specialPrice}</p>
                                    <p className="card-text">Orginal Price: ${item.price}</p>
                                    <span className="d-flex align-items-center mt-auto">
                                        <p className="mb-0 me-2">Quantity:</p>
                                        <QuantitySelector
                                            onChange={(quantity) => addToCartList(item.itemId, quantity)}
                                            initialValue={itemQuantities[item.itemId] || 1}
                                        />
                                    </span>
                                    <Button buttonName="Add to cart" onClick={() => addToCart(item.itemId)} className="btn btn-primary mt-auto" />
                                </div>
                                <ReviewItem path="/deals" item={item}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deals;