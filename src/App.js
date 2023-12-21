import { Route, Routes } from 'react-router-dom';
import './style.css';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MePage from './pages/MePage';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:id" element={<BookPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/me" element={<MePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/:slug" element={<ProductDetailPage />} />
        </Routes>
    );
}

export default App;
