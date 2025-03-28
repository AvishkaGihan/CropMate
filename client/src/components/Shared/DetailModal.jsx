import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

/**
 * A universal modal component for displaying detailed information
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 * @param {string} size - Modal size (sm, md, lg, xl)
 * @param {boolean} showCloseButton - Whether to show close button in header
 */
const DetailModal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}) => {
    // Define width classes based on size prop
    const sizeClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        full: 'sm:max-w-full sm:w-full'
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
                </Transition.Child>

                {/* Modal panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all`}>
                                {/* Modal header */}
                                {title && (
                                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                                        <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                                            {title}
                                        </Dialog.Title>
                                        {showCloseButton && (
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                                onClick={onClose}
                                            >
                                                <X size={20} aria-hidden="true" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Modal content */}
                                <div className="px-6 py-4">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DetailModal;