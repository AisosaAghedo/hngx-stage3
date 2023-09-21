import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/database";

import '../index.css'
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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState(null);
   const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if password and confirm password match
    if (password !== cPassword) {
      // Display error message for passwords not matching
      setError("Passwords do not match");
      return;
    }

    // Check if password length is at least 7 characters
    if (password.length < 7) {
      // Display error message for password length less than 7 characters
      setError("Password should be at least 7 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;

        switch (errorCode) {
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "Email is already in use.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
            break;
        }
        
        setError(errorMessage);
        // ..
      });
    setUsername("");
    setEmail("");
    setPassword("");
    setCPassword("");
  };
  return (
    <MDBContainer className="my-5" style={{ maxWidth: "58rem" }}>
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
                  Sign Up
                </h2>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  type="text"
                  size="sm"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  type="email"
                  size="sm"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlmd"
                  type="password"
                  size="sm"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label=" Confirm Password"
                  type="password"
                  size="sm"
                  onChange={(event) => setCPassword(event.target.value)}
                  required
                />

                <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                  Register
                </MDBBtn>
                {/* Error message */}
                {error && <div className="text-danger mb-3">{error}</div>}
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Already have an account?{" "}
                  <Link to="/" style={{ color: "#393f81" }}>
                    Login here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCard>
    </MDBContainer>
  );
};

  export default SignUp