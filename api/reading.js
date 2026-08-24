export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
 const {name="friend",topic="Personal growth"}=req.body||{};
 const seed=(name.length*7+topic.length*11)%4;
 const messages=[
 "Your next step becomes clearer when you stop waiting for perfect certainty. Choose one small action and repeat it consistently.",
 "A period of reflection is useful now. Notice recurring opportunities, then commit to the one that aligns with your values.",
 "Your strongest progress comes from patience and structure. Simplify your priorities before taking on something new.",
 "Focus on what you can influence today. Consistent effort and honest self-reflection can reveal your next direction."
 ];
 res.status(200).json({reading:name+", "+messages[seed],disclaimer:"For entertainment and personal reflection only."});
}