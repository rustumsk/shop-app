import { useState } from 'react';
import '../styles/shop.scss';
import { useOutletContext } from 'react-router-dom';

export default function Shop() {
    const [data, cart, setCart] = useOutletContext();
    const [filteredData, setFilteredData] = useState(data); // State to hold filtered items
    const [selectedOption, setSelectedOption] = useState('All'); // State to track selected option

    // Function to filter items based on selected option
    const filterItems = (option) => {
        setSelectedOption(option);
        switch (option) {
            case 'All':
                setFilteredData(data);
                break;
            case 'Men':
                setFilteredData(data.filter(item => item.category === "men's clothing"));
                break;
            case 'Women':
                setFilteredData(data.filter(item => item.category === "women's clothing"));
                break;
            case 'Jewelry':
                setFilteredData(data.filter(item => item.category === 'jewelery'));
                break;
            case 'Electronics':
                setFilteredData(data.filter(item => item.category === 'electronics'));
                break;
            case 'Price':
                setFilteredData([...data].sort((a, b) => a.price - b.price));
                break;
            default:
                setFilteredData(data);
                break;
        }
    };

    const addCart = (src, title, price) => {
        const existingItem = cart.find(item => item.src === src && item.title === title && item.price === price);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.src === src && item.title === title && item.price === price
                    ? { ...item, count: item.count + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            const newItem = {
                src: src,
                title: title,
                price: price,
                count: 1,
            };
            setCart(prevCart => [...prevCart, newItem]);
        }
    };

    return (
        <>
            <nav className="options">
                <button className={selectedOption === 'All' ? 'active' : ''} onClick={() => filterItems('All')}>All</button>
                <button className={selectedOption === 'Men' ? 'active' : ''} onClick={() => filterItems('Men')}>Men</button>
                <button className={selectedOption === 'Women' ? 'active' : ''} onClick={() => filterItems('Women')}>Women</button>
                <button className={selectedOption === 'Jewelry' ? 'active' : ''} onClick={() => filterItems('Jewelry')}>Jewelry</button>
                <button className={selectedOption === 'Electronics' ? 'active' : ''} onClick={() => filterItems('Electronics')}>Electronics</button>
                <button className={selectedOption === 'Price' ? 'active' : ''} onClick={() => filterItems('Price')}>Price</button>
            </nav>
            <section className='display'>
                {filteredData.map((item, index) => (
                    <div className='card' key={index}>
                        <div className='c-i'>
                            <span className='c-icon' style={{ backgroundImage: `url(${item.image})` }}></span>
                        </div>
                        <span className='c-name'>{item.title}</span>
                        <span className='c-price'>{`$ ${item.price}`}</span>
                        <div className='c-b'>
                            <button className='c-add' onClick={() => addCart(item.image, item.title, item.price)}>Add to cart!</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}