import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Palestra } from 'src/app/models/palestra';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() palestre:Palestra[] 
  @Input() palestra:Palestra

  private map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 41.9027835, 12.4963655 ],
      zoom: 10
    });

   

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(){    
     
      
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    if(this.palestre){
    this.palestre.forEach(
      item =>{
        if(item.latitudine && item.longitudine) this.addMarker(item)
       
      }
    )}
    if(this.palestra){
      this.addMarker(this.palestra)
    }
  }

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
   })
};

  addMarker(item:any){
    let obj = [item.latitudine,item.longitudine]
    var marker = L.marker(obj as L.LatLngExpression, this.icon).bindPopup(`<b>${item.nome.toUpperCase()}</b><br />${item.indirizzo}`)
    marker.addTo(this.map)
  }

  }



