import { User } from "@my-todo-app/shared";
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {

    const [userName, setUserName] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const logInUser = async (name: string, password: string): Promise<void> => {
        const user: User = {
            name: name,
            password: password
        }
        try {
            const response = await axios.post<any>("/chat/login", user)
            console.log(response.data.token)
            const token = response.data.token;
            if (token) {
                localStorage.setItem("backend3", token)
                console.log("Success Log In")
                navigate("/")
            } else {
                setError("Name or password is wrong")
            }
        } catch (err) {
            console.log("Fel")
            if (err) {
                setError("Name or password is wrong")
            }
        }
    }

    return (
        <>
            <header className='header'>
                <div>
                    <Link to="/" className="link">Back to ChatPage</Link>
                </div>
                <div>
                    <h2>LoginPage</h2>
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
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </div>
                        <div className='buttonBox'>
                            <button className="Button" onClick={(e) => logInUser(userName, userPassword)}>Log In</button>
                        </div>
                        <div>
                            {error}
                        </div>
                    </div>
                    <Link to="/user/registerpage" className="linkRegister">Register a new user</Link>
                </div>
            </section>
        </>
    )
}