'use strict';
const storageKey = 'kl-weekend-2026-v1';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { saved = {}; }
if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { toast('当前浏览器无法保存记录，但仍可正常查看攻略。'); } };
const $ = s => document.querySelector(s);
let toastTimer;
function toast(message){ $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000); }
const days={
fri:{title:'周五 · 抵达就好，其他留给明天。',subtitle:'11 月 13 日 — 14 日凌晨 / KUL T1 → 武吉免登',events:[
['23:00','抵达吉隆坡 T1','下机、入境、取行李预留约 60—90 分钟。提前准备移动网络、酒店英文名和订单。','highlight'],
['次日\n00:15','Grab 前往酒店','机场到酒店约 58 公里，车程留 60—75 分钟。预算 RM80—120 / 车，按 App 指引找 T1 上车点；你的接送不默认与同行者合并。'],
['01:00\n—02:00','办理入住，尽快休息','这里是 11 月 14 日凌晨。房间必须从 13 日起订，并提前确认保留。同行者先到或后到，都按酒店确认的手续办理。','highlight']
]},
sat:{title:'周六 · 白天看城市，晚上听现场。',subtitle:'11 月 14 日 / KLCC → 酒店午休 → 3 Damansara',events:[
['09:30','早餐，慢慢醒来','酒店或附近简单吃。前一晚凌晨才到，不安排清晨赶景点。'],
['10:15','去 KLCC，看看双子塔','Grab 前往，约 10:45 开始游览外景与公园。想登塔可提前选约 11:00 时段，提早 15 分钟报到；外景免费。', '', 'https://www.petronastwintowers.com.my/plan-your-visit/admission-ticketing/','双子塔官方预约','改为 Suria KLCC 室内活动，户外拍照等雨小时再去。已订登塔票的，按预约时间和官方开放情况参加。'],
['12:15','Madam Kwan’s 椰浆饭','在 Suria KLCC 吃午饭，约 RM40—65 / 人。一个人一份主食即可，不默认同行者已经到达。'],
['14:00\n—15:30','回酒店午休','放下购物袋，给手机充电，留足看演出的体力。','highlight'],
['16:45','出发去 Idea Live Arena','MRT Kajang Line 往 Kwasa Damansara，到 TTDI 后步行约 14 分钟。全程留 60—75 分钟；场馆在 3 Damansara 商场 Level 2。','','','','下雨改为约 16:15—16:30 提前动身；查看叫车和路况，Grab 直达商场，减少雨中步行。'],
['17:45','在商场提前吃晚餐','Ah Cheng Laksa，LG-42。亚参叻沙或咖喱叻沙，约 RM20—35 / 人。18:30—19:00 前往场馆安检、找座位。'],
['20:00','李志／叁缺壹 · 座席演出','用 Fantopia 正式电子票入场，截图／图片不被接受。开门、禁带物和座位以当场次最新通知为准。','concert','https://www.fantopia.io/shows/malaysia/li-laoshi-return-event.html','查看本场入场须知'],
['散场后','Grab 回酒店','散场时间未确定。另留 20—40 分钟等车和疏散，预算 RM40—70 / 车。阿罗街夜宵看营业与体力，不安排必须完成的夜景。']
]},
sun:{title:'周日 · 老城走一走，准时去机场。',subtitle:'11 月 15 日 / 独立广场 → 中央市场 → 茨厂街 → T1',events:[
['08:30','整理行李，按约定退房或寄存','你先收好行李。若同行者仍要用房间，约好酒店规定退房时间内由谁办理，避免提前退掉整间房；退房后可问酒店寄存行李。'],
['09:00','旧邮政总局吃南洋早餐','Oriental Kopi：咖椰吐司、半熟蛋、咖啡或拉茶，约 RM20—35 / 人。排队超过 15—20 分钟就换店。'],
['09:40','独立广场与历史建筑','苏丹阿都沙末大厦、河流交汇处，按外景安排，不把清真寺内部参观设为硬任务。','','','','缩短广场和河边停留，天气允许时快速拍照，10:00 后转去室内中央市场。'],
['10:20','中央市场 → 茨厂街 → 鬼仔巷','中央市场 10:00 开门。约 10:50 去老街与壁画区，顺路买 Beryl’s 巧克力，小件即可。','','','','以中央市场室内逛街为主；持续降雨就跳过鬼仔巷，提前回酒店，不再添加其他景点。'],
['11:35','回酒店取行李','目标 12:15 左右准备出发。购物和排队都让位于返程，午餐可留到机场。','highlight'],
['12:15\n—12:30','出发前往机场','Grab 到 KL Sentral，争取 13:00 前后搭机场铁路。候车与车程合计留 60 分钟；或约 12:30 直接 Grab 去 T1。','','https://www.kliaekspres.com/products-fares/klia-ekspres','核对机场铁路'],
['14:00\n—14:15','到达 T1，值机／托运','按国际航班预留约 3 小时。同行者的离开时间不改变你的机场时间。','highlight'],
['17:25','你的航班起飞','按登机牌规定提前到登机口。旅途结束，音乐留在记忆里。']
]}};
let activeDay = ['fri','sat','sun'].includes(saved.day) ? saved.day : 'sat';
let rainMode = saved.rain === true;
function renderDays(){
 const panels=$('#day-panels'); panels.replaceChildren();
 Object.entries(days).forEach(([id,day])=>{
  const panel=document.createElement('section'); panel.id='day-'+id; panel.className='day-panel'; panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby','tab-'+id); panel.hidden=id!==activeDay;
  const title=document.createElement('h3');title.className='day-title';title.textContent=day.title;
  const sub=document.createElement('p');sub.className='day-subtitle';sub.textContent=day.subtitle;panel.append(title,sub);
  day.events.forEach(([time,name,detail,kind,url,linkText,rain])=>{const row=document.createElement('article');row.className='timeline-row '+(kind==='concert'?'highlight concert':kind||'');const t=document.createElement('div');t.className='timeline-time';t.style.whiteSpace='pre-line';t.textContent=rainMode&&id==='sat'&&time==='16:45'?'16:15\n—16:30':time;const body=document.createElement('div');body.className='timeline-content';const h=document.createElement('h4');h.textContent=name;const p=document.createElement('p');p.textContent=rainMode&&rain?rain:detail;body.append(h,p);if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent=linkText+' ↗';body.append(a);}row.append(t,body);panel.append(row);});
  panels.append(panel);
 });
 document.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.day===activeDay)));
 $('#rain-mode').checked=rainMode;$('#weather-note').hidden=!rainMode;
}
document.querySelectorAll('[data-day]').forEach(b=>{b.addEventListener('click',()=>{activeDay=b.dataset.day;saved.day=activeDay;save();renderDays();});b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const all=[...document.querySelectorAll('[data-day]')];let n=all.indexOf(b);n=e.key==='Home'?0:e.key==='End'?2:(n+(e.key==='ArrowRight'?1:2))%3;all[n].click();all[n].focus();});});
$('#rain-mode').addEventListener('change',e=>{rainMode=e.target.checked;saved.rain=rainMode;save();renderDays();});renderDays();
$('#print-guide').addEventListener('click',()=>window.print());
$('#copy-hotel-note').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#hotel-note').textContent);toast('英文入住备注已复制');}catch{$('.memo-details').open=true;toast('请在展开的英文备注中选择并复制。');}});

const checklist=[
['twin','订对两晚和双床房','11/13 入住、11/15 退房，2 位成人、1 间 Twin。订单确认两张单人床、全部税费和取消条款。'],
['arrival','确认分开入住与凌晨保留','登记两位护照英文姓名，核实先到者的证件、担保卡和押金，后到者的登记与房卡安排。'],
['ticket','检查 Fantopia 电子票','本场不接受截图／图片票。提前登录，检查座位信息；同行者是否看演出需另行确认。'],
['entry','准备护照、酒店和返程凭证','若持中国普通护照，核对免签条件与至少 6 个月有效期；其他护照按各自适用要求确认。'],
['mdac','每人按各自抵达日填写 MDAC','如需提交，应在抵达前 3 天内办理。你的日期可在 11/11—13 填写；同行者不能直接照抄你的抵达日期。'],
['network','准备移动网络、Grab 和支付','带可境外使用的银行卡及少量令吉现金。机场接送分开安排，实际同车时才考虑分摊。'],
['bag','小包、鞋、雨具和转换插头','带好走的鞋、薄外套、英标 Type G 插头。雨伞、充电宝等能否入场，查看本场最终规则。'],
['airport','保存返程时间和正确航站楼','你的航班 11/15 17:25 从 T1 起飞，目标 14:00—14:15 到机场。不要为了等同行者延后。']
];
if(!Array.isArray(saved.checked))saved.checked=[];
checklist.forEach(([id,title,detail])=>{const label=document.createElement('label');label.className='check-item';const input=document.createElement('input');input.type='checkbox';input.checked=saved.checked.includes(id);input.dataset.check=id;const span=document.createElement('span');const strong=document.createElement('strong');strong.textContent=title;const p=document.createElement('p');p.textContent=detail;span.append(strong,p);label.append(input,span);$('#checklist-items').append(label);input.addEventListener('change',()=>{saved.checked=[...document.querySelectorAll('[data-check]:checked')].map(i=>i.dataset.check);save();updateChecks();});});
function updateChecks(){const checked=[...document.querySelectorAll('[data-check]:checked')];$('#check-progress').textContent=`${checked.length} / ${checklist.length} 项已完成`;$('#check-progress-bar').style.width=(checked.length/checklist.length*100)+'%';$('.progress-track').setAttribute('aria-valuenow',String(checked.length));document.querySelectorAll('.check-item').forEach(l=>l.classList.toggle('checked',l.querySelector('input').checked));}updateChecks();

const friend=saved.friend&&typeof saved.friend==='object'?saved.friend:{};
$('#friend-arrival').value=friend.arrival||'';$('#friend-departure').value=friend.departure||'';$('#friend-note').value=typeof friend.note==='string'?friend.note:'';
function fmtDate(value){if(!value)return'待补充';const [date,time]=value.split('T');const parts=date.split('-');return`${Number(parts[1])} 月 ${Number(parts[2])} 日 ${time}`;}
function friendSummary(){const a=$('#friend-arrival').value,d=$('#friend-departure').value,n=$('#friend-note').value.trim();if(!a&&!d&&!n){$('#companion-summary').textContent='同行者抵离时间待补充。机场接送各自安排。';return;}let text=`同行者抵达：${fmtDate(a)}\n同行者离开：${fmtDate(d)}`;if(n)text+='\n碰面备注：'+n;if((a&&a<'2026-11-13T00:00')||(d&&d>'2026-11-15T23:59'))text+='\n日期超出本攻略两晚范围，请另外确认住宿。';$('#companion-summary').textContent=text;}
$('#companion-form').addEventListener('submit',e=>{e.preventDefault();const arrival=$('#friend-arrival').value,departure=$('#friend-departure').value;if(arrival&&departure&&departure<=arrival){toast('同行者的离开时间应晚于抵达时间。');return;}saved.friend={arrival,departure,note:$('#friend-note').value.trim()};save();friendSummary();toast('同行安排已保存在当前浏览器');});
$('#clear-companion').addEventListener('click',()=>{$('#companion-form').reset();saved.friend={};save();friendSummary();toast('同行记录已清空，你的主行程未变');});friendSummary();
if(Number.isFinite(saved.roomPrice)&&saved.roomPrice>=0&&saved.roomPrice<=1000)$('#room-price').value=saved.roomPrice;$('#split-room').checked=saved.splitRoom===true;
function budget(){const input=$('#room-price');const amount=Number(input.value);if(input.value===''||!Number.isFinite(amount)||amount<0||amount>1000){$('#room-total').textContent='请输入 ¥0—1,000 内的每晚含税价';return;}const total=amount*2;const split=$('#split-room').checked;$('#room-total').textContent=split?`两晚每人约 ¥${(total/2).toLocaleString('zh-CN')} · 整间 ¥${total.toLocaleString('zh-CN')}`:`两晚整间房 ¥${total.toLocaleString('zh-CN')}`;saved.roomPrice=amount;saved.splitRoom=split;}
['room-price','split-room'].forEach(id=>$('#'+id).addEventListener('input',()=>{budget();save();}));budget();

const locations=[{id:'airport',letter:'A',name:'KUL / KLIA Terminal 1',note:'你的抵达与返程航站楼',lat:2.75427,lng:101.70466,kind:'airport'},{id:'hotel',letter:'H',name:'PARKROYAL COLLECTION',note:'首选 · Urban Deluxe Twin · 尚未预订',lat:3.1442552,lng:101.7122553,kind:'hotel'},{id:'venue',letter:'V',name:'Idea Live Arena',note:'3 Damansara 商场 Level 2 · 11/14 20:00',lat:3.1304926,lng:101.6269413,kind:'venue'},{id:'capri',letter:'C',name:'Capri by Fraser Bukit Bintang',note:'双床备选 · 尚未预订',lat:3.1465123,lng:101.7152983,kind:'backup'}];
let tripMap;const markers={};let mapLoadTimer;let tiles;let onlineLoaded=false;
function localMap(message){clearTimeout(mapLoadTimer);if(tripMap){tripMap.remove();tripMap=null;}onlineLoaded=false;$('#map-fallback').hidden=false;$('#trip-map').hidden=true;$('#map-views').hidden=true;$('#map-legend').hidden=true;$('#load-online-map').hidden=false;$('#show-local-map').hidden=true;$('#map-status').textContent=message||'已显示本地位置图。可复制下方地标信息，在地图或打车 App 内搜索。';}
function showMapView(mode){document.querySelectorAll('[data-mapview]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapview===mode)));if(!tripMap)return;const selected=mode==='hotels'?locations.filter(p=>['hotel','capri'].includes(p.id)):mode==='city'?locations.filter(p=>p.id!=='airport'):locations;tripMap.fitBounds(selected.map(p=>[p.lat,p.lng]),{padding:[50,55],maxZoom:mode==='hotels'?16:mode==='city'?12:10,animate:false});}
function initMap(){if(!window.L){localMap('在线地图组件不可用，已保留本地位置图。');return;}if(tripMap)return;$('#trip-map').hidden=false;$('#show-local-map').hidden=false;$('#load-online-map').hidden=true;$('#map-status').textContent='正在连接在线底图；本地位置图会一直保留到地图加载成功。';tripMap=L.map('trip-map',{scrollWheelZoom:false,zoomControl:true});tiles=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'});mapLoadTimer=setTimeout(()=>{if(!onlineLoaded)localMap('在线底图连接超时，已保留本地位置图。你仍可查看行程、距离并复制地标。');},7000);tiles.on('tileload',()=>{if(!tripMap)return;onlineLoaded=true;clearTimeout(mapLoadTimer);$('#map-fallback').hidden=true;$('#map-views').hidden=false;$('#map-legend').hidden=false;$('#map-status').textContent='在线地图已加载；网络不佳时可随时返回本地位置图。';});tiles.addTo(tripMap);locations.forEach(p=>{const icon=L.divIcon({className:'travel-map-marker',html:`<span class="map-pin ${p.kind}">${p.letter}</span>`,iconSize:[32,32],iconAnchor:[16,16]});markers[p.id]=L.marker([p.lat,p.lng],{icon,title:p.name,alt:p.name}).addTo(tripMap).bindPopup(`<strong>${p.name}</strong><br>${p.note}<br><a target="_blank" rel="noopener" href="https://maps.apple.com/place?coordinate=${p.lat},${p.lng}&name=${encodeURIComponent(p.name)}">Apple 地图 ↗</a>`);});showMapView('all');}
$('#load-online-map').addEventListener('click',initMap);$('#show-local-map').addEventListener('click',()=>localMap());new ResizeObserver(()=>{if(tripMap)tripMap.invalidateSize();}).observe($('#trip-map'));
document.querySelectorAll('[data-mapview]').forEach(b=>b.addEventListener('click',()=>showMapView(b.dataset.mapview)));
document.querySelectorAll('[data-locate]').forEach(b=>b.addEventListener('click',()=>{const target=tripMap?$('#map-section'):$('#location-'+b.dataset.locate);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});if(tripMap){showMapView('hotels');markers[b.dataset.locate].openPopup();}else toast('可复制酒店名称和坐标，在地图 App 中查看。');}));
document.querySelectorAll('[data-copy-place]').forEach(b=>b.addEventListener('click',async()=>{const el=$('#copy-'+b.dataset.copyPlace);try{await navigator.clipboard.writeText(el.innerText);toast('地标名称和坐标已复制');}catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(el);selection.removeAllRanges();selection.addRange(range);toast('已选中地标信息，请长按或使用复制。');}}));
