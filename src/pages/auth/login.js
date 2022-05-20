import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const required = (value) => {
    if (!value) {
      return (
        <div className="text-danger" >
          This field is required!
        </div>
      );
    }
};

export default function Login() {
    const history = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    console.log("aaa")
                    history("/product/list");
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{borderRadius: "1rem"}} >
                    <div className="card-body p-5 text-center"  style={{backgroundColor: "#eee", borderRadius: "1rem"}}>

                        <h3 className="mb-5">Sign in</h3>

                        {message && (
                                <div className="alert alert-danger my-2" role="alert">
                                    {message}
                                </div>
                        )}

                        <Form onSubmit={handleLogin} ref={form}>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="typeEmailX-2">User Name</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                                />
                            </div>

                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                            </div>

                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
    )
}