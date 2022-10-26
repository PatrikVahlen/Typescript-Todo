import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@my-todo-app/shared"
import axios from "axios";
import "../App.css"

export default function Register() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const [userEmail, setuserEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("");



    const navigate = useNavigate();

    const createUser = async (name: string, password: string): Promise<void> => {
        const user: User = {
            name: name,
            password: password
        }
        try {
            const response = await axios.post<User>("/user", user)
            navigate("/user/login")
        } catch (err) {
            if (err) {
                console.log(err)
                setError("Email and password should have 5 characters or Email already exists")
            }
        }
    }

    return (
        <div className="App">
            <header className='header'>
                <div>
                    <Link to="/" className="link">Back to StartPage</Link>
                </div>
                <div>
                    <h2>RegisterPage</h2>
                </div>
                <div>
                </div>
            </header>
            <section>
                <div className="login">
                    <div className="loginSpace">
                        <div>
                            <label>Email: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => setuserEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="buttonBox">
                            <button className='buyButton' onClick={(e) => createUser(userEmail, password)}>Create User</button>
                        </div>
                        <div>
                            {error}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}