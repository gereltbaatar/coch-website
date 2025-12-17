import { ContactHero, ContactForm, ContactInfo, ContactFAQ } from "@/components/contact";
import { Footer } from "@/components/navigation";

const ContactPage = () => {
    return (
        <main className="bg-secondary min-h-screen">
            <ContactHero />
            <ContactForm />
            <ContactInfo />
            <ContactFAQ />
            <Footer />
        </main>
    );
};

export default ContactPage;