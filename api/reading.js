export default async function handler(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Methods","POST,OPTIONS");
res.setHeader("Access-Control-Allow-Headers","Content-Type");
if(req.method==="OPTIONS")return res.status(204).end();
if(req.method!=="POST")return res.status(405).json({error:"Use POST to generate a reading"});
try{
const {name="",dob="",time="",location="",topic="Personal growth"}=req.body||{};
if(!name.trim()||!dob||!time||!location.trim())return res.status(400).json({error:"Please enter name, date of birth, birth time and birthplace."});
const d=new Date(dob+"T"+time+":00");if(Number.isNaN(d.getTime()))return res.status(400).json({error:"Invalid birth date or time."});
const signs=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const planets=["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"];
const seed=(d.getUTCFullYear()+d.getUTCMonth()*31+d.getUTCDate()*17+d.getUTCHours()*13+location.trim().length*7+name.trim().length)%360;
const data=planets.map((name,i)=>{const lon=(seed+i*47+i*i*11)%360;return {name,longitude:+lon.toFixed(2),sign:signs[Math.floor(lon/30)],degree:+(lon%30).toFixed(2)}});
const sun=data[0],moon=data[1];
const topicText=topic.startsWith("Career")?"Career growth benefits from focus, practical planning and consistent work.":topic.startsWith("Love")?"Relationships benefit from direct communication, patience and clear boundaries.":"Personal growth benefits from simplifying priorities and following through on small commitments.";
return res.status(200).json({ok:true,chart:{birthDate:dob,birthTime:time,birthPlace:location.trim(),planets:data},reading:name.trim()+", this personalized reflection is based on the birth details and focus you selected. Your calculated profile in this starter engine places the Sun in "+sun.sign+" and Moon in "+moon.sign+". "+topicText,systems:[{name:"Birth data profile",insight:"Uses the date, time and birthplace you entered to create a consistent personalized result."},{name:"Traditional interpretation layer",insight:"Vedic, Lal Kitab and other traditions can be added as clearly labeled rule modules."}],disclaimer:"Traditional/belief-based reflection. This current free starter engine is not a validated ephemeris-grade kundli calculator."});
}catch(e){return res.status(500).json({error:"Server error while generating the reading."})}
}