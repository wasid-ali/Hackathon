import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./Login.css"; // Custom CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //credentials loaded from .env file
  const validEmail = process.env.REACT_APP_LOGIN_EMAIL;
  const validPassword = process.env.REACT_APP_LOGIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    if (email === "REACT_APP_LOGIN_EMAIL" && password === "REACT_APP_LOGIN_PASSWORD") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  
  return (
    <div className="login-page">
      <Container fluid>
        <Row className="justify-content-center align-items-center min-vh-100">
          {/* Left column for the image */}
          <Col lg="8" md="7" sm="12" className="d-none d-md-block">
            <div className="image-container">
              <img 
                src="https://th.bing.com/th/id/R.93867d752c7b923580419a3b6ac772c6?rik=WFvx8UrrWsYhFQ&riu=http%3a%2f%2fwww.bizpenguin.com%2fwp-content%2fuploads%2f2021%2f05%2fnew-customer-795.jpg&ehk=CjTFE3q2WtVny4YuxD13tG1JoOG2Iq0h4800tcC33RE%3d&risl=&pid=ImgRaw&r=0" 
                alt="Retail Banner" 
                className="img-fluid w-100" 
                style={{ height: '96vh', objectFit: 'cover' }} 
              />
            </div>
          </Col>
          
          {/* Right column for the login form */}
          <Col lg="4" md="6" sm="8">
            <Card className="shadow-lg p-4">
              <CardBody>
                <div className="text-center mb-3">
                  <h3>Welcome to One Customer View!</h3>
                </div>
                <div className="text-center mb-3">
                  <Button color="primary" className="mr-2 btn-block mb-2">
                    <FaGithub /> Github
                  </Button>
                  <Button color="danger" className="btn-block">
                    <FaGoogle /> Google
                  </Button>
                </div>
                <hr />
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Label check>
                      <Input type="checkbox" /> Remember me
                    </Label>
                  </FormGroup>
                  <Button color="primary" block type="submit">
                    Sign in
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
