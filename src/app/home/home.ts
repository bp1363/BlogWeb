import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-home',
 imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true        // <-- mark as standalone
   
})
export class Home {
  
}

