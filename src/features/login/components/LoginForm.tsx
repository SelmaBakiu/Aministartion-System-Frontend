import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button, Alert, InputGroup, Spinner} from 'react-bootstrap';
import {FaEnvelope, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';
import {useLogin} from "../api/login.ts";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const login = useLogin()
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors for the field being typed in
        if (errors[name as keyof LoginFormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await login.mutate({
                email: formData.email,
                password: formData.password
            })
            // Navigate based on user role (handled in the auth context)
            // navigate('/dashboard'); todo: remove this comment maybe
        } catch (error) {
            setErrors({
                general: 'Invalid email or password'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Welcome</h2>
                                <p className="text-muted">Please sign in to continue</p>
                            </div>

                            {/* Error Alert */}
                            {errors.general && (
                                <Alert variant="danger" className="mb-4">
                                    {errors.general}
                                </Alert>
                            )}

                            {/* Login Form */}
                            <Form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>
                                            <FaEnvelope/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                {/* Password Field */}
                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>
                                            <FaLock/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                {/* Remember Me*/}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remember me"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                </div>
                                {/* Submit Button */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                    className="w-100"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;