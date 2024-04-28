import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import QuantitySelector from "../../components/quantitySelector/QuantitySelector";
import useCarts from "../../hooks/useCart";

const Deals = () => {
    const [specialProducts, setSpecialProducts] = useState([]);
    const { addToCart, itemQuantities, addToCartList } = useCarts();

    useEffect(() => {
        let itemsData = localStorage.getItem('items');
        itemsData = JSON.parse(itemsData);
        const currentDayOfWeek = new Date().getDay();
        const todaySpecialProducts = itemsData.filter(item => {
            console.log(item);
            if (item.specialDays && Array.isArray(item.specialDays)) {
                return item.specialDays.includes(currentDayOfWeek);
            } else {
                return false;
            }
        });
        setSpecialProducts(todaySpecialProducts);
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
                        <div key={item.id} className="col-md-3 mb-4">
                            <div className="card h-100">
                                <div className="box" style={{ paddingTop: '80%', position: 'relative' }}>
                                    <img src={`/assets/items/${item.image}`} className="card-img-top img-fluid" alt={item.name} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Offer Price: ${item.specialPrice}</p>
                                    <p className="card-text">Orginal Price: ${item.price}</p>
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

            <h3 style={{ color: "rgb(98, 98, 137)" }} className="ms-4 mt-4">Small-Scale Farming and its Implementation:</h3>
            <div className="row mb-4">
                <div className="col-md-5" style={{ position: 'relative', height: '400px' }}>
                    <img src="/assets/backyardFarming.jpg" className="card-img-top img-fluid ms-4" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} />
                </div>
                <div className="col-md-6 ms-4">
                    <p>
                        Small-scale farming involves agricultural practices conducted on relatively small plots of land, typically managed by individuals, families, or small groups. This approach often emphasizes sustainability, community involvement, and diversified production. Here's how it can be done:
                        Land Management: Small-scale farmers utilize their land efficiently, often practicing crop rotation and intercropping to maximize yields while preserving soil health.
                        Sustainable Techniques: They employ sustainable farming techniques such as organic farming, which avoids synthetic pesticides, fertilizers, and genetically modified organisms (GMOs), relying instead on natural methods like composting, crop rotation, and biological pest control.
                        Local Engagement: Small-scale farmers engage with their local communities through farmers' markets, community-supported agriculture (CSA) programs, and direct sales, fostering relationships and providing fresh, locally grown produce.
                    </p>
                </div>
            </div>

            <div className="mb-4 ms-4" style={{marginBottom: "7rem"}}>
                <h3 style={{ color: "rgb(98, 98, 137)" }}>Tips for Growing Smaller Vegetables in Your Backyard:</h3>
                <ul>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Container Gardening:</strong> If you have limited space, consider growing smaller vegetables like cherry tomatoes, peppers, and herbs in containers or raised beds.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Vertical Gardening:</strong> Utilize vertical space by growing vining vegetables such as cucumbers, beans, and peas on trellises or vertical supports.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Succession Planting:</strong> Maximize your harvest by planting small vegetables in succession throughout the growing season, ensuring a continuous supply of fresh produce.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Companion Planting:</strong> Planting compatible vegetables together can improve growth and deter pests. For example, pairing carrots with onions or radishes can help repel pests and maximize space.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Soil Preparation:</strong> Ensure your soil is well-drained, rich in organic matter, and has the right pH level for optimal growth. Consider using compost or organic fertilizers to improve soil fertility.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Watering:</strong> Provide consistent moisture to your vegetable plants, especially during hot weather. Use mulch to retain soil moisture and reduce weed growth.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Pest Control:</strong> Monitor your plants regularly for signs of pests and diseases. Use natural pest control methods such as hand-picking pests, introducing beneficial insects, and using organic insecticidal soaps or neem oil.</li>
                    <li><strong style={{ color: "rgb(98, 98, 137)" }}>Harvesting:</strong> Harvest your vegetables when they are at their peak ripeness for the best flavor and nutritional value. Regular harvesting also encourages continuous production.</li>
                </ul>
            </div>
        </div>
    );
};

export default Deals;