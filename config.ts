
// Configuration for your application

export const config = {
  /**
   * ------------------ IMPORTANT ------------------
   * PASTE YOUR UPI PAYMENT LINK HERE TO ENABLE REAL PAYMENTS
   * ---------------------------------------------
   * To receive payments for the 'CV Optimization' service, generate a UPI payment link 
   * from your provider (e.g., Razorpay, PhonePe, GPay Business) for the amount of ₹2000.
   * 
   * A payment link typically looks like this:
   * 'upi://pay?pa=your-virtual-id@bank&pn=Your%20Business%20Name&am=2000.00&cu=INR&tn=CV%20Optimization%20Service'
   * 
   * Once you have your link, replace the placeholder below with it.
   * If you leave the placeholder, the QR code on the payment page will not work.
   */
  upiPaymentLink: 'PASTE_YOUR_UPI_LINK_HERE',
};
