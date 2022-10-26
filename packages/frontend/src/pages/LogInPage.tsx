import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {

    const [userEmail, setuserEmail] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("");

    return (
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
                            onChange={(e) => setuserEmail(e.target.value)}
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
                        <button className="buyButton" onClick={(e) => console.log(userEmail, userPassword)}>Log In</button>
                    </div>
                    <div>
                        {/* {error} */}
                    </div>
                </div>
                <Link to="/register" className="linkRegister">Register a new user</Link>
            </div>
        </section>
    )
}