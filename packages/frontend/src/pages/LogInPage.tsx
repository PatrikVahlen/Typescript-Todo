import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {

    const [userName, setUserName] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("");

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
                            <button className="buyButton" onClick={(e) => console.log(userName, userPassword)}>Log In</button>
                        </div>
                        <div>
                            {/* {error} */}
                        </div>
                    </div>
                    <Link to="/user/registerpage" className="linkRegister">Register a new user</Link>
                </div>
            </section>
        </>
    )
}