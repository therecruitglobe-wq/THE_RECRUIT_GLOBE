
import React, { useState } from 'react';
// FIX: The `qrcode.react` library exports named components like `QRCodeSVG`, not a default export for the component.
import { QRCodeSVG } from 'qrcode.react';
import { config } from '../config';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import UpiIcon from './icons/UpiIcon';
import GPayIcon from './icons/GPayIcon';
import PaytmIcon from './icons/PaytmIcon';

interface Service {
    name: string;
    price: number;
    currency: 'USD' | 'INR';
}

interface PaymentPageProps {
  service: Service;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ service, onBack, onPaymentSuccess }) => {
    const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvc: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>(service.currency === 'INR' ? 'upi' : 'card');
    const isUpiConfigured = config.upiPaymentLink && config.upiPaymentLink !== 'PASTE_YOUR_UPI_LINK_HERE';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!cardDetails.name.trim()) newErrors.name = 'Cardholder name is required.';
        if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) newErrors.number = 'A valid 16-digit card number is required.';
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) newErrors.expiry = 'Use MM/YY format.';
        if (!/^\d{3,4}$/.test(cardDetails.cvc)) newErrors.cvc = 'A valid CVC is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleCardSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setPaymentStatus('processing');
        // Simulate API call for card payment
        setTimeout(() => {
            setPaymentStatus('success');
        }, 2500);
    };

    const handleUpiConfirmation = () => {
        // Since we can't verify the payment on the frontend, we assume the user has paid
        // and move to the success screen to give them the next steps.
        setPaymentStatus('success');
    };

    const currencySymbol = service.currency === 'INR' ? '₹' : '$';
    const priceLocale = service.currency === 'INR' ? 'en-IN' : 'en-US';

    const renderCardForm = () => (
        <>
        <h2 className="font-serif text-3xl font-bold mb-6 text-center">Pay with Card</h2>
        <form onSubmit={handleCardSubmit} noValidate className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-1">Cardholder Name</label>
                <input type="text" id="name" name="name" onChange={handleInputChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="number" className="block text-sm font-bold text-brand-dark mb-1">Card Number</label>
                <input type="text" id="number" name="number" placeholder="0000 0000 0000 0000" onChange={handleInputChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.number ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="expiry" className="block text-sm font-bold text-brand-dark mb-1">Expiry Date</label>
                    <input type="text" id="expiry" name="expiry" placeholder="MM/YY" onChange={handleInputChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div className="flex-1">
                    <label htmlFor="cvc" className="block text-sm font-bold text-brand-dark mb-1">CVC</label>
                    <input type="text" id="cvc" name="cvc" placeholder="123" onChange={handleInputChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                    {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>
            </div>
            <button type="submit" disabled={paymentStatus === 'processing'} className="w-full mt-4 bg-brand-gold text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:scale-100">
                {paymentStatus === 'processing' ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <LockClosedIcon className="w-5 h-5" />
                        Pay {currencySymbol}{service.price.toLocaleString(priceLocale)}
                    </>
                )}
            </button>
        </form>
        </>
    );

     const renderUpiQr = () => (
        <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-4">Pay with UPI / QR Code</h3>
             {isUpiConfigured ? (
                <>
                    <div className="flex justify-center my-4 p-4 bg-white border rounded-lg">
                        {/* FIX: Use the QRCodeSVG component which is the correct component to render an SVG QR code. */}
                        <QRCodeSVG value={config.upiPaymentLink} size={192} level="M" />
                    </div>
                    <p className="text-gray-600 mb-4">Scan the code above with any UPI app.</p>
                    <div className="flex justify-center items-center gap-x-6 gap-y-2 my-6 flex-wrap">
                        <GPayIcon className="h-8" />
                        <PaytmIcon className="h-8" />
                        <UpiIcon className="h-8" />
                    </div>
                    <a
                        href={config.upiPaymentLink}
                        className="w-full mt-2 bg-brand-dark text-white font-bold py-3 px-12 rounded-full hover:bg-brand-gold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                       Pay with UPI App
                    </a>
                    <button
                        onClick={handleUpiConfirmation}
                        className="w-full mt-4 text-brand-dark font-semibold hover:text-brand-gold transition"
                    >
                        I Have Completed The Payment
                    </button>
                </>
            ) : (
                <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md text-left">
                    <h4 className="font-bold">Payment Gateway Not Configured</h4>
                    <p className="text-sm">To enable live payments, please add your UPI payment link to the `config.ts` file in the project.</p>
                </div>
            )}
        </div>
    );

    if (paymentStatus === 'success') {
        return (
            <section className="py-20 bg-brand-light min-h-[70vh] flex items-center animate-fade-in">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-md mx-auto bg-white p-12 rounded-lg shadow-xl">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="font-serif text-3xl font-bold text-brand-gold mb-4">Thank You!</h2>
                        <p className="text-lg text-gray-700 mb-2">
                            Your payment for our <strong className="text-brand-dark">{service.name}</strong> service is being processed.
                        </p>
                         <p className="text-gray-600 mb-8">
                            Our team will verify the transaction and contact you at your provided email address within 24 hours to begin the process.
                        </p>
                        <button
                            onClick={onPaymentSuccess}
                            className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 inline-flex items-center gap-2"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-brand-light min-h-screen animate-fade-in">
            <div className="container mx-auto px-6">
                 <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
                    aria-label="Go back to service details"
                    >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Service Details
                </button>
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-brand-gold">
                        {service.currency === 'INR' ? (
                            <>
                                <div className="flex border-b mb-6">
                                    <button 
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`flex-1 py-2 font-semibold text-center transition-colors ${paymentMethod === 'upi' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-500 hover:text-brand-dark'}`}
                                    >
                                        UPI / QR Code
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex-1 py-2 font-semibold text-center transition-colors ${paymentMethod === 'card' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-500 hover:text-brand-dark'}`}
                                    >
                                        Credit / Debit Card
                                    </button>
                                </div>
                                {paymentMethod === 'upi' ? renderUpiQr() : renderCardForm()}
                            </>
                        ) : (
                            renderCardForm()
                        )}
                    </div>
                    <div className="bg-brand-dark text-white p-8 rounded-lg shadow-xl">
                        <h3 className="font-serif text-2xl font-bold mb-4 text-brand-gold">Order Summary</h3>
                        <div className="border-t border-b border-white/20 py-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">{service.name}</p>
                                <p className="font-semibold">{currencySymbol}{service.price.toLocaleString(priceLocale)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg mt-4">
                            <p>Total</p>
                            <p>{currencySymbol}{service.price.toLocaleString(priceLocale)}</p>
                        </div>
                        <div className="mt-8 text-center text-gray-400">
                             <div className="flex justify-center items-center gap-x-6 gap-y-2 text-white flex-wrap">
                                <UpiIcon className="h-8" />
                                <CreditCardIcon className="w-10 h-10" />
                                <PaytmIcon className="h-4" />
                                <GPayIcon className="h-6" />
                            </div>
                            <p className="text-sm mt-4">Your payment information is handled securely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentPage;
