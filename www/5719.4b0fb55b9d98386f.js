"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5719],{5719:(D,h,u)=>{u.r(h),u.d(h,{StudiesPageModule:()=>Q});var l=u(6814),r=u(95),s=u(29),p=u(5290),m=u(5861),g=u(2167),e=u(5879),v=u(7224),_=u(3565);let Z=(()=>{var t;class a{constructor(i,o,d){var c;this.afs=i,this.alertCtrl=o,this.profileService=d,this.addMessage="Studies added successfully.",this.updateMessage="Studies updated successfully.",this.deletedMessage="Studies has been successfully deleted.",this.userId=null===(c=this.profileService.getUserProfile())||void 0===c?void 0:c.uid,this.studiesCollection=this.afs.collection("userData")}addStudies(i){this.studiesCollection.doc(this.userId).collection("myStudies").add(i).then(o=>{this.successAlert(this.addMessage)}).catch(o=>{alert("There was an error in posting. \n Please try again later. Check console for detail."),console.warn(o)})}updateStudies(i,o){this.studiesCollection.doc(this.userId).collection("myStudies").doc(o).update(i).then(d=>{this.successAlert(this.updateMessage)}).catch(d=>{alert("There was an error in posting. \n Please try again later. Check console for detail."),console.warn(d)})}getStudies(){return this.studiesCollection.doc(this.userId).collection("myStudies",i=>i.orderBy("date","desc")).valueChanges({idField:"idField"})}deleteStudies(i){this.studiesCollection.doc(this.userId).collection("myStudies").doc(i).delete().then(()=>{this.successAlert(this.deletedMessage)}).catch(o=>{alert(o)})}successAlert(i){var o=this;return(0,m.Z)(function*(){yield(yield o.alertCtrl.create({header:"Success",subHeader:i,cssClass:"success-alert",buttons:["OK"]})).present()})()}}return(t=a).\u0275fac=function(i){return new(i||t)(e.LFG(v.ST),e.LFG(s.Br),e.LFG(_.H))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),a})();var S=u(4699),T=u(1386);let f=(()=>{var t;class a{constructor(){}ngOnInit(){}}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-advanced-studies"]],decls:2,vars:0,template:function(i,o){1&i&&(e.TgZ(0,"p"),e._uU(1," advanced-studies works!\n"),e.qZA())}}),a})();function A(t,a){if(1&t){const n=e.EpF();e.TgZ(0,"div",8)(1,"ion-tabs",9)(2,"ion-tab-bar",10)(3,"ion-tab-button",11),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.advancedMode=!1)}),e._UZ(4,"ion-icon",12),e._uU(5," Normal Mode "),e.qZA(),e.TgZ(6,"ion-tab-button",11),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.advancedMode=!0)}),e._UZ(7,"ion-icon",13),e._uU(8," Advanced Mode "),e.qZA()()()()}if(2&t){const n=e.oxw();e.xp6(3),e.Q6J("ngClass",n.advancedMode?"":"tab-active"),e.xp6(3),e.Q6J("ngClass",n.advancedMode?"tab-active":"")}}function y(t,a){if(1&t&&(e.TgZ(0,"ion-select-option",39),e._uU(1),e.qZA()),2&t){const n=a.$implicit;e.Q6J("value",n.value),e.xp6(1),e.Oqu(n.title)}}function b(t,a){1&t&&(e.TgZ(0,"h2",15),e._uU(1,"No Study Record"),e.qZA())}function x(t,a){1&t&&(e.TgZ(0,"h2",15),e._uU(1,"My Studies"),e.qZA())}function M(t,a){if(1&t){const n=e.EpF();e.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-text",43),e._uU(3),e.qZA(),e.TgZ(4,"ion-card-title"),e._uU(5),e.qZA(),e.TgZ(6,"ion-card-subtitle"),e._uU(7),e.qZA()(),e.TgZ(8,"ion-card-content")(9,"p")(10,"span",44),e._uU(11,"Description: "),e.qZA(),e._uU(12),e.qZA(),e.TgZ(13,"p")(14,"span",44),e._uU(15,"Date: "),e.qZA(),e._uU(16),e.qZA(),e.TgZ(17,"p")(18,"span",44),e._uU(19,"Answered By at"),e.qZA(),e._uU(20),e.qZA(),e.TgZ(21,"ion-button",45),e.NdJ("click",function(){const d=e.CHM(n).$implicit,c=e.oxw(3);return e.KtG(c.editStudies(d))}),e._UZ(22,"ion-icon",46),e.qZA(),e.TgZ(23,"ion-button",47),e.NdJ("click",function(){const d=e.CHM(n).$implicit,c=e.oxw(3);return e.KtG(c.deleteStudies(d.idField))}),e._UZ(24,"ion-icon",46),e.qZA()()()}if(2&t){const n=a.$implicit;e.xp6(3),e.Oqu(null==n?null:n.date),e.xp6(2),e.hij("Topic: ",null==n?null:n.topic,""),e.xp6(2),e.hij("Subject: ",null==n?null:n.subject,""),e.xp6(5),e.hij(" ",null==n?null:n.description,""),e.xp6(4),e.hij(" ",null==n?null:n.startTime,""),e.xp6(4),e.hij(" ",null==n?null:n.endTime,""),e.xp6(2),e.Q6J("ios","pencil-outline")("md","pencil-sharp"),e.xp6(2),e.Q6J("ios","trash-outline")("md","trash-sharp")}}function q(t,a){if(1&t&&(e.TgZ(0,"div",40),e.YNc(1,b,2,0,"h2",41),e.YNc(2,x,2,0,"h2",41),e.YNc(3,M,25,10,"ion-card",42),e.qZA()),2&t){const n=e.oxw(2);e.xp6(1),e.Q6J("ngIf",0===n.studiesCount),e.xp6(1),e.Q6J("ngIf",0!==n.studiesCount),e.xp6(1),e.Q6J("ngForOf",n.Studies)}}const U=function(){return["free-resource"]};function C(t,a){1&t&&(e.TgZ(0,"div",48)(1,"ion-button",49),e._uU(2,"Get Free Resource"),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("routerLink",e.DdM(1,U)))}function I(t,a){if(1&t){const n=e.EpF();e.ynx(0),e.TgZ(1,"div",14)(2,"h1",15),e._uU(3),e.qZA(),e.TgZ(4,"div",16)(5,"form",17),e.NdJ("ngSubmit",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.manageStudies())}),e.TgZ(6,"div",18)(7,"ion-item",19)(8,"ion-label",20),e._uU(9,"Date"),e.qZA(),e._UZ(10,"ion-input",21),e.qZA()(),e.TgZ(11,"div",18)(12,"ion-item",19)(13,"ion-label",22),e._uU(14,"Start Time"),e.qZA(),e._UZ(15,"ion-input",23),e.qZA()(),e.TgZ(16,"div",18)(17,"ion-item",19)(18,"ion-label",22),e._uU(19,"End Time"),e.qZA(),e._UZ(20,"ion-input",24),e.qZA()(),e.TgZ(21,"div",18)(22,"ion-item",19)(23,"ion-label",22),e._uU(24,"Subject"),e.qZA(),e._UZ(25,"ion-input",25),e.qZA()(),e.TgZ(26,"div",18)(27,"ion-item",19)(28,"ion-label",22),e._uU(29,"Topic"),e.qZA(),e._UZ(30,"ion-input",26),e.qZA()(),e.TgZ(31,"div",18)(32,"ion-item",19)(33,"ion-label",22),e._uU(34,"Description"),e.qZA(),e._UZ(35,"ion-textarea",27),e.qZA()(),e.TgZ(36,"div",18)(37,"ion-item",19)(38,"ion-label",22),e._uU(39,"Type"),e.qZA(),e.TgZ(40,"ion-select",28),e.YNc(41,y,2,2,"ion-select-option",29),e.qZA()()(),e.TgZ(42,"div",18)(43,"ion-item",19)(44,"ion-label",22),e._uU(45,"Study Mode"),e.qZA(),e.TgZ(46,"ion-select",30)(47,"ion-select-option",31),e._uU(48,"Self"),e.qZA(),e.TgZ(49,"ion-select-option",32),e._uU(50,"Group"),e.qZA(),e.TgZ(51,"ion-select-option",33),e._uU(52,"Teacher"),e.qZA(),e.TgZ(53,"ion-select-option",34),e._uU(54,"Online"),e.qZA()()()(),e.TgZ(55,"div",18)(56,"ion-button",35),e._uU(57),e.qZA(),e.TgZ(58,"ion-button",36),e._uU(59,"Reset"),e.qZA()()()()(),e.YNc(60,q,4,3,"div",37),e.YNc(61,C,3,2,"div",38),e.BQk()}if(2&t){const n=e.oxw();e.xp6(3),e.hij("",n.editMode?"Update":"Add"," Studies"),e.xp6(2),e.Q6J("formGroup",n.studiesForm),e.xp6(3),e.Q6J("position",n.editMode?"stacked":"floating"),e.xp6(33),e.Q6J("ngForOf",n.studiesTypes),e.xp6(15),e.Q6J("disabled",n.studiesForm.invalid),e.xp6(1),e.Oqu(n.editMode?"Update":"Submit"),e.xp6(3),e.Q6J("ngIf",!n.editMode),e.xp6(1),e.Q6J("ngIf",!n.editMode)}}function k(t,a){1&t&&e._UZ(0,"app-advanced-studies")}const w=function(){return["../"]},J=[{path:"",component:(()=>{var t;class a{constructor(i,o,d,c,G,Y,z){this.fb=i,this.studiesService=o,this.seoService=d,this.alertService=c,this.datePipe=G,this.viewportScroller=Y,this.profileService=z,this.pageTitle="Studies",this.pageMetaTags=[{name:"description",content:"Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better."},{name:"keyword",content:"Summarize, Summarize, arise, arize, money management, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis"},{name:"author",content:"Sandeep Kumar"}],this.Studies=[],this.studiesCount=0,this.currentTime=this.datePipe.transform(new Date,"hh:mm"),this.advancedMode=!0,this.advancedModeAvailable=!1,this.editMode=!1,this.dateToday=this.datePipe.transform(new Date,"yyyy-MM-dd"),this.studiesForm=this.fb.group({createdAt:[(0,g.Bt)()],date:[this.dateToday,[r.kI.required,r.kI.pattern("^[a-zA-Z 0-9 .,-]*$")]],startTime:["",[r.kI.required,r.kI.pattern("^[0-9:]*$")]],endTime:[this.currentTime,[r.kI.required,r.kI.pattern("^[0-9:]*$")]],type:["read",[r.kI.required,r.kI.pattern("^[a-z]*$")]],subject:["",[r.kI.required,r.kI.pattern("^[a-zA-Z 0-9 .,-]*$")]],topic:["",[r.kI.required,r.kI.pattern("^[a-zA-Z 0-9\n .,-]*$")]],description:["",[r.kI.required,r.kI.pattern("^[a-zA-Z 0-9\n .,-]*$")]],studyMode:["self",[r.kI.required,r.kI.pattern("^[a-zA-Z 0-9 .,-]*$")]],updatedAt:[(0,g.Bt)()]}),this.studiesTypes=[{title:"Learn",value:"learn"},{title:"Practice",value:"practice"},{title:"Read",value:"read"},{title:"Write",value:"write"},{title:"Test",value:"test"}],this.updateDataId=""}ngOnInit(){this.getStudies(),this.seoService.seo(this.pageTitle,this.pageMetaTags),this.activateAdvancedMode()}getStudies(){var i=this;return(0,m.Z)(function*(){yield i.studiesService.getStudies().subscribe(o=>{i.Studies=o,i.studiesCount=i.Studies.length})})()}manageStudies(i){var o;this.editMode?(console.log(),this.updateStudies(this.studiesForm.value)):this.addStudies(this.studiesForm.value),this.editMode=!1,null===(o=this.studiesForm.get("date"))||void 0===o||o.enable(),this.studiesForm.patchValue({subject:"",topic:"",description:""})}addStudies(i){this.studiesService.addStudies(i)}updateStudies(i){console.log(i),this.studiesService.updateStudies(i,this.updateDataId),this.updateDataId=""}deleteStudies(i){var o=this;return(0,m.Z)(function*(){"confirm"===(yield o.alertService.deleteAlert())&&o.studiesService.deleteStudies(i)})()}editStudies(i){var o=this;return(0,m.Z)(function*(){var d;o.studiesForm.patchValue({createdAt:i.createdAt,date:i.date,startTime:i.startTime,endTime:i.endTime,type:i.type,subject:i.subject,topic:i.topic,description:i.description,studyMode:i.studyMode,updatedAt:(0,g.Bt)()}),o.updateDataId=i.idField,null===(d=o.studiesForm.get("date"))||void 0===d||d.disable(),o.editMode=!0})()}activateAdvancedMode(){var i=this;return(0,m.Z)(function*(){const o=yield i.profileService.getProfileData();o.educationDetails&&(i.advancedModeAvailable=!0,i.advancedMode=!0,console.log(o))})()}}return(t=a).\u0275fac=function(i){return new(i||t)(e.Y36(r.qu),e.Y36(Z),e.Y36(S.v),e.Y36(T.c),e.Y36(l.uU),e.Y36(l.EM),e.Y36(_.H))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-studies"]],decls:16,vars:7,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["id","container"],["class","floating-tab",4,"ngIf"],[4,"ngIf","ngIfElse"],["advancedContent",""],[1,"floating-tab"],[1,"stay-topmost"],["slot","bottom"],[3,"ngClass","click"],["name","play-circle"],["name","sparkles"],[1,"card","ion-margin","ion-padding"],[1,"mt-0","h2"],[1,"form-container"],["novalidate","",3,"formGroup","ngSubmit"],[1,"input-item"],["fill","outline"],[3,"position"],["formControlName","date","type","date"],["position","floating"],["formControlName","startTime","type","time"],["formControlName","endTime","type","time"],["formControlName","subject","type","text","placeholder","Subject studied / Book Name","clear-input",""],["formControlName","topic","type","text","placeholder","Chapter/Topic/Sub-topic studied","clear-input",""],["formControlName","description","type","text","autoGrow","true","placeholder","Description/ Sub-topic / comments about topic.","clear-input",""],["formControlName","type","interface","popover","placeholder","Category of Studies"],[3,"value",4,"ngFor","ngForOf"],["formControlName","studyMode","interface","popover","placeholder","On whom it is Spent"],["value","self"],["value","group"],["value","teacher"],["value","online"],["color","primary","type","submit","size","medium",3,"disabled"],["color","primary","type","reset","size","medium"],["class","studies ion-margin",4,"ngIf"],["class","ion-padding",4,"ngIf"],[3,"value"],[1,"studies","ion-margin"],["class","mt-0 h2",4,"ngIf"],[4,"ngFor","ngForOf"],["color","primary"],[1,"bold"],["color","secondary",1,"action-button",3,"click"],["color","light",3,"ios","md"],["color","danger",1,"action-button",3,"click"],[1,"ion-padding"],["color","success","routerLinkActive","router-link-active",3,"routerLink"]],template:function(i,o){if(1&i&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title"),e._uU(10),e.qZA()()(),e.TgZ(11,"div",4),e.YNc(12,A,9,2,"div",5),e.YNc(13,I,62,8,"ng-container",6),e.qZA(),e.YNc(14,k,1,0,"ng-template",null,7,e.W1O),e.qZA()),2&i){const d=e.MAs(15);e.Q6J("translucent",!0),e.xp6(5),e.Oqu(o.pageTitle),e.xp6(1),e.Q6J("fullscreen",!0),e.xp6(4),e.Oqu(o.pageTitle),e.xp6(2),e.Q6J("ngIf",o.advancedModeAvailable),e.xp6(1),e.Q6J("ngIf",!o.advancedMode)("ngIfElse",d)}},dependencies:[l.mk,l.sg,l.O5,r._Y,r.JJ,r.JL,s.YG,s.Sm,s.PM,s.FN,s.Zi,s.tO,s.Dq,s.W2,s.Gu,s.gu,s.pK,s.Ie,s.Q$,s.fG,s.t9,s.n0,s.yq,s.ZU,s.yW,s.g2,s.wd,s.sr,s.QI,s.j9,s.UN,s.YI,p.rH,p.Od,r.sg,r.u,f],styles:[".form-container[_ngcontent-%COMP%]{min-height:610px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}ion-grid[_ngcontent-%COMP%]{min-width:1080px;--ion-grid-columns: 13}.studies[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{margin:20px 0%}.studies[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-right:15px}"]}),a})()},{path:"edit-studies",component:(()=>{var t;class a{constructor(){}ngOnInit(){}}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-edit-studies"]],decls:2,vars:0,template:function(i,o){1&i&&(e.TgZ(0,"p"),e._uU(1," edit-studies works!\n"),e.qZA())}}),a})()},{path:"free-resource",component:(()=>{var t;class a{constructor(){this.title="Free Resource"}ngOnInit(){}}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-free-resource"]],decls:35,vars:5,consts:[[3,"translucent"],["slot","start"],["slot","end","routerLinkActive","router-link-active",1,"mr-10",3,"routerLink"],["name","arrow-back-outline"],[3,"fullscreen"],["id","container"],[1,"free-resource","ion-margin"],[1,"h1","ion-margin"],[1,"ion-padding"],[1,"h2"],["color","success","href","https://www.udemy.com/course/mongodb-express-react-node-angular-mean-mern-stack-5-in-1-course/?couponCode=CHATGPT","target","blank"]],template:function(i,o){1&i&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5),e.qZA(),e.TgZ(6,"ion-button",2),e._UZ(7,"ion-icon",3),e.qZA()()(),e.TgZ(8,"ion-content",4)(9,"div",5)(10,"section",6)(11,"h1",7),e._uU(12,"Limited coupons only!"),e.qZA(),e.TgZ(13,"ion-card",8)(14,"ion-card-header")(15,"ion-card-title",9),e._uU(16,"MongoDB, Express, React, Node, Angular (MEAN/MERN) - 5 in 1"),e.qZA(),e.TgZ(17,"ion-card-subtitle"),e._uU(18,"Created by: Prince Patni"),e.qZA()(),e.TgZ(19,"ion-card-content")(20,"h2",9),e._uU(21,"What you'll learn"),e.qZA(),e.TgZ(22,"ul")(23,"li"),e._uU(24,"MongoDB: It is a document-oriented No-SQL data store used to store back-end applications."),e.qZA(),e.TgZ(25,"li"),e._uU(26,"ExpressJS: It is a layered framework built on top of NodeJS that takes care of the website's back-end functionality and structure."),e.qZA(),e.TgZ(27,"li"),e._uU(28,"ReactJS: It is a library that facilitates creating the user interface components of single-page web applications."),e.qZA(),e.TgZ(29,"li"),e._uU(30,"NodeJS: It is a runtime environment capable of running JavaScript on a machine"),e.qZA(),e.TgZ(31,"li"),e._uU(32,"AngularJS: It is the front-end framework that runs the code in the browser."),e.qZA()()(),e.TgZ(33,"ion-button",10),e._uU(34,"Get Now"),e.qZA()()()()()),2&i&&(e.Q6J("translucent",!0),e.xp6(5),e.Oqu(o.title),e.xp6(1),e.Q6J("routerLink",e.DdM(4,w)),e.xp6(2),e.Q6J("fullscreen",!0))},dependencies:[s.YG,s.Sm,s.PM,s.FN,s.Zi,s.tO,s.Dq,s.W2,s.Gu,s.gu,s.fG,s.wd,s.sr,s.YI,p.rH,p.Od]}),a})()},{path:"advanced-studies",component:f}];let N=(()=>{var t;class a{}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.Bz.forChild(J),p.Bz]}),a})(),O=(()=>{var t;class a{}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({}),a})(),Q=(()=>{var t;class a{}return(t=a).\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,r.u5,s.Pc,N,r.UX,O]}),a})()}}]);