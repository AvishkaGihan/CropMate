import React, { useState } from 'react';

import HeroSection from './HeroSection';
import ContactCards from './ContactCards';
import ContactForm from './ContactForm';




const ContactUs = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Contact Cards Section */}
            <ContactCards />

            {/* Contact Form Section */}
            <ContactForm />
        </>
    );
};

export default ContactUs;