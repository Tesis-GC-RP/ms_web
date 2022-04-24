import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { CitaService } from 'src/app/services/cita.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu: Menu[] = [];

  token: string = "";

  constructor(private _citaService: CitaService) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
  }

}
