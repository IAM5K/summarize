"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1515],{1515:(y,p,s)=>{s.r(p),s.d(p,{ProfilePageModule:()=>j});var d=s(6814),u=s(95),n=s(29),g=s(5290),m=s(5861),e=s(5879),f=s(4699),h=s(3565);function P(i,l){if(1&i&&e._UZ(0,"img",33),2&i){const a=e.oxw();e.Q6J("src",a.userProfile.photoURL,e.LSH)("alt",a.userProfile.displayName)}}function Z(i,l){1&i&&(e.TgZ(0,"ion-button",34),e._uU(1,"Submit"),e.qZA())}function b(i,l){1&i&&(e.TgZ(0,"ion-button",35),e._uU(1,"Update"),e.qZA())}function v(i,l){if(1&i){const a=e.EpF();e.TgZ(0,"ion-item")(1,"ion-toggle",36),e.NdJ("ionChange",function(){const r=e.CHM(a).$implicit,c=e.oxw();return r.isActive=!r.isActive,e.KtG(c.updateProjectStatus(r))}),e._uU(2),e.qZA()()}if(2&i){const a=l.$implicit;e.xp6(1),e.Q6J("checked",a.isActive),e.xp6(1),e.Oqu(a.name)}}const _=function(){return[""]},T=[{path:"",component:(()=>{var i;class l{constructor(t,o){this.seoService=t,this.profileService=o,this.pageTitle="Profile",this.pageMetaTags=[{name:"description",content:"Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better."},{name:"keyword",content:"Summarize, Summarize, arise, arize, money management, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis"},{name:"author",content:"Sandeep Kumar"}],this.educationDetails=[],this.educationPhase="",this.projects=[{name:"Project 1",isActive:!0},{name:"Project 2",isActive:!1},{name:"Project 3",isActive:!1}],this.subjects="",this.updateDisabled=!0,this.alertButtons=[{text:"Submit",role:"confirm",handler:r=>{this.addProjectDetail(r)}}],this.alertInputs=[{placeholder:"Active project name"}]}ngOnInit(){var t=this;return(0,m.Z)(function*(){t.seoService.seo(t.pageTitle,t.pageMetaTags),t.userProfile=t.profileService.getUserProfile();const o=yield t.profileService.getProfileData();o.educationDetails&&t.populateProfileData(o)})()}onSubmit(){console.log("Education Phase:",this.educationPhase),console.log("Subjects:",this.subjects)}populateProfileData(t){console.log(t),t.educationDetails?(this.educationPhase=t.educationDetails.educationPhase,this.subjects=t.educationDetails.subjects,this.updateDisabled=!1):this.updateDisabled=!0,t.projects&&(this.projects=t.projects)}addEducationalDetail(){console.log("Education Phase:",this.educationPhase),console.log("Subjects:",this.subjects),this.profileService.addEducationalDetail({educationDetails:{educationPhase:this.educationPhase,subjects:this.subjects}})}addProjectDetail(t){const o={projects:{name:Object.values(t)[0].toString(),isActive:!0}};console.log("Education Phase:",o),this.profileService.addProjectDetail(o)}updateProjectStatus(t){console.log(t)}}return(i=l).\u0275fac=function(t){return new(t||i)(e.Y36(f.v),e.Y36(h.H))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-profile"]],decls:73,vars:24,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],[1,"card","ion-padding"],[1,"profile-photo"],["referrerpolicy","no-referrer",3,"src","alt",4,"ngIf"],[1,"h2"],["color","tertiary",1,"h4"],[1,""],[1,"ion-text-bold"],[1,"text-success","ion-text-bold"],[3,"multiple","value"],["value","first"],["slot","header","color","light"],["slot","content",1,"mb-15px"],[3,"ngSubmit"],["educationForm","ngForm"],["lines","none"],["label","Education phase","label-placement","floating","name","educationPhase",3,"ngModel","ngModelChange"],["value","Intermediate"],["label","Subjects","label-placement","floating","name","subjects",3,"ngModel","disabled","ngModelChange"],["value","PCM"],["value","PCB"],["size","medium","slot","end","type","submit","color","primary",4,"ngIf"],["size","medium","slot","end","type","submit","color","tertiary",4,"ngIf"],["value","second"],[4,"ngFor","ngForOf"],["id","present-alert"],["trigger","present-alert","header","Fill project details",3,"buttons","inputs"],["projectForm","ngForm"],["referrerpolicy","no-referrer",3,"src","alt"],["size","medium","slot","end","type","submit","color","primary"],["size","medium","slot","end","type","submit","color","tertiary"],[3,"checked","ionChange"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title",4),e._uU(10),e.qZA()()(),e.TgZ(11,"div",5)(12,"div",6)(13,"div",7),e.YNc(14,P,1,2,"img",8),e.qZA(),e.TgZ(15,"h1",9),e._uU(16),e.qZA(),e.TgZ(17,"ion-note",10),e._uU(18,"Welcome to Summarize, Profile page is under development. It will be available soon with some exciting features."),e.qZA(),e.TgZ(19,"p",11)(20,"span",12),e._uU(21," Email :"),e.qZA(),e.TgZ(22,"span",13),e._uU(23),e.ALo(24,"titlecase"),e.qZA()(),e.TgZ(25,"p",11)(26,"span",12),e._uU(27," Email Verified :"),e.qZA(),e.TgZ(28,"span",13),e._uU(29),e.ALo(30,"titlecase"),e.qZA()(),e.TgZ(31,"p",11)(32,"span",12),e._uU(33," Phone Number :"),e.qZA(),e.TgZ(34,"span",13),e._uU(35),e.qZA()()(),e.TgZ(36,"div",6)(37,"h2",9),e._uU(38,"About Me"),e.qZA(),e.TgZ(39,"ion-accordion-group",14)(40,"ion-accordion",15)(41,"ion-item",16)(42,"ion-label"),e._uU(43,"Studies"),e.qZA()(),e.TgZ(44,"div",17)(45,"form",18,19),e.NdJ("ngSubmit",function(){return o.addEducationalDetail()}),e.TgZ(47,"ion-list")(48,"ion-item",20)(49,"ion-select",21),e.NdJ("ngModelChange",function(c){return o.educationPhase=c}),e.TgZ(50,"ion-select-option",22),e._uU(51,"Intermediate"),e.qZA()()(),e.TgZ(52,"ion-item",20)(53,"ion-select",23),e.NdJ("ngModelChange",function(c){return o.subjects=c}),e.TgZ(54,"ion-select-option",24),e._uU(55,"PCM"),e.qZA(),e.TgZ(56,"ion-select-option",25),e._uU(57,"PCB"),e.qZA()()(),e.TgZ(58,"ion-item",20),e.YNc(59,Z,2,0,"ion-button",26),e.YNc(60,b,2,0,"ion-button",27),e.qZA()()()()(),e.TgZ(61,"ion-accordion",28)(62,"ion-item",16)(63,"ion-label"),e._uU(64,"Projects"),e.qZA()(),e.TgZ(65,"div",17)(66,"ion-list"),e.YNc(67,v,3,2,"ion-item",29),e.qZA(),e.TgZ(68,"ion-button",30),e._uU(69,"Add project"),e.qZA(),e._UZ(70,"ion-alert",31),e.TgZ(71,"form",18,32),e.NdJ("ngSubmit",function(){return o.addEducationalDetail()}),e.qZA()()()()()()()),2&t&&(e.Q6J("translucent",!0),e.xp6(5),e.Oqu(o.pageTitle),e.xp6(1),e.Q6J("fullscreen",!0),e.xp6(4),e.Oqu(o.pageTitle),e.xp6(4),e.Q6J("ngIf",o.userProfile.photoURL),e.xp6(2),e.Oqu(o.userProfile.displayName),e.xp6(7),e.hij(" ",e.lcZ(24,19,null==o.userProfile?null:o.userProfile.email),""),e.xp6(6),e.hij(" ",e.lcZ(30,21,null==o.userProfile?null:o.userProfile.emailVerified.toString()),""),e.xp6(6),e.hij(" ",o.userProfile.phoneNumber,""),e.xp6(4),e.Q6J("multiple",!0)("value",e.DdM(23,_)),e.xp6(10),e.Q6J("ngModel",o.educationPhase),e.xp6(4),e.Q6J("ngModel",o.subjects)("disabled",!o.educationPhase),e.xp6(6),e.Q6J("ngIf",o.updateDisabled),e.xp6(1),e.Q6J("ngIf",!o.updateDisabled),e.xp6(7),e.Q6J("ngForOf",o.projects),e.xp6(3),e.Q6J("buttons",o.alertButtons)("inputs",o.alertInputs))},dependencies:[d.sg,d.O5,u._Y,u.JJ,u.JL,u.On,u.F,n.We,n.eh,n.Ge,n.YG,n.Sm,n.W2,n.Gu,n.Ie,n.Q$,n.q_,n.fG,n.uN,n.t9,n.n0,n.wd,n.ho,n.sr,n.w,n.QI,d.rS],styles:[".profile-photo[_ngcontent-%COMP%]{height:96px;width:96px;margin:20px;border-radius:50%;overflow:hidden;box-shadow:0 0 15px var(--ion-color-secondary)}.profile-photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:96px;width:96px}@media screen and (max-width: 992px){.profile-photo[_ngcontent-%COMP%]{margin:20px auto}}"]}),l})()}];let A=(()=>{var i;class l{}return(i=l).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[g.Bz.forChild(T),g.Bz]}),l})(),j=(()=>{var i;class l{}return(i=l).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.ez,u.u5,n.Pc,A,u.UX]}),l})()}}]);