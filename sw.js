/* Service worker des notifications : généré par l’administration du site */
var ICON='media/phpul9t3mquo.png';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('push',function(e){
  var d={};
  try{d=e.data?e.data.json():{}}catch(x){d={t:'Notification',b:e.data?e.data.text():''}}
  var o={body:d.b||'',data:{u:d.u||''},lang:'fr'};
  if(ICON)o.icon=ICON;
  if(d.g){o.tag=d.g;o.renotify=true}
  e.waitUntil(self.registration.showNotification(d.t||'Notification',o).then(function(){
    try{if(self.navigator.setAppBadge)self.navigator.setAppBadge()}catch(x){}
    return self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(L){
      L.forEach(function(c){try{c.postMessage({k:'push',d:d})}catch(x){}})
    })
  }));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var u=(e.notification.data||{}).u||'',base=self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(L){
    for(var i=0;i<L.length;i++){
      if(L[i].url.indexOf(base)===0){
        try{L[i].postMessage({k:'go',u:u})}catch(x){}
        return L[i].focus?L[i].focus():undefined;
      }
    }
    return self.clients.openWindow(base+u);
  }));
});
