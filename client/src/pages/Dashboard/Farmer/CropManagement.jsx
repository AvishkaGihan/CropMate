import React, { useState, useEffect } from 'react';
import {
    Package,
    Plus,
    Search,
    Eye,
    Edit,
    Trash,
    Calendar,
    Tag,
    RefreshCw,
    CircleHelp,
    Star
} from 'lucide-react';
import { DataTable, StatusBadge } from '../../../components/Dashboard/DataTable';
import DetailModal from '../../../components/Shared/DetailModal';
import { cropTypes } from '../../../data/Crops/Crops';
import ViewCropModal from './Modals/ViewCropModal';
import CropFormModal from './Modals/CropFormModal';
import DeleteConfirmationModal from './Modals/DeleteConfirmationModal';

const CropManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'add', 'edit'
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cropToDelete, setCropToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [filters, setFilters] = useState({
        category: '',
        isOrganic: ''
    });

    // Form state for add/edit
    const [cropForm, setCropForm] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        harvestDate: '',
        isOrganic: false,
        images: []
    });

    // Sample data for crops (will be replaced with API calls)
    const cropsData = [
        {
            _id: '1',
            name: 'Basmati Rice',
            description: 'Premium quality basmati rice with excellent aroma',
            price: 60,
            quantity: 500,
            category: 'Rice',
            images: ['https://example.com/rice1.jpg'],
            harvestDate: '2023-02-15',
            isOrganic: true,
            rating: 4.5,
            numReviews: 12,
            farmer: '123456', // farmer ID reference
            createdAt: '2023-01-15T12:00:00Z',
            updatedAt: '2023-01-20T14:30:00Z'
        },
        {
            _id: '2',
            name: 'Whole Wheat',
            description: 'High-quality wheat for various culinary uses',
            price: 45,
            quantity: 750,
            category: 'Wheat',
            images: ['https://example.com/wheat1.jpg'],
            harvestDate: '2023-02-01',
            isOrganic: false,
            rating: 4.2,
            numReviews: 8,
            farmer: '123456',
            createdAt: '2023-01-10T09:00:00Z',
            updatedAt: '2023-01-10T09:00:00Z'
        },
        {
            _id: '3',
            name: 'Sweet Corn',
            description: 'Fresh and sweet corn, perfect for various dishes',
            price: 35,
            quantity: 50,
            category: 'Corn',
            images: ['https://example.com/corn1.jpg'],
            harvestDate: '2023-02-20',
            isOrganic: true,
            rating: 4.7,
            numReviews: 15,
            farmer: '123456',
            createdAt: '2023-01-05T16:00:00Z',
            updatedAt: '2023-01-18T11:00:00Z'
        },
        {
            _id: '4',
            name: 'Organic Tomatoes',
            description: 'Freshly harvested organic tomatoes',
            price: 80,
            quantity: 0,
            category: 'Tomatoes',
            images: ['https://example.com/tomatoes1.jpg'],
            harvestDate: '2023-01-30',
            isOrganic: true,
            rating: 4.9,
            numReviews: 22,
            farmer: '123456',
            createdAt: '2023-01-02T10:00:00Z',
            updatedAt: '2023-01-25T09:30:00Z'
        }
    ];

    // Reset form when modal mode changes
    useEffect(() => {
        if (modalMode === 'add') {
            setCropForm({
                name: '',
                description: '',
                price: '',
                quantity: '',
                category: '',
                harvestDate: '',
                isOrganic: false,
                images: []
            });
        } else if (modalMode === 'edit' && selectedCrop) {
            // Format date for input
            const dateObj = new Date(selectedCrop.harvestDate);
            const formattedDate = dateObj.toISOString().split('T')[0];

            setCropForm({
                name: selectedCrop.name,
                description: selectedCrop.description,
                price: selectedCrop.price,
                quantity: selectedCrop.quantity,
                category: selectedCrop.category,
                harvestDate: formattedDate,
                isOrganic: selectedCrop.isOrganic,
                images: selectedCrop.images || []
            });
        }
    }, [modalMode, selectedCrop]);

    // Function to determine status based on quantity
    const determineStatus = (quantity) => {
        if (quantity <= 0) return 'out_of_stock';
        if (quantity < 100) return 'low_stock';
        return 'active';
    };

    // Filter and search functions
    const filteredCrops = cropsData.filter(crop => {
        // Apply search filter
        if (
            searchQuery &&
            !crop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !crop.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }

        // Apply category filter
        if (filters.category && crop.category !== filters.category) {
            return false;
        }

        // Apply status filter based on quantity
        if (filters.status) {
            const cropStatus = determineStatus(crop.quantity);
            if (cropStatus !== filters.status) return false;
        }

        // Apply organic filter
        if (
            filters.isOrganic !== '' &&
            ((filters.isOrganic === 'yes' && !crop.isOrganic) ||
                (filters.isOrganic === 'no' && crop.isOrganic))
        ) {
            return false;
        }

        return true;
    });

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCropForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user changes it
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!cropForm.name.trim()) errors.name = 'Name is required';
        if (!cropForm.description.trim()) errors.description = 'Description is required';
        if (!cropForm.price || isNaN(cropForm.price) || cropForm.price <= 0) {
            errors.price = 'Valid price is required';
        }
        if (!cropForm.quantity || isNaN(cropForm.quantity) || cropForm.quantity < 0) {
            errors.quantity = 'Valid quantity is required';
        }
        if (!cropForm.category) errors.category = 'Category is required';
        if (!cropForm.harvestDate) errors.harvestDate = 'Harvest date is required';

        return errors;
    };

    const handleAddCrop = () => {
        setSelectedCrop(null);
        setModalMode('add');
        setIsModalOpen(true);
    };

    const handleEditCrop = (crop) => {
        setSelectedCrop(crop);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDeletePrompt = (crop) => {
        setCropToDelete(crop);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log("Deleting crop:", cropToDelete._id);
        // Would call API to delete crop
        // api.delete(`/crops/${cropToDelete._id}`)
        setIsDeleteModalOpen(false);
        setCropToDelete(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormErrors({});
        setTimeout(() => {
            setSelectedCrop(null);
            setModalMode('view');
        }, 300);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            status: '',
            isOrganic: ''
        });
        setSearchQuery('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        // Prepare data for API
        const cropData = {
            ...cropForm,
            price: Number(cropForm.price),
            quantity: Number(cropForm.quantity)
        };

        if (modalMode === 'add') {
            console.log("Creating new crop:", cropData);
            // API call to create crop
            // api.post('/crops', cropData)
            //   .then(response => {
            //     // Handle success
            //     handleCloseModal();
            //   })
            //   .catch(error => {
            //     console.error('Error creating crop:', error);
            //   })
            //   .finally(() => {
            //     setIsSubmitting(false);
            //   });
        } else if (modalMode === 'edit') {
            console.log("Updating crop:", selectedCrop._id, cropData);
            // API call to update crop
            // api.put(`/crops/${selectedCrop._id}`, cropData)
            //   .then(response => {
            //     // Handle success
            //     handleCloseModal();
            //   })
            //   .catch(error => {
            //     console.error('Error updating crop:', error);
            //   })
            //   .finally(() => {
            //     setIsSubmitting(false);
            //   });
        }

        // Mock success for now
        setTimeout(() => {
            handleCloseModal();
            setIsSubmitting(false);
        }, 1000);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // In a real app, you'd upload these to a server/cloud storage
        // For now, create object URLs for preview
        const newImages = files.map(file => URL.createObjectURL(file));

        setCropForm(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const removeImage = (indexToRemove) => {
        setCropForm(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Format date helper function
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Format date with time for detailed view
    const formatDateTime = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Format price helper function
    const formatPrice = (price) => {
        return `₹${price}`;
    };

    const getStatusLabel = (quantity) => {
        const status = determineStatus(quantity);
        switch (status) {
            case 'active':
                return 'In Stock';
            case 'low_stock':
                return 'Low Stock';
            case 'out_of_stock':
                return 'Out of Stock';
            default:
                return status;
        }
    };

    // Define table columns
    const cropColumns = [
        {
            field: 'name',
            header: 'Crop Name',
            sortable: true,
            render: row => (
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                        {row.images && row.images.length > 0 ? (
                            <img src={row.images[0]} alt={row.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <Package size={16} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.category}</p>
                    </div>
                </div>
            )
        },
        {
            field: 'price',
            header: 'Price',
            sortable: true,
            render: row => (
                <div className="font-medium text-gray-900">{formatPrice(row.price)}/kg</div>
            )
        },
        {
            field: 'quantity',
            header: 'Available',
            sortable: true,
            render: row => (
                <div className="text-gray-900">{row.quantity} kg</div>
            )
        },
        {
            field: 'isOrganic',
            header: 'Organic',
            render: row => (
                <div>
                    {row.isOrganic ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Organic
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            Conventional
                        </span>
                    )}
                </div>
            )
        },
        {
            field: 'harvestDate',
            header: 'Harvest Date',
            sortable: true,
            render: row => (
                <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(row.harvestDate)}</span>
                </div>
            )
        },
        {
            field: 'status',
            header: 'Status',
            render: row => (
                <StatusBadge
                    status={determineStatus(row.quantity) === 'active' ? 'success' : determineStatus(row.quantity) === 'low_stock' ? 'warning' : 'danger'}
                    label={getStatusLabel(row.quantity)}
                />
            )
        }
    ];

    // Define row actions
    const rowActions = [
        {
            label: 'Edit',
            icon: <Edit size={16} />,
            onClick: handleEditCrop
        },
        {
            label: 'Delete',
            icon: <Trash size={16} />,
            onClick: handleDeletePrompt,
            className: 'text-red-600 hover:text-red-800'
        }
    ];

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

    return (
        <div className="min-h-screen space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
                    <p className="text-gray-600 mt-1">Manage your crop listings and inventory</p>
                </div>
                <button
                    onClick={handleAddCrop}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Plus size={16} className="mr-2" />
                    Add New Crop
                </button>
            </div>

            {/* Filters and search */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search crops by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Category filter */}
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Categories</option>
                            {cropTypes.map(type => (
                                <option key={type.id} value={type.label}>
                                    {type.label}
                                </option>
                            ))}
                        </select>

                        {/* Status filter */}
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>

                        {/* Organic filter */}
                        <select
                            value={filters.isOrganic}
                            onChange={(e) => handleFilterChange('isOrganic', e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Types</option>
                            <option value="yes">Organic Only</option>
                            <option value="no">Conventional Only</option>
                        </select>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Clear
                    </button>
                </div>
            </div>

            {/* Crops table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <DataTable
                    columns={cropColumns}
                    data={filteredCrops}
                    rowActions={rowActions}
                    emptyMessage="No crops found matching your criteria"
                    isLoading={false}
                    itemsPerPage={10}
                />
            </div>

            {/* Add/Edit Crop Modal */}
            <CropFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'add' ? 'Add New Crop' : 'Edit Crop'}
                cropForm={cropForm}
                handleFormChange={handleFormChange}
                handleSubmit={handleSubmit}
                formErrors={formErrors}
                isSubmitting={isSubmitting}
                cropTypes={cropTypes}
                modalMode={modalMode}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                itemName={cropToDelete?.name}
            />
        </div>
    );
};

export default CropManagement;