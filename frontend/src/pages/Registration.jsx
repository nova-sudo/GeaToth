import React, { useState } from "react";
import { IoFingerPrintOutline } from "react-icons/io5";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:3030/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log("Registration successful:", data);
                window.location.href = "/home";
            } else if (response.status === 400) {
                alert(data.error || "User already exists");
            } else {
                alert(data.error || "An error occurred during registration.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="h-screen mx-auto">
            <section className="flex justify-center items-center text-black h-screen bg-white font-bold bg-gradient-to-r">
                <div className="flex flex-col py-16 px-24 rounded-3xl space-y-4">
                    <h1 className="text-center pb-10 text-black font-pixel text-5xl animate-pulse">
                        Sign Up / Login
                    </h1>
                    <label htmlFor="email" className="font-pixel text-2xl">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-72 text-lg rounded-lg ring-1 ring-black h-10 px-2 font-pixel text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="font-pixel text-2xl">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-72 rounded-lg text-3xl h-10 px-2 ring-1 ring-black font-pixel text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleRegister}
                        className="mt-10 text-center text-6xl animate-pulse ml-28 hover:text-7xl hover:ml-[105px]"
                    >
                        <IoFingerPrintOutline />
                    </button>
                </div>
            </section>
        </div>
    );
}
