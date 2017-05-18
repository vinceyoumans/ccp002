import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


import {
  Push,
  PushToken
} from '@ionic/cloud-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public push:Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


     //  vy added this...

        alert('---  ABOUT TO DO PUSH TOKEN CODE  -----');
        console.log('=== About to look for TOKEN');
        this.push.register().then((t: PushToken) => {
          //  This never happens... never gets to this point in the code.
          console.log('=== About to return TOKEN');
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('VY***********************************************'); 
          console.log('=== About to SAVE TOKEN');
          console.log('Token saved:', t.token);
          window.localStorage.setItem("deviceToken", t.token);          
          console.log('VY***********************************************'); 
        }).catch(function(error){  
          alert('----error----' + error  );
          console.log('error-----', error);
          console.error(error);});

        this.push.rx.notification()
          .subscribe((msg) => {
            alert(msg.title + ': ' + msg.text);
          });
// ============================= 

      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}
