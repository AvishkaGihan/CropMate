import { motion } from "framer-motion"
import ContactCard from "../../components/Contact/ContactCard"
import SectionWrapper from "../../components/Shared/SectionWrapper"
import { containerVariants } from "../../util/animations"
import { MapPin, Mail, Phone } from "lucide-react"

const ContactCards = () => {
    return (
        <SectionWrapper className="py-20 bg-cambridge-blue-50/70" withPattern>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid md:grid-cols-3 gap-8">
                    <ContactCard
                        icon={<MapPin size={24} strokeWidth={2} />}
                        title="Office Location"
                        details="87 Innovation Drive, Colombo Tech Park, Colombo, Sri Lanka"
                        link="https://maps.google.com"
                        linkText="View on Map"
                    />
                    <ContactCard
                        icon={<Mail size={24} strokeWidth={2} />}
                        title="Email Us"
                        details="Have a question or want to join as a partner?"
                        link="mailto:info@cropmate.lk"
                        linkText="info@cropmate.lk"
                    />
                    <ContactCard
                        icon={<Phone size={24} strokeWidth={2} />}
                        title="Call Us"
                        details="Mon-Fri from 9am to 5pm"
                        link="tel:+94117553000"
                        linkText="+94 117 553 000"
                    />
                </div>
            </motion.div>
        </SectionWrapper>
    )
}

export default ContactCards