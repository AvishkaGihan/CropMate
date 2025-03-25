import { memo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { itemVariants } from '../../util/Auth/animations';

const AuthFooter = ({
    showAlternateAuthLink = true,
    isSignIn = true,
}) => {
    return (
        <motion.div variants={itemVariants} className="mt-8 text-center">
            {showAlternateAuthLink && (
                <div className="mt-6 text-center text-cambridge-blue-700 mb-6">
                    <p>
                        {isSignIn ? "Don't have an account? " : "Already have an account? "}
                        <Link
                            to={isSignIn ? "/signup" : "/sign-in"}
                            className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline transition-colors"
                        >
                            {isSignIn ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            )}

            <div className="text-sm text-cambridge-blue-600">
                <span>{isSignIn ? "By signing in" : "By creating an account"}, you agree to our </span>
                <Link to="/terms" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">Terms of Service</Link>
                <span> and </span>
                <Link to="/privacy" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">Privacy Policy</Link>
            </div>
        </motion.div>
    );
};

export default memo(AuthFooter);