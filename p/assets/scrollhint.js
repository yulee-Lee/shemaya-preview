(function(){
var st=document.createElement('style');
st.textContent='.scroll-hint{position:sticky;bottom:6px;display:block;width:max-content;margin:8px auto 0;padding:1px 14px;font-family:var(--sans);font-size:13px;line-height:1.7;letter-spacing:.04em;color:var(--accent-dark);background:var(--bg);border:1px solid var(--line);border-radius:999px;pointer-events:none;transition:opacity .2s}.scroll-hint.off{opacity:0}';
document.head.appendChild(st);
var busy=false,pend=false;
function scan(){
  busy=true;
  var els=document.querySelectorAll('.sx-r,#pd .pdesc');
  for(var i=0;i<els.length;i++){
    var el=els[i],h=el.querySelector('.scroll-hint');
    if(el.offsetParent===null){continue;}
    var extra=h?h.offsetHeight+8:0;
    var over=el.scrollHeight-extra>el.clientHeight+4;
    if(over&&!h){
      h=document.createElement('span');h.className='scroll-hint';h.setAttribute('aria-hidden','true');h.textContent='\u25BC \u5F80\u4E0B\u6372\u52D5\u770B\u66F4\u591A';
      el.appendChild(h);
      if(!el._sh){el._sh=1;el.addEventListener('scroll',upd,{passive:true});}
    }else if(!over&&h){h.parentNode.removeChild(h);}
    if(h||over){upd.call(el);}
  }
  busy=false;
}
function upd(){
  var el=this,h=el.querySelector('.scroll-hint');
  if(!h)return;
  var end=el.scrollTop+el.clientHeight>=el.scrollHeight-(h.offsetHeight+14);
  h.classList.toggle('off',end);
}
function sched(){if(busy||pend)return;pend=true;requestAnimationFrame(function(){pend=false;scan();});}
window.addEventListener('load',sched);window.addEventListener('resize',sched);
new MutationObserver(sched).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
sched();
})();
