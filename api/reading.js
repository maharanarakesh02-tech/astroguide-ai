export default async function handler(req,res){
res.setHeader("Access-Control-Allow-Methods","POST,OPTIONS");if(req.method==="OPTIONS")return res.status(200).end();if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
const {name="",dob="",time="",location="",topic="Personal growth"}=req.body||{};
if(!name.trim()||!dob||!time||!location.trim())return res.status(400).json({error:"Name, date, time and birthplace are required"});
const date=new Date(dob+"T00:00:00");if(Number.isNaN(date.getTime()))return res.status(400).json({error:"Please enter a valid date"});
const day=date.getDate(), month=date.getMonth()+1, hour=Number(time.slice(0,2));const key=(day+month+hour+name.trim().length+location.trim().length)%6;
const topicMap={
"Career & purpose":["Your pattern suggests you may do better with independence, practical goals and steady skill-building than with waiting for one perfect opportunity.","This is a useful time to turn a broad ambition into one measurable project. Consistency can become your advantage."],
"Love & relationships":["Your reflection points toward clearer boundaries and honest communication. Give relationships room to grow without ignoring what repeatedly feels important.","You may benefit from slowing down emotional decisions and noticing whether actions match promises over time."],
"Personal growth":["Your strongest progress may come from reducing mental noise and building one routine that supports the person you want to become.","The theme around you is self-trust: collect evidence through small actions instead of depending only on motivation."]
};
const general=["The energy of your entered birth details emphasizes patience before major decisions.","Your current reflection theme favors focus: fewer priorities, deeper effort.","A repeating lesson for you may be learning when to act and when to observe.","Momentum can build quickly once you stop changing direction too often.","Your next chapter benefits from structure, but leave space for intuition.","Progress is more likely through steady repetition than dramatic changes."];
const signNames=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];const zodiac=signNames[Math.floor((month%12))];
const choices=topicMap[topic]||topicMap["Personal growth"];
const reading=name.trim()+", based on the birth details you entered, your "+topic.toLowerCase()+" reading is: "+choices[key%choices.length]+" "+general[key];
res.status(200).json({reading,birthSummary:"Birth details used: "+dob+" • "+time+" • "+location.trim()+" • Zodiac reflection: "+zodiac,disclaimer:"For entertainment and personal reflection only. Not a scientific birth-chart calculation."});
}