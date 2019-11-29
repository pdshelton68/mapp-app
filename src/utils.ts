export class Utils{
    private static degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      }
      
      public static distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
      
        var dLat = this.degreesToRadians(lat2-lat1);
        var dLon = this.degreesToRadians(lon2-lon1);
      
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
      }
    
      public static getCenterCoords(sourceCoords:any[][]):number[] {
        var minLong:number = 0;
        var maxLong:number = 0;
    
        var minLat:number = 0;
        var maxLat:number = 0;
    
        for(let i = 0;i< sourceCoords.length;i++){
          if(minLong === 0 || Math.abs( +sourceCoords[i][1]) < Math.abs( minLong)) {
            minLong = +sourceCoords[i][1];
          }
          if(maxLong === 0 || Math.abs( +sourceCoords[i][1]) > Math.abs( maxLong)) {
            maxLong = +sourceCoords[i][1];
          }
          if(minLat === 0 || +sourceCoords[i][0] < minLat) {
            minLat = +sourceCoords[i][0];
          }
          if(maxLat === 0 || +sourceCoords[i][0] > maxLat) {
            maxLat = +sourceCoords[i][0];
          }
        }
    
        return [(minLat + (maxLat-minLat)/2), -(Math.abs( minLong) + (Math.abs( maxLong) - Math.abs( minLong))/2) ];
        
        //return [(minLat + (maxLat-minLat)/2), minLong ]
      }

}