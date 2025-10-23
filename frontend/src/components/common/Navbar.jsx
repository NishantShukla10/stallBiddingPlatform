// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { getRole, logout } from "../../utils/auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

export default function Navbar() {
    const role = getRole();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logout Successfully')
        navigate("/");
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="font-bold text-xl sm:text-2xl hover:text-blue-100 transition-colors duration-200"
                        >
                            Stall Bidding
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/stalls" 
                            className="hover:text-blue-100 transition-colors duration-200 font-medium"
                        >
                            Stalls
                        </Link>
                        
                        {role === "principal" && (
                            <Link 
                                to="/dashboard" 
                                className="hover:text-blue-100 transition-colors duration-200 font-medium"
                            >
                                Dashboard
                            </Link>
                        )}
                        
                        {role === "student" && (
                            <Link 
                                to="/my-bids" 
                                className="hover:text-blue-100 transition-colors duration-200 font-medium"
                            >
                                My Bids
                            </Link>
                        )}
                        
                        {!role ? (
                            <>
                                <Link 
                                    to="/login" 
                                    className="hover:text-blue-100 transition-colors duration-200 font-medium"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-white text-blue-600  px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <Button
                                text="Logout"
                                color="red"
                                onClick={() => handleLogout()}
                            />
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-blue-500">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            to="/stalls"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Stalls
                        </Link>
                        
                        {role === "principal" && (
                            <Link
                                to="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                Dashboard
                            </Link>
                        )}
                        
                        {role === "student" && (
                            <Link
                                to="/my-bids"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                My Bids
                            </Link>
                        )}
                        
                        {!role ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <Button
                                text="Logout"
                                color="red"
                                onClick={() => handleLogout()}
                            />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}