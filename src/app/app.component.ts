import {Component, Input, Output, EventEmitter} from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { DragData } from './dragdata';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Input() name = 'dddddd';
  //@Output() countChange = EventEmitter<number>();

  private draggableElements = 3;
  private zonePrefix = 'zone-';
  public droppableObjects: Array<any> = [];
  public draggableObjects: Array<Array<any>> = [[], [], []];
  // public myDragableObjects: Array<DragData> []= [];
  //public myDragableObjects: DragData[] = [];
  public myDragableObjects22: {data: DragData}[] = [];
  public mydata = 'BBBBBB';
  public username  = 'asdf';


  constructor() {
    // NOTE: This is just for the demo - But it gives you an idea of how to set a drag/drop implementation
    for (let i = 0; i < this.draggableElements; i++) {
      // Define the droppable objects
      this.droppableObjects.push({
        data: {
          column: i
        },
        zone: this.zonePrefix + i
      });
      // Define the draggable objects relative to their position
      this.draggableObjects[i].push({
        data: {
          id: i,
          payload: 'FxM Some data you need to pass',
          name: 'Draggable - ' + i,
          currentColumn: i,
        },
        zones: this.generateZones(i)
      });
	  //////////////////////
	  this.draggableObjects[i].push({
        data: {
			payloadType: 'url',
          id: i+100,
          payload: 'FxM XXXXXXXXXXXX',
          name: 'Draggable Video - ' + i + 100,
          currentColumn: i,
        },
        zones: this.generateZones(i)
      });

    //////////////////////
    //
    // this.myDragableObjects.push({
    //     id: i + 200,
    //     payload: `soon to be pasted anything ${i}`,
    //     name: 'My Draggable - ' + i + 200,
    //     currentColumn: i,
    //     payloadType: 'Free Wille'
    // });

    this.myDragableObjects22.push({
      data: {
        id: i + 200,
        payload: `<figure class="image">
        <img src="https://i.ytimg.com/vi/bjJSA8hx35E/hqdefault.jpg" alt="">
        </figure>
        
        <p>
        <a href="https://www.youtube.com/watch?v=bjJSA8hx35E">play</a></p>
         ${i}`,
        name: 'My Draggable - ' + i + 200,
        currentColumn: i,
        payloadType: 'Free Wille'
      }
    });
  }
  }
  /**
   * @desc responsible for generating the zones that a draggable element can go too.
   * @param {number} zone - the zone that the draggable element is a part of
   * @returns Array<string> an array of zone IDs that the draggable element can be dropped into
   */
  private generateZones(zone: number): Array<string> {
    // Generate all available zones
    const zones: Array<string> = [];
    for (let i = 0; i < this.draggableElements; i++) {
      zones.push(this.zonePrefix + i);
    }
    // Remove the current zone
    zones.splice(zone, 1);
    return zones;
  }

  /**
   * @desc responsible for handling the zone drop event
   * @param {any} event - the event data specific to the implementation
   */
  public onZoneDrop(event: any) {
    // Update your data here
    // Add the droppable to the new zone, with updated data
    this.draggableObjects[event.zone.column].push({
      data: {
        id: event.data.id,
        payload: event.data.payload,
        name: event.data.name,
        currentColumn: event.zone.column
      },
      zones: this.generateZones(event.zone.column)
    });

    // Find the ID and remove it
    for (let i = 0; i < this.draggableObjects[event.data.currentColumn].length; i++) {
      if (event.data.id === this.draggableObjects[event.data.currentColumn][i].data.id) {
        // Remove the droppable from the old zone
        this.draggableObjects[event.data.currentColumn].splice(i, 1);
      }
    }
  }
}
