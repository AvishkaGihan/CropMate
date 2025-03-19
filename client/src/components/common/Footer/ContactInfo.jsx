import React from 'react';
import { contactInfo } from '../../../constants/contactInfo';

const ContactInfo = () => {
    return (
        <div className="space-y-2">
            {contactInfo.map((item) => (
                <div key={item.id} className="flex items-start">
                    <span className="text-green-600 mr-2">{item.icon}</span>
                    <span className="text-gray-600 text-sm">{item.value}</span>
                </div>
            ))}
        </div>
    );
};

export default ContactInfo;