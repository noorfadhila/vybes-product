import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import { register } from "../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-danger">
              This field is required!
            </div>
          );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
};
const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
};
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
};

export default function Register () {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        console.log("handleRegister")
        setSuccessful(false);
        form.current.validateAll();
        console.log(checkBtn.current.context._errors)
        if (checkBtn.current.context._errors.length === 0) {
        dispatch(register(username, email, password))
            .then(() => {
            setSuccessful(true);
            })
            .catch(() => {
            setSuccessful(false);
            });
        }
    };
    return(
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5" style={{backgroundColor: "#eee", borderRadius: "25px"}}>
                                <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" >

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <Form onSubmit={handleRegister} ref={form}>
                                        {!successful && (
                                            <div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        value={username}
                                                        onChange={onChangeUsername}
                                                        validations={[required, vusername]}
                                                    />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        value={email}
                                                        onChange={onChangeEmail}
                                                        validations={[required, validEmail]}
                                                    />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    <Input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={password}
                                                        onChange={onChangePassword}
                                                        validations={[required, vpassword]}
                                                    />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>
                                            </div>
                                        )}
                                        {message && (
                                            <div className="form-group">
                                            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                                {message}
                                                { successful ? <span> Silakan Login <a href='/login'>di sini</a></span> : "" }
                                            </div>
                                            </div>
                                        )}
                                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                    </Form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                    className="img-fluid" alt="Sample" />

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}