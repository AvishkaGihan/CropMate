import React from 'react';
import { Package, Calendar, Star } from 'lucide-react';
import { ViewModal } from '../../../../components/Shared/DashboardModals';
import { StatusBadge } from '../../../../components/Dashboard/DataTable';

const ViewCropModal = ({
    isOpen,
    onClose,
    crop,
    formatPrice,
    formatDate,
    formatDateTime,
    determineStatus,
    getStatusLabel
}) => {
    // Calculate average rating stars
    const renderRatingStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < fullStars ? "text-amber-400" : (i === fullStars && hasHalfStar) ? "text-amber-400" : "text-gray-300"}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (!crop) return null;

    return (
        <ViewModal
            isOpen={isOpen}
            onClose={onClose}
            title="Crop Details"
        >
            {/* Crop header with name and price */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{crop.name}</h2>
                    <div className="flex items-center mt-1">
                        <span className={`mr-2 px-2 py-0.5 rounded text-xs font-medium ${crop.isOrganic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {crop.isOrganic ? 'Organic' : 'Conventional'}
                        </span>
                        <span className="text-gray-500">{crop.category}</span>
                    </div>
                </div>
                <div className="mt-2 md:mt-0">
                    <div className="text-2xl font-bold text-green-600">{formatPrice(crop.price)}/kg</div>
                </div>
            </div>

            {/* Crop images */}
            <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Images</h4>
                <div className="flex flex-wrap gap-2">
                    {crop.images && crop.images.length > 0 ? (
                        crop.images.map((img, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden">
                                <img src={img} alt={`${crop.name} ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center p-4 bg-gray-50 rounded text-gray-500">
                            No images available
                        </div>
                    )}
                </div>
            </div>

            {/* Crop details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Package size={16} className="mr-2 text-gray-500" />
                        <h4 className="text-sm font-medium text-gray-500">Available Quantity</h4>
                    </div>
                    <p className="text-gray-900 font-medium">{crop.quantity} kg</p>
                    <div className="mt-1">
                        <StatusBadge
                            status={determineStatus(crop.quantity) === 'active' ? 'success' : determineStatus(crop.quantity) === 'low_stock' ? 'warning' : 'danger'}
                            label={getStatusLabel(crop.quantity)}
                        />
                    </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Calendar size={16} className="mr-2 text-gray-500" />
                        <h4 className="text-sm font-medium text-gray-500">Harvest Date</h4>
                    </div>
                    <p className="text-gray-900">{formatDate(crop.harvestDate)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Star size={16} className="mr-2 text-gray-500" />
                        <h4 className="text-sm font-medium text-gray-500">Ratings</h4>
                    </div>
                    <div className="flex items-center">
                        {renderRatingStars(crop.rating)}
                        <p className="text-gray-900 ml-2">{crop.rating} ({crop.numReviews} reviews)</p>
                    </div>
                </div>
            </div>

            {/* Crop description */}
            <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Description</h4>
                <p className="text-gray-600">{crop.description}</p>
            </div>

            {/* Additional Info - createdAt/updatedAt from schema */}
            <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Additional Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Crop Added On</p>
                        <p className="text-gray-900">{formatDateTime(crop.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-gray-900">{formatDateTime(crop.updatedAt)}</p>
                    </div>
                </div>
            </div>
        </ViewModal>
    );
};

export default ViewCropModal;