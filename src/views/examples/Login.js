/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  return (
    <>
    
      <Col lg="12" md="20"style={{marginTop:"130px"}}>
          {/* Carte principale */}
          <Card
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
              backdropFilter: "blur(10px)", // Blur effect
              overflow: "hidden",
            }}
          >
            {/* En-tête de la carte */}
            <CardHeader
              style={{
                backgroundColor: "transparent",
                borderBottom: "none",
                padding: "2rem 1rem 1rem",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#4a90e2", // Blue color for the title
                  marginBottom: "0.5rem",
                }}
              >
                Welcome Back!
              </h1>
              <p style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                Sign in to continue to your account.
              </p>
            </CardHeader>

            {/* Corps de la carte */}
            <CardBody style={{ padding: "2rem" }}>
              {/* Formulaire */}
              <Form role="form">
                {/* Champ Nom & Prénom */}
                <FormGroup style={{ marginBottom: "1.5rem" }}>
                  <InputGroup
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText
                        style={{
                          backgroundColor: "#ffffff",
                          border: "none",
                          padding: "0.75rem",
                        }}
                      >
                        <i
                          className="ni ni-single-02"
                          style={{ color: "#4a90e2" }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Nom & Prénom"
                      type="text"
                      autoComplete="name"
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.75rem",
                      }}
                    />
                  </InputGroup>
                </FormGroup>

                {/* Champ Mot de passe */}
                <FormGroup style={{ marginBottom: "1.5rem" }}>
                  <InputGroup
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText
                        style={{
                          backgroundColor: "#ffffff",
                          border: "none",
                          padding: "0.75rem",
                        }}
                      >
                        <i
                          className="ni ni-lock-circle-open"
                          style={{ color: "#4a90e2" }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      style={{
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.75rem",
                      }}
                    />
                  </InputGroup>
                </FormGroup>

                {/* Case à cocher "Remember me" */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    id="customCheckLogin"
                    style={{ marginRight: "0.5rem" }}
                  />
                  <label
                    htmlFor="customCheckLogin"
                    style={{ color: "#6c757d", fontSize: "0.875rem" }}
                  >
                    Remember me
                  </label>
                </div>

                {/* Bouton de connexion */}
                <div style={{ textAlign: "center" }}>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "#4a90e2",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#ffffff",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                    type="button"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#357ABD";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#4a90e2";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>

            {/* Lien pour créer un nouveau compte */}
            <Row style={{ marginTop: "1rem", marginBottom: "2rem" }}>
              <Col
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                xs="12"
              >
                <Link
                  to="/auth/register"
                  style={{
                    color: "#4a90e2",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  <small>Don't have an account? Create one</small>
                </Link>
              </Col>
            </Row>
          </Card>
      </Col>
    </>
  );
};

export default Login;
