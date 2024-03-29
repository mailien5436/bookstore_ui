import { useSelector } from 'react-redux';
import OrderDetailRow from './OrderDetailRow';

function OrderDetail() {
    const orderDetail = useSelector((state) => state.orderDetail);
    const colSpanValue = orderDetail.status === 4 ? 4 : 3;

    const totalAmount = orderDetail.items.reduce((total, detail) => {
        return total + parseInt(detail.price) * parseInt(detail.quantity);
    }, 0);

    return (
        <div className="modal fade" id="orderDetail" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">
                            Chi tiết hoá đơn
                        </h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="fs-2" scope="col">
                                        Sản phẩm
                                    </th>
                                    <th className="fs-2" scope="col">
                                        Giá bán
                                    </th>
                                    <th className="fs-2" scope="col">
                                        Số lượng
                                    </th>
                                    <th className="fs-2" scope="col">
                                        Thành tiền
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.items.map((detail, index) => {
                                    return <OrderDetailRow key={index} data={detail} />;
                                })}
                                <tr>
                                    <td colSpan={colSpanValue} className="order-detail text-right">
                                        Tổng thành tiền:
                                    </td>
                                    <td className="order-detail fw-bold text-danger">
                                        {totalAmount.toLocaleString() + ' ₫'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
