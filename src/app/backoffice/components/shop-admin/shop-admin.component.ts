import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ShopDTO } from '../../models/ShopDTO';
import * as BackofficeActions from '../../actions';
import { EditShopPictureModel } from '../../models/edtiShopPictureModel';
import { AppConfiguration } from 'read-appsettings-json';

@Component({
  selector: 'app-shop-admin',
  templateUrl: './shop-admin.component.html',
  styleUrls: ['./shop-admin.component.css']
})
export class ShopAdminComponent implements OnInit {

  public backofficeState$: any;
  public shop$: ShopDTO | any;

  constructor(
    private store: Store<AppState>,
    private router: Router) { 
      let firstLoad = true;
      this.store.select('account').subscribe(account => {
        if(firstLoad && account != undefined && account.userClaims !== undefined) {
          firstLoad = false;
          this.store.dispatch(BackofficeActions.loadShop({ ownerId: parseInt(account.userClaims.sub, 10) })); 
        }   
      });
      this.store.select('backoffice').subscribe(backoffice => {
        this.backofficeState$ = backoffice;
        if(backoffice !== undefined && backoffice !== null && backoffice.shop != null) {
          this.shop$ = backoffice.shop;
        }        
      });
  }

  ngOnInit(): void {
    
  }

  public getImgPath = (serverPath: string) => {
    return `${AppConfiguration.Setting().apiEndpoint}/${serverPath}`;
  }

  public uploadFile = (files: FileList | null) => {
    if (files === null || files.length === 0) {
      return;
    }
    //const fileToUpload: File = <File>files[0];
    const pictureModel: EditShopPictureModel = {
      id: this.shop$.id,             
      file: <File>files[0]      
    }
    this.store.dispatch(BackofficeActions.uploadShopPicture({ editShopPictureModel: pictureModel })); 
    //const formData = new FormData();
    // formData.append('file', fileToUpload, fileToUpload.name);
    // this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   });
  }

}
