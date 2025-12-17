import Image from 'next/image';

export const ContactForm = () => {
    return (
        <section className="bg-secondary w-full py-8 sm:py-12">
            <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-sm">
                    {/* Left Side - Image */}
                    <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]">
                        <Image
                            src="/onetoone.png"
                            alt="Contact Us"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 bg-secondary">
                        <div className="mb-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-black tracking-wide">
                                Send a <span className="text-main">Message</span>
                            </h2>
                            <p className="text-base sm:text-lg font-light text-[#4a4a4a] mt-3">
                                Fill out the form below and I&apos;ll get back to you as soon as possible.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label htmlFor="firstName" className="sr-only">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-500 transition-colors duration-300"
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-500 transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-500 transition-colors duration-300"
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="phone" className="sr-only">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number (Optional)"
                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-500 transition-colors duration-300"
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-500 transition-colors duration-300 cursor-pointer"
                                >
                                    <option value="">Select a Topic</option>
                                    <option value="coaching">Personal Coaching</option>
                                    <option value="group">Group Sessions</option>
                                    <option value="speaking">Speaking Engagement</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div className="relative">
                                <label htmlFor="message" className="sr-only">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Your Message"
                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-main outline-none text-lg font-light text-gray-800 placeholder-gray-500 resize-none transition-colors duration-300"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-main hover:bg-main/90 text-secondary text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
