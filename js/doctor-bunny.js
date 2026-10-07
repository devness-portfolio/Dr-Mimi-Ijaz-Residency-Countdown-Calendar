/* Shared companion for the website and the offline native apps. */
(() => {
  'use strict';
  if (document.getElementById('doctor-bunny')) return;
  const hero = document.querySelector('#countdown .hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx || typeof Path2D === 'undefined' || !ctx.roundRect) return;
  const style = document.createElement('style');
  style.textContent = `
    #countdown .hero { gap: 12px; }
    #countdown .hero > .spark, #countdown .hero > .heart { display:none; }
    #doctor-bunny { width:clamp(100px,29vw,160px); flex:none; padding:0; border:0; background:transparent; border-radius:22px; color:#655063; cursor:pointer; touch-action:manipulation; }
    #doctor-bunny:focus-visible { outline:3px solid #bd678d; outline-offset:3px; }
    #doctor-bunny canvas { display:block; width:100%; height:auto; }
    #bunny-message { min-height:3em; max-width:360px; margin:8px auto 12px; padding:0 8px; font:italic 16px/1.5 Georgia,serif; color:#806070; text-align:center; }
    #countdown .encouragement img { display:none; }
    #countdown .encouragement { margin-bottom:22px; text-align:center; }
    #celebration .celebration-art { flex-wrap:wrap; }
    @media(max-width:360px) { #countdown .days strong {font-size:76px;letter-spacing:-4px;} #countdown .hero {gap:6px;} }
  `;
  document.head.append(style);
  const button = document.createElement('button');
  button.id = 'doctor-bunny'; button.type = 'button';
  button.setAttribute('aria-label', 'Doctor bunny. Tap for the next activity and encouragement.');
  canvas.width = 360; canvas.height = 440; canvas.setAttribute('aria-hidden', 'true');
  button.append(canvas); hero.prepend(button);
  const message = document.createElement('p'); message.id = 'bunny-message';
  // Automatic messages stay quiet for screen readers; tapped messages use a live region.
  const live = document.createElement('span'); live.setAttribute('role', 'status');
  live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)';
  button.after(live); hero.after(message);
  const messages = ['One day at a time, meri jaan.', 'You make a difference, Dr. Mimi.',
    'Prescription: a snack and a little self-kindness.', 'Your kindness is part of the treatment.',
    'A little rest is part of the treatment.', 'So proud of you. Always.',
    'Doctor’s orders: take a tiny tea break.', 'One day closer to your next chapter.'];
  const activities = ['jump','wave','heartbeat','notes','read','eat','tea','stretch','nap','celebrate'];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let activity = 'rest', index = 0, messageIndex = 0, started = performance.now();
  let timer, frame, active = true, finished = false, milestone = null;
  message.textContent = messages[0];
  const ink = '#886a76', cream = '#fff9ee', pink = '#f3c0cf', lavender = '#e1dcec';
  function ellipse(x,y,rx,ry,fill,stroke=ink) {
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2.5;ctx.stroke();}
  }
  function line(points,color=ink,width=2.5) {
    ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
  }
  function box(x,y,w,h,color,r=5) {
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.stroke();
  }
  function heart(x,y,size) {
    ctx.save();ctx.translate(x,y);ctx.scale(size,size);ctx.beginPath();ctx.moveTo(0,4);
    ctx.bezierCurveTo(-20,-8,-9,-20,0,-10);ctx.bezierCurveTo(9,-20,20,-8,0,4);
    ctx.fillStyle='#cf92aa';ctx.fill();ctx.restore();
  }
  // Original website SVG paths, separated so the bunny can act and emote.
  function shape(d, fill, stroke=ink, width=2.5) {
    const path=new Path2D(d);if(fill){ctx.fillStyle=fill;ctx.fill(path);}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(path);}
  }
  function text(value,x,y,size=13) {ctx.fillStyle=ink;ctx.font=`${size}px Georgia`;ctx.fillText(value,x,y);}
  function draw(now=performance.now()) {
    frame = undefined;
    const t = motion.matches ? 0 : (now-started)/1000;
    const wiggle = Math.sin(t*5), slow = Math.sin(t*2);
    ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,180,220);ctx.translate(0,14);
    ellipse(90,185,58,7,'#e8d9e7',null);
    ctx.save();
    if(activity==='jump'||activity==='celebrate') ctx.translate(0,-Math.abs(wiggle)*11);
    if(activity==='nap') {ctx.translate(4,3+slow);ctx.translate(90,110);ctx.rotate(-0.12);ctx.translate(-90,-110);}
    if(activity==='rest') ctx.translate(0,slow*.8);
    ctx.save();ctx.translate(90,65);ctx.rotate(motion.matches?0:slow*.018);ctx.translate(-90,-65);
    shape('M49 70C25 9 49-6 65 14L77 65M102 64L117 15C132-8 153 10 130 72',cream);
    shape('M53 53C41 19 50 12 57 24L67 56M113 55L124 24C132 10 141 20 128 57',null,'#efbfd0',9);
    ctx.restore();
    ellipse(66,174,18,10,cream);ellipse(115,174,18,10,cream);
    const raised = activity==='stretch'||activity==='celebrate';
    ellipse(43,raised?97+slow*5:136,12,22,cream);
    ellipse(137,raised?95+slow*5:activity==='wave'?107+wiggle*7:136,12,22,cream);
    shape('M57 116Q40 132 46 178Q91 190 135 178Q139 136 123 115','#fff');
    ctx.beginPath();ctx.moveTo(71,113);ctx.lineTo(109,113);ctx.lineTo(90,143);ctx.closePath();ctx.fillStyle=lavender;ctx.fill();
    line([[67,119],[64,138],[77,144],[69,151],[84,170]],'#d8c9d4',2);
    line([[113,119],[116,138],[104,144],[112,151],[96,170]],'#d8c9d4',2);
    line([[90,145],[90,171]],'#d8c9d4',1.5);
    shape('M42 89C42 59 63 51 89 55C118 49 143 63 140 91C141 116 120 128 91 129C61 129 41 115 42 89Z',cream);
    ellipse(59,103,10,6,pink,null);ellipse(123,103,10,6,pink,null);
    shape('M128 67C113 57 127 49 132 57C140 49 150 61 128 67','#cf92aa',null);
    const closed=activity==='nap'||(activity==='rest'&&t%5>4.8);
    if(closed){line([[61,88],[65,91],[69,88]],ink,2);line([[111,88],[115,91],[119,88]],ink,2);}
    else {line([[65,88],[65,93]],'#655460',4);line([[115,88],[115,93]],'#655460',4);}
    shape('M85 99Q90 104 95 99M90 104V109M90 109Q85 113 81 108M90 109Q95 113 99 108',null,ink,2);
    // A stethoscope stays on the coat, with its chestpiece lifted for the exam.
    line([[70,118],[70,137],[75,144],[83,144],[88,137],[88,124]],'#87768d',3);
    line([[114,120],[114,activity==='heartbeat'?133:148]],'#87768d',3);
    ellipse(114,activity==='heartbeat'?135:153,6,6,'#dbc8e4');
    if(activity==='heartbeat'){ellipse(124,139,11,8,cream);heart(151,65,1+(wiggle*.12));line([[137,87],[143,87],[146,81],[150,94],[154,87],[163,87]],'#bd678d',1.5);}
    if(activity==='notes') {box(82,133,38,43,'#faf4e8');box(93,130,16,6,'#dbc8e4',2);for(let y=146;y<168;y+=7)line([[89,y],[110,y]],'#baa4b5',1);line([[119+wiggle*2,141],[105+wiggle*2,159]],'#bd678d',4);ellipse(126,143,9,7,cream);}
    if(activity==='read') {box(62,139,58,36,lavender);line([[91,140],[91,174]],ink,2);for(let y=148;y<168;y+=7){line([[68,y],[85,y]],'#b2a3c1',1);line([[98,y],[114,y]],'#b2a3c1',1);}text('+',102,153,15);line([[91,141],[91+Math.abs(slow)*17,144],[91+Math.abs(slow)*17,170],[91,174]],'#b2a3c1',1);ellipse(61,155,8,10,cream);ellipse(124,155,8,10,cream);}
    if(activity==='eat'){ellipse(90,110,3,1.5+Math.abs(wiggle)*2,ink,null);const y=116+slow*4;ellipse(110,y,15,14,'#dfba77');for(const [x,dy] of [[104,-4],[113,3],[108,8]])ellipse(x,y+dy,2,2,ink,null);ellipse(121,y+4,9,7,cream);ellipse(120,y-9,5,5,'#fff9ee',null);}
    if(activity==='tea'){const y=132+slow*3;ellipse(116,y+12,10,10,'#fff',ink);box(76,y,39,28,'#efbfd0',7);ellipse(76,y+16,8,9,cream);ellipse(112,y+16,8,9,cream);line([[88,y-4],[85+slow*2,y-11],[89,y-18]],'#baa4b5',1.5);}
    if(activity==='stretch'){line([[27,84],[23,78]],'#cf92aa',2);line([[149,82],[155,75]],'#cf92aa',2);}
    if(activity==='nap'){text('Z',138,49+slow*2,17);text('z',151,35+slow*3,12);}
    if(activity==='celebrate'){heart(33,65,.7);heart(147,57,.8);for(let i=0;i<5;i++){ctx.fillStyle=i%2?pink:lavender;ctx.fillRect(20+i*34,22+(i%2)*9+slow*3,4,7);}}
    ctx.restore();
    if(!motion.matches && active && !document.hidden) frame=requestAnimationFrame(draw);
  }
  function setActivity(next){activity=next;button.dataset.activity=next;started=performance.now();if(frame)cancelAnimationFrame(frame);draw();}
  function schedule(delay=7000){clearTimeout(timer);if(active&&!document.hidden)timer=setTimeout(advance,delay);}
  // Taps and automatic activities share a cursor, so a tap always moves forward.
  function nextActivity(){
    let next=activities[index++%activities.length];
    if(next===activity) next=activities[index++%activities.length];
    return next;
  }
  function advance(){
    if(activity==='rest'){
      setActivity(finished?'celebrate':nextActivity());
      if(!finished&&index%3===0){message.textContent=messages[++messageIndex%messages.length];}
      schedule(5500);
    } else {setActivity('rest');schedule(8500);}
  }
  button.addEventListener('click',()=>{
    message.textContent=finished?'You did it, Dr. Mimi. So proud of you!':messages[++messageIndex%messages.length];
    live.textContent=message.textContent;setActivity(nextActivity());schedule(5500);
  });
  function visibility(){
    clearTimeout(timer);if(frame)cancelAnimationFrame(frame);
    if(active&&!document.hidden){setActivity('rest');schedule();}
  }
  document.addEventListener('visibilitychange',visibility);
  window.addEventListener('bunny-app-active',event=>{active=event.detail;visibility();});
  motion.addEventListener('change',()=>{if(frame)cancelAnimationFrame(frame);draw();});
  const countdown=document.getElementById('countdown');
  function checkMilestone(){
    if(countdown.hidden && !document.getElementById('celebration').hidden && !finished){
      finished=true;const art=document.querySelector('.celebration-art');art.querySelector('img')?.remove();
      art.prepend(button);button.after(live);art.after(message);message.textContent='You did it, Dr. Mimi. So proud of you!';setActivity('celebrate');schedule(5500);
    } else if(!finished&&[100,30,7,1].includes(Number(document.getElementById('total-days').textContent))&&milestone!==Number(document.getElementById('total-days').textContent)){
      milestone=Number(document.getElementById('total-days').textContent);message.textContent='Another beautiful milestone, Dr. Mimi!';setActivity('celebrate');schedule(5500);
    }
  }
  new MutationObserver(checkMilestone).observe(countdown,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true});
  setActivity('rest');schedule();checkMilestone();
})();
