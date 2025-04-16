
import { Restroom, Review } from "@/types";
import { getCleanlinessTier } from "@/data/restrooms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Toilet, MapPin, Clock, ArrowLeft, Star, Accessibility, 
  Baby, Users, CheckCircle, Clock8, Building, Sparkles
} from "lucide-react";

interface RestroomDetailProps {
  restroom: Restroom;
  onBack: () => void;
}

export function RestroomDetail({ restroom, onBack }: RestroomDetailProps) {
  const cleanlinessTier = getCleanlinessTier(restroom.cleanliness.score);
  const lastUpdated = new Date(restroom.cleanliness.lastUpdated);
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-semibold flex-1">{restroom.name}</h2>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pb-4">
        <div className="bg-white dark:bg-reststop-dark rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-start gap-2">
                <MapPin className="text-reststop-primary mt-1" size={18} />
                <div>
                  <div className="font-medium">{restroom.location.address || 'No address available'}</div>
                  {restroom.location.city && (
                    <div className="text-sm text-muted-foreground">
                      {restroom.location.city}, {restroom.location.state}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {restroom.businessInfo && (
              <Badge className="flex items-center gap-1">
                <Building size={14} />
                {restroom.businessInfo.type.replace('_', ' ')}
              </Badge>
            )}
          </div>
          
          {restroom.businessInfo?.partnerStatus !== 'none' && (
            <div className="flex items-center gap-1 mt-2">
              <Sparkles size={14} className="text-yellow-500" />
              <span className="text-sm font-medium">
                {restroom.businessInfo?.partnerStatus === 'premium' 
                  ? 'Premium Partner' 
                  : 'Standard Partner'}
              </span>
            </div>
          )}
          
          {restroom.businessInfo?.openHours && (
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Clock8 size={14} className="text-muted-foreground" />
              <span>{restroom.businessInfo.openHours}</span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-reststop-dark rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Cleanliness</h3>
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-solid border-reststop-primary">
              <span className="text-2xl font-bold">{restroom.cleanliness.score}</span>
            </div>
            <div>
              <div className={`font-medium text-lg cleanliness-${cleanlinessTier}`}>
                {cleanlinessTier === 'high' 
                  ? 'Very Clean' 
                  : cleanlinessTier === 'medium' 
                    ? 'Moderately Clean' 
                    : 'Needs Cleaning'}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock size={14} />
                <span>Updated {formatDate(lastUpdated)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {restroom.cleanliness.reports} cleanliness reports
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-reststop-dark rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {restroom.accessibility && (
              <Badge className="flex items-center gap-1">
                <Accessibility size={14} />
                <span>Accessible</span>
              </Badge>
            )}
            {restroom.babyChanging && (
              <Badge className="flex items-center gap-1">
                <Baby size={14} />
                <span>Baby Changing</span>
              </Badge>
            )}
            {restroom.genderNeutral && (
              <Badge className="flex items-center gap-1">
                <Users size={14} />
                <span>Gender Neutral</span>
              </Badge>
            )}
            {restroom.amenities.map((amenity, index) => (
              <Badge key={index} variant="outline">
                {amenity.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-reststop-dark rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Reviews</h3>
            <Button variant="outline" size="sm">Add Review</Button>
          </div>
          
          <ScrollArea className="h-60">
            {restroom.reviews.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No reviews yet
              </div>
            ) : (
              <div className="space-y-3">
                {restroom.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <div className="grid grid-cols-2 gap-2">
          <Button>Report Cleanliness</Button>
          <Button variant="secondary">Get Directions</Button>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const reviewDate = new Date(review.date);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="pb-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">{review.userName}</div>
        <div className="text-sm text-muted-foreground">{formatDate(reviewDate)}</div>
      </div>
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
          />
        ))}
        <span className="text-sm ml-1">
          {review.cleanliness}/5 cleanliness
        </span>
      </div>
      {review.comment && (
        <div className="text-sm mt-1">{review.comment}</div>
      )}
    </div>
  );
}
