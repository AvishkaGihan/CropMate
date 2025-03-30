import { motion } from "framer-motion";
import { Leaf, CheckCircle2 } from "lucide-react";
import { benefits } from "../../constants";
import { fadeInUp } from "../../util/animations";

export const AuthLayout = ({ children, title, subtitle, image }) => (
  <div className="min-h-screen flex">
    {/* Side Panel */}
    <div className="hidden md:block md:w-2/5 bg-cambridge-blue-700 fixed left-0 top-0 bottom-0">
      <img
        src={image}
        alt="Farm landscape"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cambridge-blue-900/90 to-cambridge-blue-700/50" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
              <Leaf size={40} className="text-mindaro-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            <p className="text-white/80 text-lg">{subtitle}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="px-4 text-white/60 text-sm">BENEFITS</span>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <ul className="space-y-4 text-left">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                    <CheckCircle2 size={16} className="text-mindaro-400" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-full md:ml-[40%] md:w-3/5 bg-cambridge-blue-50 min-h-screen flex items-center justify-center p-6 overflow-y-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-md w-full rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white my-6"
      >
        {children}
      </motion.div>
    </div>
  </div>
);
