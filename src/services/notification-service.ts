
import { HotelType, TransportType, CabType, FoodOption } from '../components/booking-details/TripFormContext';

interface VendorDetails {
  name: string;
  email: string;
  phone?: string;
}

// Map vendor IDs to their contact details
// In a real app, this would come from a database
const vendorDirectory: Record<string, VendorDetails> = {
  // Hotels
  'hotel-1': { name: 'Taj Palace', email: 'bookings@tajhotels.com', phone: '+91-9876543210' },
  'hotel-2': { name: 'Oberoi Hotels', email: 'reservations@oberoi.com', phone: '+91-9876543211' },
  'hotel-3': { name: 'ITC Hotels', email: 'bookings@itchotels.com', phone: '+91-9876543212' },
  
  // Transport providers
  'flight-1': { name: 'Air India', email: 'bookings@airindia.com', phone: '+91-9876543213' },
  'train-1': { name: 'IRCTC', email: 'support@irctc.co.in', phone: '+91-9876543214' },
  'bus-1': { name: 'RedBus', email: 'partners@redbus.in', phone: '+91-9876543215' },
  
  // Cab services
  'cab-1': { name: 'Ola Cabs', email: 'partners@olacabs.com', phone: '+91-9876543216' },
  'cab-2': { name: 'Uber', email: 'partners@uber.com', phone: '+91-9876543217' },
  
  // Restaurants
  'rest-1': { name: 'Paradise Biryani', email: 'orders@paradisebiryani.com', phone: '+91-9876543218' },
  'rest-2': { name: 'Mainland China', email: 'bookings@mainlandchina.com', phone: '+91-9876543219' },
};

// Get vendor details from ID or return default fallback
export const getVendorDetails = (vendorId: string): VendorDetails => {
  return vendorDirectory[vendorId] || {
    name: "Local Vendor",
    email: "support@aiyatri.com"
  };
};

// Format email subject for vendor notification
const formatEmailSubject = (bookingId: string): string => {
  return `New Booking from AI Yatri – [Booking ID: #${bookingId}]`;
};

// Format email body for vendor notification
const formatEmailBody = (
  vendorName: string,
  userName: string,
  startDate: string,
  endDate: string,
  travelers: number,
  amount: number,
  userContact: string,
  bookingId: string
): string => {
  return `
Hello ${vendorName},  

A new booking has been placed for your service via AI Yatri.  

🔹 *Booking Details:*  
- Guest Name: ${userName}  
- Check-in: ${startDate} | Check-out: ${endDate}  
- Number of Travelers: ${travelers}  
- Total Cost: ₹${amount}  
- Contact: ${userContact}  

Please confirm the booking by clicking here: https://aiyatri.com/vendor/confirm/${bookingId}  

Thanks,  
AI Yatri Team
  `;
};

// Send notification to a single vendor (in a real app, this would use an email API or SMS gateway)
export const notifyVendor = async (
  vendorId: string,
  bookingDetails: {
    userName: string;
    startDate: string;
    endDate: string;
    travelers: number;
    amount: number;
    userContact: string;
    bookingId: string;
  }
): Promise<boolean> => {
  try {
    const vendor = getVendorDetails(vendorId);
    
    // In a real application, we would send an actual email here
    // using a service like SendGrid, Mailgun, or AWS SES
    console.log(`Sending notification to ${vendor.name} (${vendor.email})`);
    console.log(`Subject: ${formatEmailSubject(bookingDetails.bookingId)}`);
    console.log(`Body: ${formatEmailBody(
      vendor.name,
      bookingDetails.userName,
      bookingDetails.startDate,
      bookingDetails.endDate,
      bookingDetails.travelers,
      bookingDetails.amount,
      bookingDetails.userContact,
      bookingDetails.bookingId
    )}`);
    
    // Simulate API call to send email
    // In a real app, we would await an actual API call here
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error(`Failed to notify vendor ${vendorId}:`, error);
    return false;
  }
};

// Notify all relevant vendors for a booking
export const notifyAllVendors = async (
  bookingData: {
    hotel?: HotelType | null;
    transport?: TransportType | null;
    cab?: CabType | null; 
    foodOptions?: FoodOption[];
    userName: string;
    startDate: string;
    endDate: string;
    travelers: number;
    totalAmount: number;
    userContact: string;
    bookingId: string;
  }
): Promise<{success: boolean; notifiedVendors: string[]}> => {
  const notifiedVendors: string[] = [];
  let hasError = false;
  
  // Extract booking info
  const { 
    hotel, transport, cab, foodOptions,
    userName, startDate, endDate, travelers, totalAmount, userContact, bookingId
  } = bookingData;
  
  // Common booking details for all vendors
  const commonDetails = {
    userName,
    startDate,
    endDate,
    travelers,
    amount: totalAmount,
    userContact,
    bookingId
  };
  
  // Notify hotel if selected
  if (hotel) {
    const vendorId = hotel.id;
    const success = await notifyVendor(vendorId, {
      ...commonDetails,
      amount: hotel.price // Send just the hotel portion of the price
    });
    
    if (success) {
      notifiedVendors.push(`Hotel: ${getVendorDetails(vendorId).name}`);
    } else {
      hasError = true;
    }
  }
  
  // Notify transport provider if selected
  if (transport) {
    // Use provider as the vendor ID (simplified)
    const vendorId = `${transport.type}-1`; 
    const success = await notifyVendor(vendorId, {
      ...commonDetails,
      amount: transport.price
    });
    
    if (success) {
      notifiedVendors.push(`Transport: ${getVendorDetails(vendorId).name}`);
    } else {
      hasError = true;
    }
  }
  
  // Notify cab service if selected
  if (cab) {
    const vendorId = cab.id;
    const success = await notifyVendor(vendorId, {
      ...commonDetails,
      amount: cab.price
    });
    
    if (success) {
      notifiedVendors.push(`Cab: ${getVendorDetails(vendorId).name}`);
    } else {
      hasError = true;
    }
  }
  
  // Notify restaurants for food options if selected
  if (foodOptions && foodOptions.length > 0) {
    for (const food of foodOptions) {
      // Use restaurant name to derive vendor ID (simplified)
      const vendorId = `rest-${food.id.split('-')[1]}`; 
      const success = await notifyVendor(vendorId, {
        ...commonDetails,
        amount: food.price
      });
      
      if (success) {
        notifiedVendors.push(`Restaurant: ${getVendorDetails(vendorId).name}`);
      } else {
        hasError = true;
      }
    }
  }
  
  return {
    success: !hasError,
    notifiedVendors
  };
};
