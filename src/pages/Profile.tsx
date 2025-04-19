
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Loader2, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormDescription
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openPreferenceDialog, setOpenPreferenceDialog] = useState(false);
  const [newPreference, setNewPreference] = useState("");
  
  // Mock profile data - in a real app, this would come from a backend
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '+1 (555) 123-4567',
    address: '123 Travel Street, Wanderlust City, 10001',
    joinDate: 'January 2023',
    preferences: ['Beach', 'Mountains', 'Cultural', 'Adventure'],
    passport: 'Valid until 2028'
  });

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfileData(prev => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email
      }));
    }
    setLoading(false);
  }, []);

  const handleSaveChanges = () => {
    // In a real app, this would save to a backend
    setIsEditing(false);
    
    // Update the localStorage user
    if (user) {
      const updatedUser = { ...user, name: profileData.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    toast({
      title: "Email notifications updated",
      description: `Email notifications turned ${!emailNotifications ? 'on' : 'off'}.`,
    });
  };

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // In a real app, this would verify old password and update with new password
    setOpenPasswordDialog(false);
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete the user's account from the backend
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted.",
    });
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== "") {
      setProfileData(prev => ({
        ...prev,
        preferences: [...prev.preferences, newPreference.trim()]
      }));
      setNewPreference("");
      setOpenPreferenceDialog(false);
      toast({
        title: "Preference added",
        description: `${newPreference.trim()} has been added to your preferences.`,
      });
    }
  };

  const handleRemovePreference = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      preferences: prev.preferences.filter((_, i) => i !== index)
    }));
    toast({
      title: "Preference removed",
      description: "The preference has been removed from your profile.",
    });
  };

  // Password change form schema
  const passwordFormSchema = z.object({
    oldPassword: z.string().min(6, {
      message: "Old password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = (values: z.infer<typeof passwordFormSchema>) => {
    handleChangePassword(values.oldPassword, values.newPassword);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
        <Link to="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-yatri-blue dark:hover:text-yatri-blue-light transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-yatri-blue"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center pb-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3">
                    <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  </div>
                  {isEditing ? (
                    <input 
                      className="text-xl font-semibold text-center border rounded p-1 mt-2 mb-1 w-full"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  ) : (
                    <h3 className="text-xl font-semibold mt-2 mb-1">{profileData.name}</h3>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">Traveler since {profileData.joinDate}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      {isEditing ? (
                        <input 
                          className="text-sm font-medium border rounded p-1 w-full"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      {isEditing ? (
                        <input 
                          className="text-sm font-medium border rounded p-1 w-full"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      {isEditing ? (
                        <input 
                          className="text-sm font-medium border rounded p-1 w-full"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <Button 
                    className="w-full mt-6"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Travel Preferences</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setOpenPreferenceDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.map((pref, index) => (
                      <div key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm flex items-center gap-1">
                        {pref}
                        <button 
                          className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          onClick={() => handleRemovePreference(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Passport</p>
                        <p className="text-sm font-medium">{profileData.passport}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about your trips and offers</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={emailNotifications} onCheckedChange={handleToggleEmailNotifications} />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Password</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Change your password</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setOpenPasswordDialog(true)}
                      >
                        Change
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and data</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your credentials.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {passwordForm.formState.errors.confirmPassword?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update Password</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Preference Dialog */}
      <Dialog open={openPreferenceDialog} onOpenChange={setOpenPreferenceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Travel Preference</DialogTitle>
            <DialogDescription>
              Add a new travel preference to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="preference" className="block text-sm font-medium mb-1">
                Preference
              </label>
              <Input
                id="preference"
                placeholder="e.g. Hiking, Food Tours, Photography"
                value={newPreference}
                onChange={(e) => setNewPreference(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddPreference}>Add Preference</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
