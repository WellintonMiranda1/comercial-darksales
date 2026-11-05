document.querySelectorAll('form[data-confirm]').forEach(form=>form.addEventListener('submit',event=>{if(!confirm(form.dataset.confirm))event.preventDefault()}));

// Campos condicionais e prazo automático do contrato.
(function(){
  const status=document.querySelector('select[name="status"]');
  const cycle=document.querySelector('select[name="cycle"]');
  const start=document.querySelector('input[name="start_date"]');
  const due=document.querySelector('input[name="due_date"]');
  if(!status || !cycle || !start || !due) return;
  const pad=n=>String(n).padStart(2,'0');
  function advance(iso,period){
    if(!iso)return '';
    const [y,m,d]=iso.split('-').map(Number);
    const utc=new Date(Date.UTC(y,m-1,d));
    if(period==='monthly')utc.setUTCDate(utc.getUTCDate()+30);
    else {
      const months=period==='semiannual'?6:12;
      const idx=y*12+(m-1)+months;
      const yr=Math.floor(idx/12),mo=idx%12;
      const last=new Date(Date.UTC(yr,mo+1,0)).getUTCDate();
      return `${yr}-${pad(mo+1)}-${pad(Math.min(d,last))}`;
    }
    return `${utc.getUTCFullYear()}-${pad(utc.getUTCMonth()+1)}-${pad(utc.getUTCDate())}`;
  }
  let initialized=false;
  function refresh(){
    const st=status.value;
    const active=st==='active'||st==='late'||st==='cancelled';
    document.querySelectorAll('[data-active-only]').forEach(el=>el.hidden=!active);
    document.querySelectorAll('[data-trial-only]').forEach(el=>el.hidden=st!=='trial');
    document.querySelectorAll('[data-projection-only]').forEach(el=>el.hidden=st!=='lead' && st!=='trial');
    document.querySelectorAll('[data-lead-only]').forEach(el=>el.hidden=st!=='lead');
    if(active && !start.value){
      const now=new Date();
      start.value=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    }
    if(!initialized || !active) {
      if(!initialized && due.value && active) { /* preserve renewed due date */ }
      else due.value=active?advance(start.value,cycle.value):'';
    } else due.value=advance(start.value,cycle.value);
    initialized=true;
  }
  [status,cycle,start].forEach(e=>e.addEventListener('change',refresh));
  refresh();
})();


// Microinterações opcionais: inclinação discreta dos cards, sem bloquear cliques.
(function(){
  const reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const precise=window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(reduced||!precise)return;
  document.querySelectorAll('.stat, .commission-tile').forEach(card=>{
    card.classList.add('ds-tilt');
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      if(!rect.width||!rect.height)return;
      const x=((event.clientX-rect.left)/rect.width-.5)*2;
      const y=((event.clientY-rect.top)/rect.height-.5)*2;
      card.style.setProperty('--tilt-x',(-y*2.6).toFixed(2)+'deg');
      card.style.setProperty('--tilt-y',(x*2.6).toFixed(2)+'deg');
    },{passive:true});
    card.addEventListener('pointerleave',()=>{
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
})();

// Origem do cliente: indicação exige identificar quem indicou.
(function(){
  const select=document.querySelector('select[name="origin"]');
  const container=document.querySelector('[data-referral-only]');
  const input=document.querySelector('input[name="referred_by"]');
  if(!select || !container || !input)return;
  function refresh(){
    const referral=select.value==='indicacao';
    container.hidden=!referral;
    input.required=referral;
    input.disabled=!referral;
  }
  select.addEventListener('change',refresh);
  refresh();
})();
