
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { Toilet, Star } from "lucide-react";
import { Restroom } from "@/types";
import { getCleanlinessTier } from "@/data/restrooms";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

interface MapProps {
  restrooms: Restroom[];
  currentLocation: { lat: number; lng: number };
  selectedId?: string;
  onSelectRestroom: (id: string) => void;
}

// Custom marker icon
const createRestroomIcon = (cleanlinessTier: 'high' | 'medium' | 'low') => {
  const color = cleanlinessTier === 'high' ? '#27ae60' : 
                cleanlinessTier === 'medium' ? '#f39c12' : 
                '#e74c3c';
  
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${
      cleanlinessTier === 'high' ? 'green' : 
      cleanlinessTier === 'medium' ? 'orange' : 
      'red'
    }.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Component to update the map view when the center changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  
  return null;
}

export function Map({ restrooms, currentLocation, selectedId, onSelectRestroom }: MapProps) {
  const [activeId, setActiveId] = useState<string | undefined>(selectedId);
  
  useEffect(() => {
    setActiveId(selectedId);
  }, [selectedId]);

  const handleMarkerClick = (id: string) => {
    setActiveId(id);
    onSelectRestroom(id);
  };

  return (
    <div className="map-container h-[calc(100vh-12rem)] md:h-[calc(100vh-4rem)]">
      <MapContainer
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapUpdater center={[currentLocation.lat, currentLocation.lng]} />
        
        {restrooms.map(restroom => {
          const cleanlinessTier = getCleanlinessTier(restroom.cleanliness.score);
          const isActive = activeId === restroom.id;
          
          return (
            <Marker
              key={restroom.id}
              position={[restroom.location.lat, restroom.location.lng]}
              icon={createRestroomIcon(cleanlinessTier)}
              eventHandlers={{
                click: () => handleMarkerClick(restroom.id),
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-semibold text-lg">{restroom.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span className={`cleanliness-${cleanlinessTier} font-medium`}>
                      {restroom.cleanliness.score}/100
                    </span>
                    <span className="text-muted-foreground">
                      ({restroom.cleanliness.reports} reports)
                    </span>
                  </div>
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRestroom(restroom.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
