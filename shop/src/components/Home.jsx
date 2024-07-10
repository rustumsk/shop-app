import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"; // Importing useEffect, useRef, and useState
import '../styles/home.scss';

export default function Home(){
    const [data, cart] = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0); // State to track current index of carousel
    const backgroundImages = data.slice(0, 5).map(item => item.image); // Array of background images for carousel
    const carouselTimer = useRef(null); // Ref for carousel timer

    // Function to handle automatic carousel change
    const handleCarousel = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    };

    useEffect(() => {
        // Set interval for automatic carousel change (every 2 seconds as an example)
        carouselTimer.current = setInterval(handleCarousel, 1000);

        return () => {
            // Clear interval on component unmount to prevent memory leaks
            clearInterval(carouselTimer.current);
        };
    }, []); // Empty dependency array to run useEffect only once on component mount

    return(
        <section className="h-container">
            <section className="upper">
                <section className="left">
                    <div className="box">
                        <div className="card" style={{backgroundImage: `url(${backgroundImages[currentIndex]})`}}></div>
                    </div>
                </section>
                <section className="right">
                    <div className="h-info">
                        <p className="h-des"><span>This is a sample shop!</span></p>
                        <p className="h-des"><span>All of the contents here are not real items.</span></p>
                        <p className="h-des"><span>Click the shop button to shop!</span></p>
                    </div>
                    <div className="h-btn">
                        <Link to="shop"><button>Shop</button></Link>
                    </div>
                </section>
            </section>
        </section>
    );
}