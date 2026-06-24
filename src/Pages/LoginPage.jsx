import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import '../style/Login.css'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanEmail = email.trim().toLowerCase();
        
        const registeredUsers = JSON.parse(localStorage.getItem("seyshoppy_accounts")) || [];

        if (isLogin) {
            const existingUser = registeredUsers.find(
                (u) => u.email === cleanEmail && u.password === password
            );

            if (existingUser) {
                login({
                    name: existingUser.name,
                    email: existingUser.email,
                    memberSince: existingUser.memberSince
                });
                console.log("Welcome back, login successful!");
                navigate("/");
            } else {
                alert("Incorrect email or password. If you don't have an account, please register first!");
            }
        } else {
            const emailExists = registeredUsers.some((u) => u.email === cleanEmail);

            if (emailExists) {
                alert("An account with this email already exists. Please login instead.");
                setIsLogin(true); 
                return;
            }

            const newAccount = {
                name: name.trim(),
                email: cleanEmail,
                password: password, 
                memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };

            registeredUsers.push(newAccount);
            localStorage.setItem("seyshoppy_accounts", JSON.stringify(registeredUsers));

            login({
                name: newAccount.name,
                email: newAccount.email,
                memberSince: newAccount.memberSince
            });

            console.log("Account successfully registered and saved!");
            navigate("/");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="left-panel">
                    <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                             <input 
                                type="text" 
                                placeholder="Enter your name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                required 
                             />
                        )}
                        {!isLogin && (
                            <input type="text" placeholder="Enter your number" pattern="[0-9]{10}" maxLength={10} required />
                        )}
                        
                        <input 
                            type="email" 
                            placeholder="Enter your Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        
                        <button className="bttn" type="submit">
                            {isLogin ? "Login" : "Signup"}
                        </button>
                    </form>
                </div>
                <div className="right-panel">
                    {isLogin ? (
                        <>
                            <h2>HELLO,</h2>
                            <h1>WELCOME BACK</h1>
                            <p>Don't have an account?</p>
                            <footer className="btn" type="button" onClick={() => setIsLogin(false)}> Register first</footer>
                        </>
                    ) : (
                        <>
                            <h2>Sign up,</h2>
                            <h1>CREATE ACCOUNT</h1>
                            <p>Already have an account?</p>
                            <footer className="btn" type="button" onClick={() => setIsLogin(true)}>Login instead</footer>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}