import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Announcement } from '../../models/Announcement';
import { AnnouncementService } from '../../shared/services/announcement.service';
@Component({
  selector: 'app-createannouncement',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './createannouncement.component.html',
  styleUrl: './createannouncement.component.css'
})
export class CreateannouncementComponent implements OnInit {
deleteannouncement(id: any) {
this.announcementservice.deleteAnnouncement(id).subscribe((data:any)=>{
  this.announcements = this.announcements.filter((x)=>x.id !== id);
  console.log(data);
}, (error)=>{
  console.error('Error deleting announcement',error);
  alert('Error deleting announcement');


}
);
}
onSubmitcreate() {
this.announcementservice.createAnnouncement(this.announcement).subscribe((data:any)=>{
  this.announcements.push(data);
  console.log(data);
},
(error)=>{
  console.error('Error creating announcement',error);
  alert('Error creating announcement');
}
);

}
onEditSubmit() {
  this.announcementservice.updateAnnouncement(this.editannouncementmodel).subscribe((data:any)=>{
    const index = this.announcements.findIndex((x)=>x.id === this.editannouncementmodel.id);
    this.announcements[index] = this.editannouncementmodel;
    console.log(data);
  },
  (error)=>{
    console.error('Error updating announcement',error);
    alert('Error updating announcement');
  }
  );
}

announcements:Announcement[] = [];
editannouncementmodel: Announcement = {
  body:'',
  endOfSale:new Date(),
  discount:0
}
  announcement :Announcement = {
  body:'',
  endOfSale:new Date(),
  discount:0
  };


  constructor(private announcementservice:AnnouncementService) { }
  ngOnInit(): void {
 this.announcementservice.getAnnouncements().subscribe((data:any)=>{

  this.announcements = data;  
  console.log(data);
 },(error)=>{
    console.error('Error fetching announcements',error);
    alert('Error fetching announcements');
 }
  );


  }


    

updatecurrentannouncement(id: number|undefined) {
  this.editannouncementmodel = this.announcements.find((x)=>x.id === id)!;
  }
  

}
