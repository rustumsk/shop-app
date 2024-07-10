import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.scss';

export default function Navbar({ cart }) {
    const location = useLocation();

    return (
        <nav className='container'>
            <div className="title">
                <p>Sample Shop</p>
            </div>
            <section className="links">
                <Link to="/shop" className={`link ${location.pathname === '/shop' ? 'active' : ''}`}>
                    Shop
                </Link>
                <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''}`}>
                    Home
                </Link>
            </section>
            <Link to="/cart" className='icon'>
                <div className='i'>
                    <div className='ic'></div>
                </div>
                <div className='c'>
                    <p>{cart.length}</p>
                </div>
            </Link>
        </nav>
    );
}