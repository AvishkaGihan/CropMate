import { memo } from "react";
import { Link } from 'react-router'
import Badge from "../Shared/Badge";
import CropCardButton from "./CropCardButton";

const CropCard = ({ crop }) => {
    return (
        <Link to={`/product/${crop.id}`} className="block h-full">
            <div
                className="bg-white rounded-2xl shadow-sm overflow-hidden
                    group relative border border-cambridge-blue-100/50 h-full flex flex-col
                    hover:-translate-y-2 transition-transform duration-200 ease-out"
            >
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cambridge-blue-400 to-mindaro-400"></div>
                {/* Badge */}
                {crop.badge && <Badge variant="standard" text={crop.badge} position="top-left" />}
                {/* Image container */}
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={crop.image}
                        alt={crop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cambridge-blue-900/80 via-cambridge-blue-800/40
                        to-transparent"></div>
                    {/* Info badges */}
                    <div className="absolute bottom-0 left-0 w-full p-4 text-white flex justify-between items-center">
                        <Badge variant="location" text={crop.location} />
                        <Badge variant="rating" value={crop.rating} />
                    </div>
                </div>
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-cambridge-blue-800 group-hover:text-golden-brown-600
                            transition-colors duration-300">
                            {crop.title}
                        </h3>
                        <Badge variant="price" text={crop.price} />
                    </div>
                    <Badge variant="farm" text={crop.farmType} />
                    {/* Description */}
                    {crop.description && (
                        <p className="text-sm text-cambridge-blue-700/80 mb-4 line-clamp-2">
                            {crop.description}
                        </p>
                    )}
                    {/* Action button */}
                    <div className="mt-auto pt-4 border-t border-cambridge-blue-100">
                        <CropCardButton
                            text="View Details"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default memo(CropCard);