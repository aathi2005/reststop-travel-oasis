
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bell, MapPin, Star, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Temporary closure",
      message: "RS Puram Public Restroom will be closed for maintenance tomorrow",
      time: "10 minutes ago",
      icon: AlertCircle,
      iconColor: "text-red-500"
    },
    {
      id: 2,
      type: "location",
      title: "New restroom nearby",
      message: "A new premium restroom has been added at Brookefields Mall",
      time: "2 hours ago",
      icon: MapPin,
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      type: "review",
      title: "Review reminder",
      message: "How was your experience at Westin Hotel restroom?",
      time: "1 day ago",
      icon: Star,
      iconColor: "text-yellow-500"
    },
    {
      id: 4,
      type: "alert",
      title: "Cleanliness alert",
      message: "VOC Park Public Restroom reported as needing cleaning",
      time: "2 days ago",
      icon: AlertCircle,
      iconColor: "text-orange-500"
    }
  ];

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {notifications.length > 0 ? (
        <Card className="divide-y">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${notification.iconColor}`}>
                  <notification.icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      ) : (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg">No notifications yet</h3>
          <p className="text-muted-foreground">When you receive notifications, they'll appear here</p>
        </div>
      )}
      
      <div className="mt-6">
        <Button variant="outline" className="w-full">Mark all as read</Button>
      </div>
    </div>
  );
};

export default Notifications;
