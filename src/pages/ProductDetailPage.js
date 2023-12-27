import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import ProductDetail from '../components/ProductDetail';
import ProductSection from '../components/ProductSection';
import RelatedBook from '../components/RelatedBook';

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const EXPIRATION_DAYS = 30;

function ProductDetailPage() {
    const [product, setProduct] = useState({});
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [combos, setCombos] = useState([]);

    const { slug } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const productRes = await axios.get(`${apiDomain}/${slug}`);
                setProduct(productRes.data.data);
                setCombos(productRes.data.data.combos);

                const categoryId = productRes.data.data.category_id;

                const relatedBooksRes = await axios.get(`${apiDomain}/get-books-by-category/${categoryId}`);
                setRelatedBooks(relatedBooksRes.data.data);

                const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];

                const existingProductIndex = viewedProducts.findIndex((viewedProduct) => viewedProduct.slug === slug);

                if (existingProductIndex !== -1) {
                    viewedProducts[existingProductIndex].timestamp =
                        new Date().getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
                } else {
                    const newViewedProduct = {
                        ...productRes.data.data,
                        timestamp: new Date().getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
                    };
                    viewedProducts.push(newViewedProduct);
                }

                viewedProducts.sort((a, b) => b.timestamp - a.timestamp);

                const validViewedProducts = viewedProducts.filter(
                    (viewedProduct) => viewedProduct.timestamp > new Date().getTime(),
                );

                localStorage.setItem('viewedProducts', JSON.stringify(validViewedProducts));
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }

        fetchData();
    }, [slug]);

    return (
        <DefaultLayout>
            <ProductDetail data={product} />
            {product.combos && <ProductSection title={'Combo'} data={combos} />}
            {!product.is_combo && <RelatedBook data={relatedBooks} slug={slug} />}
        </DefaultLayout>
    );
}

export default ProductDetailPage;