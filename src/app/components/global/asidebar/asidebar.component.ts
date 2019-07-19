import { Component, OnInit,ElementRef, ViewChild, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.scss']
})
export class AsidebarComponent implements OnInit{


@ViewChild("asideBar") asideBar:ElementRef;

  constructor(private r2:Renderer2) { }

  ngOnInit() {
  }
  hideAsideBar(){
    if(!this.asideBar.nativeElement.classList.contains("invisibleAsideBar")){
      this.r2.addClass(this.asideBar.nativeElement,"invisibleAsideBar")
    }else{
      this.r2.removeClass(this.asideBar.nativeElement,"invisibleAsideBar")
    }
  }

  @HostListener('window:resize',['$event'])
  onResize(event){
    if(event.target.innerWidth<=991){
      this.r2.addClass(this.asideBar.nativeElement,"invisibleAsideBar")
      
    }else{
      this.r2.removeClass(this.asideBar.nativeElement,"invisibleAsideBar")
    }
  }

}
