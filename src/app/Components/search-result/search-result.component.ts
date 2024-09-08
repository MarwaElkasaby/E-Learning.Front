import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../shared/services/search.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
constructor(private _SearchService:SearchService, private _ActivatedRoute:ActivatedRoute){}

searchTerm:any;
courses:any[]=[];

ngOnInit(){
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      //shayl kol eli fe el url
      this.searchTerm=params.get('SearchTerm')

      this._SearchService.getSearchResults(this.searchTerm.trim()).subscribe({
    next:(response)=>{
      this.courses=response;
    }
  })

    }
  })
  
}
}
