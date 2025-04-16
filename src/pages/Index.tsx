
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { RestroomCard } from "@/components/RestroomCard";
import { RestroomDetail } from "@/components/RestroomDetail";
import { Chatbot } from "@/components/Chatbot";
import { ThemeProvider } from "@/hooks/use-theme";
import { Restroom } from "@/types";
import { getAllRestrooms, getRestroomsByLocation, defaultLocation } from "@/data/restrooms";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";

const Index = () => {
  const [restrooms, setRestrooms] = useState<Restroom[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    // In a real app, we would use the browser's geolocation API
    // For this demo, we'll use our default location (Coimbatore)
    const allRestrooms = getAllRestrooms();
    setRestrooms(allRestrooms);
    
    // Display a welcome message specific to Coimbatore
    console.log("Welcome to RestStop Coimbatore, Tamil Nadu!");
  }, []);

  const handleSearch = (query: string) => {
    // Simple search implementation
    if (!query) {
      setRestrooms(getAllRestrooms());
      return;
    }
    
    const filtered = getAllRestrooms().filter(
      restroom => 
        restroom.name.toLowerCase().includes(query.toLowerCase()) ||
        (restroom.description && restroom.description.toLowerCase().includes(query.toLowerCase())) ||
        (restroom.location.address && restroom.location.address.toLowerCase().includes(query.toLowerCase()))
    );
    
    setRestrooms(filtered);
  };

  const handleSelectRestroom = (id: string) => {
    setSelectedId(id);
    setIsDetailView(true);
  };

  const handleBackFromDetail = () => {
    setIsDetailView(false);
  };

  const selectedRestroom = restrooms.find(r => r.id === selectedId);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header onSearch={handleSearch} />
        
        <main className="flex-1 container grid md:grid-cols-12 gap-4 py-4">
          {!isDetailView ? (
            <>
              <div className="md:col-span-8 order-2 md:order-1">
                {viewMode === "map" ? (
                  <Map 
                    restrooms={restrooms} 
                    currentLocation={currentLocation}
                    selectedId={selectedId}
                    onSelectRestroom={handleSelectRestroom}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restrooms.length === 0 ? (
                      <div className="col-span-full flex items-center justify-center h-64 text-muted-foreground">
                        No restrooms found matching your criteria
                      </div>
                    ) : (
                      restrooms.map(restroom => (
                        <RestroomCard 
                          key={restroom.id} 
                          restroom={restroom}
                          onClick={() => handleSelectRestroom(restroom.id)}
                          isSelected={restroom.id === selectedId}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-4 order-1 md:order-2">
                <div className="bg-white dark:bg-reststop-dark rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">RestStop Coimbatore</h2>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={viewMode === "map" ? "default" : "outline"}
                        onClick={() => setViewMode("map")}
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Map
                      </Button>
                      <Button 
                        size="sm" 
                        variant={viewMode === "list" ? "default" : "outline"}
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4 mr-1" />
                        List
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>{restrooms.length}</strong> restrooms found in Coimbatore
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Top rated restrooms</h3>
                      {restrooms
                        .sort((a, b) => b.cleanliness.score - a.cleanliness.score)
                        .slice(0, 3)
                        .map(restroom => (
                          <RestroomCard
                            key={restroom.id}
                            restroom={restroom}
                            onClick={() => handleSelectRestroom(restroom.id)}
                            isSelected={restroom.id === selectedId}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedRestroom ? (
            <div className="col-span-12">
              <RestroomDetail 
                restroom={selectedRestroom}
                onBack={handleBackFromDetail}
              />
            </div>
          ) : (
            <div className="col-span-12 flex items-center justify-center h-64">
              <p>Restroom not found</p>
            </div>
          )}
        </main>
        
        <Chatbot onFindNearbyRestrooms={handleSearch} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
