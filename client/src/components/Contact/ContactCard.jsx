import { motion } from "framer-motion";
import { itemVariants } from "../../pages/animationVariants";

const ContactCard = ({ icon, title, details, link, linkText }) => {
    return (
        <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-cambridge-blue-200/30 hover:shadow-md 
                transition-all duration-300 flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ y: -5 }}
        >
            <div className="w-12 h-12 rounded-full bg-cambridge-blue-100/70 flex items-center justify-center text-cambridge-blue-600 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-cambridge-blue-800 mb-2">{title}</h3>
            <p className="text-cambridge-blue-700/80 mb-3">{details}</p>
            {link && (
                <a
                    href={link}
                    className="text-golden-brown-500 font-medium hover:text-golden-brown-600 transition-colors"
                >
                    {linkText || "Contact Us"}
                </a>
            )}
        </motion.div>
    );
};

export default ContactCard;