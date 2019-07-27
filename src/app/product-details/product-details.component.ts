import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  itemDetails: any
  imagePreviewURI: any
  imageDetails:Object
  itemId: any
  mrpPrice: any
  constructor(private _searchItemService: SearchItemService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemDetails = {
      rating:'3',
      images:[
        'https://cdn.aws.toolstation.com/images/141020-UK/800/95776.jpg',
        'https://cdn.aws.toolstation.com/images/141020-UK/800/95776-1.jpg',
        'https://cdn.aws.toolstation.com/images/141020-UK/800/95776-2.jpg'
      ],
      currency:'C',
      offer:'0.1',
      price:'300',
      name:'very useful product rapido bubild branded',
      points:[
        "A smart essential - thin, lightweight and tough, the stylish Galaxy Active watch fits in with your lifestyle",
        "Samsung's new smartwatch comes in a range of colours and interchangeable straps",
        "The dynamic Galaxy Watch Active will make every move count by tracking and automatically storing every walk, run and cycle, recognising when you're working out",
        "Real-time guidance to reach wellness goals: Samsung's Galaxy Watch Active can track your sleep, gives you breathing exercises to help reduce stress and creates healthy habits that last",
        "A powerful accessory that pushes you forward: the Galaxy Active lets you connect to your devices, to receive messages and notifications on your watch, control your music and enjoy the freedom of a wireless workout"
      ]
    }
    this.setImageValue()
    this.imagePreviewURI = this.itemDetails.images[0]//'https://cdn.aws.toolstation.com/images/141020-UK/800/73722.jpg'
    this.mrpPrice = "101"
    /* this.itemId = this.getItemId()
    console.log(this.itemId)
    if(this.itemId){
      this._searchItemService.responsePoductListState.subscribe(respData => {
      let { hits } = respData
      if(hits && hits.hit ){
        this.itemDetails = hits.hit.filter((val,key) => {
          return val.id == this.itemId
        })
        this.itemDetails = this.itemDetails[0].fields
        this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)

      }
    })
    } */
    
  }

  setImageValue(index=0){
    this.imageDetails = this.itemDetails.images.map((val,key)=>{
    let thumbnailSel= false
    if(index === key){
      thumbnailSel= true
    }
    return ({
      active: thumbnailSel,
      uri: val
    })
    })
  }

  getItemId(){
    // return this.route.params.getValue('id').id
  }
  showPicture(uri, index){
    this.setImageValue(index)
    this.imagePreviewURI = uri
  }

}
