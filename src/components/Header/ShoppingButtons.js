import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductWidget from './ProductWidget';

function ShoppingButtons() {
    const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishlist);

    const cartLength = cart.items.length;
    const wishlistLength = wishlist.length;

    return (
        <div className="col-md-3 clearfix">
            <div className="header-ctn">
                <div className="header-ctn-link">
                    <Link to="/wishlist">
                        <i className="header-ctn-icon fa fa-heart-o"></i>
                        <span className="header-ctn-title">Wishlist</span>
                        <div className="header-ctn-qty">{wishlistLength}</div>
                    </Link>
                </div>

                <div className="dropdown">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <div className="header-ctn-link">
                            <i className="header-ctn-icon fa fa-shopping-cart"></i>
                            <span className="header-ctn-title">Giỏ hàng</span>
                            <div className="header-ctn-qty">{cartLength}</div>
                        </div>
                    </div>

                    <div className="cart-dropdown">
                        {cartLength > 0 ? (
                            <div>
                                <div className="cart-list">
                                    {cart.items.map((product, index) => {
                                        return <ProductWidget key={index} data={product} />;
                                    })}
                                </div>

                                <div className="cart-summary">
                                    <h5>Tạm tính: {cart.total.toLocaleString() + ' ₫'}</h5>
                                </div>

                                <div className="cart-btns">
                                    <Link to="/gio-hang">Xem giỏ hàng</Link>

                                    <Link to="/thanh-toan">
                                        Thanh toán <i className="fa fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h5 className="cart-heading">Giỏ hàng trống</h5>
                                <h5>Bạn chưa có sản phẩm nào trong giỏ hàng!</h5>
                            </div>
                        )}
                    </div>
                </div>

                <div className="menu-toggle">
                    <a href="#">
                        <i className="fa fa-bars"></i>
                        <span>Menu</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ShoppingButtons;
