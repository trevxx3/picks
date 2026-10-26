(function(){
  var d=document.documentElement; d.classList.add('js');
  // pestañas (partido)
  var tabs=document.querySelectorAll('.tabs a[data-tab]');
  if(tabs.length){
    var show=function(id,scroll){
      var ok=false;
      for(var i=0;i<tabs.length;i++){var on=tabs[i].getAttribute('data-tab')===id;tabs[i].classList.toggle('on',on);if(on)ok=true;}
      if(!ok)return false;
      var ps=document.querySelectorAll('.panel');
      for(var j=0;j<ps.length;j++){ps[j].classList.toggle('on',ps[j].id===id);}
      if(scroll){var t=document.querySelector('.tabs');window.scrollTo(0,t.offsetTop>window.scrollY?window.scrollY:t.offsetTop);} 
      return true;
    };
    for(var i=0;i<tabs.length;i++){tabs[i].addEventListener('click',function(e){e.preventDefault();var id=this.getAttribute('data-tab');show(id,true);if(history.replaceState)history.replaceState(null,'','#'+id);});}
    var h=(location.hash||'').slice(1); if(!show(h,false)) show(tabs[0].getAttribute('data-tab'),false);
    window.addEventListener('hashchange',function(){show(location.hash.slice(1),true);});
  }
  // toggle forma 5/10
  var tg=document.querySelectorAll('.tgl button');
  for(var k=0;k<tg.length;k++){tg[k].addEventListener('click',function(){
    var n=this.getAttribute('data-n'); var box=this.closest('[data-forma]');
    var bs=box.querySelectorAll('.tgl button'); for(var a=0;a<bs.length;a++)bs[a].classList.toggle('on',bs[a]===this);
    var vs=box.querySelectorAll('[data-win]'); for(var b=0;b<vs.length;b++)vs[b].style.display=(vs[b].getAttribute('data-win')===n)?'':'none';
  });}
  // filtro de fecha (cartelera)
  var ch=document.querySelectorAll('.chips [data-f]');
  for(var c=0;c<ch.length;c++){ch[c].addEventListener('click',function(e){
    e.preventDefault(); var f=this.getAttribute('data-f');
    for(var x=0;x<ch.length;x++)ch[x].classList.toggle('on',ch[x]===this);
    var gs=document.querySelectorAll('[data-date]'); for(var y=0;y<gs.length;y++){gs[y].style.display=(f==='all'||gs[y].getAttribute('data-date')===f)?'':'none';}
  });}
})();
