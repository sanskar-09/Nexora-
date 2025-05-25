
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface UserProfileProps {
  userRole: 'patient' | 'doctor' | 'admin';
}

const UserProfile = ({ userRole }: UserProfileProps) => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    medicalHistory: 'Hypertension, Type 2 Diabetes',
    allergies: 'Penicillin, Shellfish',
    insurance: 'BlueCross BlueShield'
  });

  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal and medical information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</Badge>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
            <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
            <CardDescription>{profile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Phone:</span>
              <span className="text-sm font-medium">{profile.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Date of Birth:</span>
              <span className="text-sm font-medium">{profile.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gender:</span>
              <span className="text-sm font-medium capitalize">{profile.gender}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic contact and demographic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select 
                  value={profile.gender} 
                  onValueChange={(value) => setProfile({...profile, gender: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input 
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                disabled={!isEditing}
                placeholder="Name - Phone Number"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Important medical history and health details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea 
              id="medicalHistory"
              value={profile.medicalHistory}
              onChange={(e) => setProfile({...profile, medicalHistory: e.target.value})}
              disabled={!isEditing}
              placeholder="List your medical conditions, surgeries, etc."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea 
              id="allergies"
              value={profile.allergies}
              onChange={(e) => setProfile({...profile, allergies: e.target.value})}
              disabled={!isEditing}
              placeholder="List any known allergies or adverse reactions"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="insurance">Insurance Provider</Label>
            <Input 
              id="insurance"
              value={profile.insurance}
              onChange={(e) => setProfile({...profile, insurance: e.target.value})}
              disabled={!isEditing}
              placeholder="Insurance company and plan"
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Privacy and notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive medication reminders and appointment alerts</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-gray-600">Control how your health data is shared with providers</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
