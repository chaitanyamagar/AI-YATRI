
import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTripFormContext } from './TripFormContext';

const VendorNotification = () => {
  const { vendorNotification } = useTripFormContext();
  
  if (vendorNotification.status === 'idle') {
    return null;
  }
  
  let icon;
  let variant: 'default' | 'destructive' = 'default';
  
  switch (vendorNotification.status) {
    case 'pending':
      icon = <Clock className="h-4 w-4" />;
      break;
    case 'success':
      icon = <CheckCircle className="h-4 w-4" />;
      break;
    case 'error':
      icon = <AlertCircle className="h-4 w-4" />;
      variant = 'destructive';
      break;
    default:
      return null;
  }
  
  return (
    <Alert variant={variant} className="mb-4">
      {icon}
      <AlertTitle>Vendor Notifications</AlertTitle>
      <AlertDescription>
        {vendorNotification.message}
        
        {vendorNotification.notifiedVendors.length > 0 && (
          <div className="mt-2">
            <details>
              <summary className="cursor-pointer text-sm font-medium">
                Notified vendors ({vendorNotification.notifiedVendors.length})
              </summary>
              <ul className="list-disc list-inside mt-2 text-sm">
                {vendorNotification.notifiedVendors.map((vendor, index) => (
                  <li key={index}>{vendor}</li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default VendorNotification;
