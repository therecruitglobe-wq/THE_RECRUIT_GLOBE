
import React from 'react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    quote: "The Recruit Globe understood our unique needs and delivered exceptional candidates in record time. They are a true partner in our growth.",
    name: "Jane Doe",
    title: "CEO",
    company: "Innovatech Solutions"
  },
  {
    quote: "As a candidate, the process was seamless and supportive. They found me a role that perfectly matched my skills and ambitions. I couldn't be happier.",
    name: "John Smith",
    title: "Senior Software Engineer",
    company: "DataDriven Inc."
  },
  {
    quote: "Their professionalism and deep market insights are unmatched. The Recruit Globe is our go-to agency for critical hires.",
    name: "Emily White",
    title: "Head of HR",
    company: "ConnectSphere"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col h-full">
        <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
        <div>
            <p className="font-bold text-brand-dark">{testimonial.name}</p>
            <p className="text-sm text-brand-gold">{testimonial.title}, {testimonial.company}</p>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold">What Our Partners Say</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            We are proud to have built strong relationships with leaders and innovators.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
