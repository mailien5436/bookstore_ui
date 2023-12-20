import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import ProductDetail from '../components/ProductDetail';

function ProductDetailPage() {
    const [product, setProduct] = useState({});

    const { slug } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/${slug}`);
                setProduct(res.data.data);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }

        fetchData();
    }, [slug]);

    return (
        <DefaultLayout>
            <ProductDetail data={product} />
        </DefaultLayout>
    );
}

export default ProductDetailPage;
