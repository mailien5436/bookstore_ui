import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import DefaultLayout from '../layouts/DefaultLayout';
import Products from '../components/Products';
import Pagination from '../components/Pagination';

function SearchPage() {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const { keyword } = useParams();

    const fetchProducts = async (page = 1) => {
        try {
            const res = await axiosInstance.get(`/search?keyword=${keyword}&page=${page}`);
            setProducts(res.data.products);
            setPageCount(res.data.total_pages);
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [keyword]);

    const handlePageChange = ({ selected }) => {
        const page = selected + 1;
        fetchProducts(page);
    };

    return (
        <DefaultLayout>
            {products.length > 0 ? (
                <>
                    <Products title="Kết quả tìm kiếm:" data={products} />
                    <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
                </>
            ) : (
                <div style={{ height: '300px' }}>
                    <h3 className="title p-5 mx-5">Không tìm thấy kết quả tìm kiếm phù hợp!</h3>
                </div>
            )}
        </DefaultLayout>
    );
}

export default SearchPage;
