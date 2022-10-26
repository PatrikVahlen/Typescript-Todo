import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@my-todo-app/shared"
import axios from "axios";
import "../App.css"

export default function Register() {

    axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

    const [userName, setUserName] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [error, setError] = useState<string>("");


    const navigate = useNavigate();

    const createUser = async (name: string, password: string): Promise<void> => {
        const user: User = {
            name: name,
            password: password
        }
        try {
            const response = await axios.post<User>("/chat/register", user)
            console.log(response)
            console.log("Success")
            navigate("/user/loginpage")
        } catch (err) {
            if (err) {
                console.log(err)
                console.log()
                setError("Name already exists or invalid entry")
            }
        }
    }

    return (
        <div className="App">
            <header className='header'>
                <div>
                    <Link to="/" className="link">Back to ChatPage</Link>
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
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)} />
                        </div>
                        <div className="buttonBox">
                            <button className='buyButton' onClick={(e) => createUser(userName, userPassword)}>Create User</button>
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