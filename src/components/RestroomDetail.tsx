
import { useState } from "react";
import { Restroom, Review } from "@/types";
import { getCleanlinessTier } from "@/data/restrooms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Toilet, MapPin, Clock, ArrowLeft, Star, Accessibility, 
  Baby, Users, CheckCircle, Clock8, Building, Sparkles, 
  Upload, Image, Coffee, Utensils, Hotel, Cake
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RestroomDetailProps {
  restroom: Restroom;
  onBack: () => void;
}

export function RestroomDetail({ restroom, onBack }: RestroomDetailProps) {
  const cleanlinessTier = getCleanlinessTier(restroom.cleanliness.score);
  const lastUpdated = new Date(restroom.cleanliness.lastUpdated);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewCleanliness, setReviewCleanliness] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImages, setReviewImages] = useState<FileList | null>(null);
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleReportCleanliness = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting the cleanliness status.",
    });
  };

  const handleGetDirections = () => {
    // Open Google Maps with directions to the restroom
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restroom.location.lat},${restroom.location.lng}&travelmode=driving`;
    window.open(mapsUrl, '_blank');
  };
  
  const handleReviewSubmit = () => {
    // In a real app, this would upload the images to a server
    // and save the review to a database
    
    // For now, we'll just show a success toast
    toast({
      title: "Review Submitted",
      description: `Thank you for your review${reviewImages ? ' and uploaded images' : ''}!`,
    });
    
    setReviewDialogOpen(false);
    setReviewRating(5);
    setReviewCleanliness(5);
    setReviewComment("");
    setReviewImages(null);
  };
  
  // Function to get the appropriate business icon
  const getBusinessIcon = () => {
    if (!restroom.businessInfo) return null;
    
    switch(restroom.businessInfo.type) {
      case 'cafe':
        return <Coffee size={20} className="text-reststop-primary" />;
      case 'restaurant':
        return <Utensils size={20} className="text-reststop-primary" />;
      case 'hotel':
        return <Hotel size={20} className="text-reststop-primary" />;
      case 'bakery':
        return <Cake size={20} className="text-reststop-primary" />;
      default:
        return <Building size={20} className="text-muted-foreground" />;
    }
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
                {getBusinessIcon()}
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
            <Button variant="outline" size="sm" onClick={() => setReviewDialogOpen(true)}>Add Review</Button>
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
          <Button onClick={handleReportCleanliness}>Report Cleanliness</Button>
          <Button variant="secondary" onClick={handleGetDirections}>Get Directions</Button>
        </div>
      </div>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Review</DialogTitle>
            <DialogDescription>
              Share your experience at {restroom.name}. Upload images to help others.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Overall Rating</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="rating"
                  min={1}
                  max={5}
                  step={1}
                  value={[reviewRating]}
                  onValueChange={(values) => setReviewRating(values[0])}
                />
                <span className="font-medium w-8">{reviewRating}/5</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cleanliness">Cleanliness Rating</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="cleanliness"
                  min={1}
                  max={5}
                  step={1}
                  value={[reviewCleanliness]}
                  onValueChange={(values) => setReviewCleanliness(values[0])}
                />
                <span className="font-medium w-8">{reviewCleanliness}/5</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Your Comments</Label>
              <Textarea
                id="comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="images">Upload Images (Optional)</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <label htmlFor="images" className="cursor-pointer flex flex-col items-center justify-center">
                    <Image size={24} className="text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Click to upload images</p>
                    <Input 
                      id="images" 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => setReviewImages(e.target.files)}
                    />
                  </label>
                </div>
                {reviewImages && reviewImages.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {reviewImages.length} image{reviewImages.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleReviewSubmit}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
