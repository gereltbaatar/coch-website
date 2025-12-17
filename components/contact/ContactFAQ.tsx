"use client";

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What can this coaching program do for me?",
        answer: "This coaching program helps clarify your goals, overcome obstacles, and creates actionable plans for personal and professional growth. We work together to unlock your potential."
    },
    {
        question: "How do I integrate it into my daily routine?",
        answer: "We focus on building sustainable habits. Strategies are tailored to fit your lifestyle, ensuring that changes are manageable and effective without overwhelming you."
    },
    {
        question: "Can the coaching be customized?",
        answer: "Absolutely. Every session is tailored to your specific needs, challenges, and aspirations. We adapt our approach as you progress and evolve."
    },
    {
        question: "How do I track my progress?",
        answer: "We set clear, measurable milestones at the beginning. Regular check-ins and reviews ensure we're on track and allow us to celebrate your wins along the way."
    },
    {
        question: "What support is available between sessions?",
        answer: "You'll have access to resources, email support, and specific tools to keep you motivated and accountable between our scheduled meetings."
    }
];

export const ContactFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-secondary py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-light text-[#2a2a2a] mb-6">Have Questions?</h2>
                    <p className="text-lg text-[#4a4a4a] font-light max-w-2xl mx-auto leading-relaxed">
                        Check out the frequently asked questions or reach out directly. I'm here to help you on your journey.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'bg-[#F3F4F6]' : 'bg-transparent'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 sm:p-8 text-left group"
                            >
                                <span className={`text-xl sm:text-2xl font-light pr-8 transition-colors ${openIndex === index ? 'text-black' : 'text-[#2a2a2a]'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className="shrink-0 ml-4">
                                    {openIndex === index ? (
                                        <X className="w-6 h-6 sm:w-8 sm:h-8 text-black transition-transform duration-300 rotate-90" />
                                    ) : (
                                        <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-[#2a2a2a] transition-transform duration-300 group-hover:rotate-90" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-6 sm:px-8 pb-8 pt-0">
                                        <p className="text-[#4a4a4a] text-lg font-light leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
