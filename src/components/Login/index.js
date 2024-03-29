import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import axiosInstance from '../../services/axiosInstance';
import Swal from 'sweetalert2';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [authenticationError, setAuthenticationError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setValidationErrors({
            ...validationErrors,
            [name]: '',
        });
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const res = await axiosInstance.post('/login', formData);

            const user = await axiosInstance.get('/me', {
                headers: { Authorization: 'Bearer ' + res.access_token },
            });

            delete user.avatar;

            dispatch(login({ token: res.access_token, user: user }));

            navigate('/');

            Swal.fire({
                title: res.message,
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            if (error.response.status === 422) {
                setValidationErrors(error.response.data.errors);
                setAuthenticationError('');
            } else if (error.response.status === 401) {
                setAuthenticationError(error.response.data.message);
            } else {
                console.error('Lỗi: ', error);

                Swal.fire({
                    title: 'Đăng nhập không thành công!',
                    icon: 'error',
                    timer: 2000,
                });
            }
        }
    };

    return (
        <div id="login" className="section d-flex justify-content-center align-items-center">
            <div className="container">
                <form onSubmit={handleLogin}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5">
                            <div className="form-login">
                                <div className="section-title text-center">
                                    <h3 className="title">Đăng nhập</h3>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleInputChange}
                                        placeholder="Tên đăng nhập"
                                        className={`form-control input ${
                                            validationErrors.username ? 'is-invalid' : ''
                                        }`}
                                    />
                                    <div className="invalid-feedback username-error">{validationErrors.username}</div>
                                </div>

                                <div className="form-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={handleInputChange}
                                        placeholder="Mật khẩu"
                                        className={`form-control input ${
                                            validationErrors.password ? 'is-invalid' : ''
                                        }`}
                                    />
                                    <div className="invalid-feedback password-error">{validationErrors.password}</div>
                                </div>

                                {authenticationError && (
                                    <div className="alert alert-danger" role="alert">
                                        {authenticationError}
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <Link to="/quen-mat-khau">
                                        <span>Quên mật khẩu?</span>
                                    </Link>

                                    <div className="input-checkbox">
                                        <input type="checkbox" onChange={handleCheckboxChange} id="terms" />
                                        <label htmlFor="terms">
                                            <span></span>
                                            Hiện mật khẩu
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center my-4">
                                    <button type="submit" className="primary-btn w-100">
                                        Đăng nhập
                                    </button>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn-google w-100">
                                            <i className="fa fa-google"></i> Google
                                        </button>
                                    </div>

                                    <div className="col-md-6">
                                        <button type="button" className="btn-facebook w-100">
                                            <i className="fa fa-facebook-square"></i> Facebook
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <span>Chưa có tài khoản?</span>
                                    <Link to="/dang-ky" className="register-link">
                                        Đăng ký
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
