import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../App.css";
import { auth } from "../config/database";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
         navigate("/gallery");
        // ...
      })
      .catch((error) => {
        setError("Invalid email or password, please confirm and try again");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <>
      <MDBContainer className="my-5" style={{ maxWidth: "55rem" }}>
        <MDBCard>
          <form onSubmit={handleSubmit}>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdhbGxlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <h2
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px", textAlign: "center" }}
                  >
                    Image Gallery Sign In
                  </h2>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    type="email"
                    size="md"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlmd"
                    type="password"
                    size="md"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />

                  <MDBBtn
                    className=" px-4 btn-no-active"
                    color="dark"
                    size="lg"
                  >
                    Login
                  </MDBBtn>
                  {/* Error message */}
                  {error && <div className="text-danger mb-3">{error}</div>}
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "#393f81" }}>
                      Register here
                    </Link>
                  </p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SignIn;
