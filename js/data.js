const DEFAULT_IMAGE = "images/15.jpg";

const THEMES = {
    default: { text: 'text-cyan-400', hover: 'hover:border-cyan-400 hover:text-cyan-300 border-cyan-900/50 hover:bg-cyan-950/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' },
    danger: { text: 'text-red-500', hover: 'hover:border-red-500 hover:text-red-400 border-red-900/50 hover:bg-red-950/80 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]' },
    hack: { text: 'text-green-400', hover: 'hover:border-green-400 hover:text-green-300 border-green-900/50 hover:bg-green-950/80 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)]' },
    badEnd: { text: 'text-red-600' },
    goodEnd: { text: 'text-green-500' },
    normalEnd: { text: 'text-yellow-500' }
};

const STORY_DATA = {
    "N1": {
        title: "Poisoned City Breakout",
        image: "images/01.jpg",
        text: "Your name is Kay. 28 years old, ex-soldier. You live in a dirty garage with a stray dog. You suffer from severe PTSD.\n\nBy day, you are a nobody. By night, you drive a rideshare car to hunt criminals the police ignore.\n\nIt is raining hard tonight. Time to work.",
        choices: [{ text: "Hit the gas. Drive into the rain.", next: "N2" }]
    },
    "N2": {
        title: "The Mobile Armory",
        image: "images/02.jpg",
        text: "Your car is your only safe place. It looks like a normal black car, but it is built like a tank. It has bulletproof doors and hidden weapons.\n\nYou drive through the city, watching crimes happen in the dark alleys. High above, a giant hologram shows Julian, a billionaire CEO.\n\nYou live in different worlds. But tonight, that changes.",
        choices: [{ text: "Keep patrolling. Wait for the prey.", next: "N3" }]
    },
    "N3": {
        title: "The Bleeding Prey",
        image: "images/09.jpg",
        text: "3 AM. Heavy rain. A terrified man in a wet suit crashes into your car.\n\n'Drive! To the airport! Don't stop!' he shouts. On the bridge, he panics. 'They're here!' he screams. He opens the door and jumps out into the storm.\n\nYou stop the car. On the back seat, you find a military hard drive. It is covered in fresh blood.",
        theme: "danger",
        choices: [{ text: "Not my problem. Ditch the drive and leave.", next: "N144" }, { text: "Hide the drive. I need to know what's on it.", next: "N5" }]
    },
    "N144": {
        title: "Plausible Deniability",
        image: "images/11.jpg",
        text: "You don't want trouble. You leave the bloody drive on the seat. You plan to melt back into the shadows.",
        choices: [{ text: "Roll up the window. Prepare to leave.", next: "N_q1" }]
    },
    "N_q1": {
        title: "Watching from the Shadows",
        image: "images/12.jpg",
        text: "As you back up, bright lights blind you. Black SUVs block the bridge. Julian's private armed men jump out.",
        theme: "danger",
        choices: [{ text: "Stay hidden. Observe.", next: "N145" }]
    },
    "N145": {
        title: "The Cleanup Crew",
        image: "images/12.jpg",
        text: "You hide in your car. You watch the armed men take the drive. They corner the man on the bridge. A gun is pointed at his head. They are going to kill him.",
        theme: "danger",
        choices: [{ text: "Forget my code. Close my eyes and drive away.", next: "N4" }, { text: "To hell with the rules. Draw my Glock and ambush them.", next: "N149" }]
    },
    "N4": {
        title: "Look Away",
        image: "images/13.jpg",
        text: "You ignore the gunshot. You drive home. The man is dead.\n\nYou try to forget, but you keep seeing his bloody face. The mystery of the drive haunts you.",
        choices: [
            { text: "Drink until the memory fades. Pretend it never happened.", next: "N6" },
            { text: "I need to know what was on it. Return to the bridge.", next: "N4_return" }
        ]
    },
    "N4_return": {
        title: "One Last Chance",
        image: "images/14.jpg",
        text: "You drive back to the bridge. The killers are searching the area. They don't know the drive fell near the edge. Its red light is blinking. You have maybe 30 seconds before they see it.",
        theme: "hack",
        choices: [{ text: "Pull over. Move fast. One shot at this.", next: "N5" }]
    },
    "N6": {
        title: "The Collapse",
        image: "images/15.jpg",
        text: "Days later, news reports show a toxic water leak in the slums. Children are dying. You realize what the drive was. Guilt crushes you. You take out your gun.",
        theme: "danger", effect: "shake",
        choices: [{ text: "The shot echoes in the garage.", next: "N_u4" }]
    },
    "N149": {
        title: "Tactical Assault",
        image: "images/12.jpg",
        text: "You kick the door open. You use the rain to hide. You attack the armed men by surprise. The smell of gunpowder fills the air.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Empty the magazine.", next: "N152" }]
    },
    "N152": {
        title: "Battle on the Bridge",
        image: "images/12.jpg",
        text: "The fight is brief but bloody. You kill the men, but the man in the suit dies in the crossfire. You take the bloody drive.",
        theme: "danger",
        choices: [{ text: "Take the drive and get out of here.", next: "N7" }]
    },
    "N5": {
        title: "Into the Maelstrom",
        image: "images/10.jpg",
        text: "You take the blood-stained drive. Your gut tells you it's dangerous, but you need to know what is worth killing for tonight.",
        choices: [{ text: "Drive to a secure location.", next: "N7" }]
    },
    "N7": {
        title: "The Decryption",
        image: "images/16.jpg",
        text: "You hide in an old shelter. You plug the drive into your computer. After some work, you break the firewall.",
        theme: "hack",
        choices: [{ text: "Access the decrypted files.", next: "N8" }]
    },
    "N8": {
        title: "Staring into the Abyss",
        image: "images/16.jpg",
        text: "The truth is shocking. The billionaire Julian is poisoning the water supply. He wants to kill poor people to build new business areas.\n\nSuddenly, an alarm rings. You triggered a trap. Julian's men know your location!",
        theme: "danger", effect: "shake",
        choices: [{ text: "Copy the data, smash the drive, and fight my way out.", next: "N9" }, { text: "The car is a target. Grab the drive and run.", next: "N10" }]
    },
    "N9": {
        title: "Full Throttle Escape",
        image: "images/02.jpg",
        text: "You smash the original drive, take a copy, and jump in your car. You speed out of the shelter.",
        effect: "shake",
        choices: [{ text: "Check the rearview mirror.", next: "N11" }]
    },
    "N11": {
        title: "Death on Your Tail",
        image: "images/02.jpg",
        text: "Julian controls the city cameras. Three armored SUVs are right behind you on the highway.",
        theme: "danger",
        choices: [{ text: "Prepare to engage.", next: "N_q5" }]
    },
    "N_q5": {
        title: "Highway War",
        image: "images/02.jpg",
        text: "You use your car's weapons to destroy two SUVs. But now you have no ammo. Your car is smoking. Soldiers surround you.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Out of options. Surrender.", next: "N_q11" }, { text: "I'll never surrender. Hit the self-destruct button.", next: "N_q12" }]
    },
    "N_q11": {
        title: "Cornered",
        image: "images/20.jpg",
        text: "You kick the door open and raise your hands. Soldiers throw you to the ground and handcuff you.",
        choices: [{ text: "Negotiate with the commander.", next: "N_w8" }]
    },
    "N_w8": {
        title: "The Bluff",
        image: "images/20.jpg",
        text: "'I set up a dead man's switch,' you lie. 'If you kill me, the data goes to the FBI.' The commander pushes you into a van.",
        choices: [{ text: "Inside the transport vehicle...", next: "N_w11" }]
    },
    "N_w11": {
        title: "A Glimmer of Hope",
        image: "images/20.jpg",
        text: "You listen to the guards talking. They mention an old slaughterhouse. The main water valve must be there.",
        choices: [{ text: "Play along. Get taken deep into their territory.", next: "N_w13" }, { text: "This is my chance. Use the lockpick hidden in my sleeve.", next: "N_w12" }]
    },
    "N_w13": {
        title: "Biding Time",
        image: "images/17.jpg",
        text: "You close your eyes and rest. The van takes you into Julian's headquarters.",
        choices: [{ text: "Arriving at HQ...", next: "N_w20" }]
    },
    "N_w20": {
        title: "The Interrogation Chamber",
        image: "images/17.jpg",
        text: "You are tied to a chair in a bright room. Agents put wires on you. They will torture you for the password.",
        theme: "danger",
        choices: [{ text: "Face the torture.", next: "N_u6" }]
    },
    "N_w12": {
        title: "Breaking the Chains",
        image: "images/20.jpg",
        text: "You use a hidden wire to pick the handcuffs. They click open.",
        theme: "hack",
        choices: [{ text: "Prepare to strike.", next: "N_w16" }]
    },
    "N_w16": {
        title: "Uncaged Tiger",
        image: "images/18.jpg",
        text: "You attack the guards, grab a gun, and shoot the driver. The van crashes. You jump out and run toward the old slaughterhouse.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Head to the Old Slaughterhouse.", next: "N_w25" }]
    },
    "N_q12": {
        title: "Detonation",
        image: "images/12.jpg",
        text: "'See you in hell,' you say. You hit the self-destruct button. A massive explosion destroys your car and the soldiers. You are blown into a ditch.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Crawl out of the mud.", next: "N_w3" }]
    },
    "N_w3": {
        title: "The Avenger",
        image: "images/12.jpg",
        text: "You crawl out of the mud. You pick up a dead soldier's rifle. You are done running. It's time to fight back.",
        theme: "danger",
        choices: [{ text: "Return to the city center.", next: "N13" }]
    },
    "N_w25": {
        title: "The Slaughterhouse Bunker",
        image: "images/18.jpg",
        text: "You reach the old slaughterhouse. It smells terrible. The entrance is guarded by heavily armed soldiers and drones.",
        theme: "danger",
        choices: [{ text: "No time. Go in guns blazing.", next: "N_w28" }, { text: "That's suicide. I need to find backup.", next: "N_w27" }]
    },
    "N_w28": {
        title: "One Man Army",
        image: "images/18.jpg",
        text: "You reload your gun and charge at the guards.",
        theme: "danger",
        choices: [{ text: "A desperate charge.", next: "N_u1" }]
    },
    "N_u1": {
        title: "Fallen Hero",
        image: "images/18.jpg",
        text: "You fight hard, but there are too many. A machine gun hits your legs. You fall to the ground.",
        theme: "danger", effect: "shake",
        choices: [{ text: "You close your eyes.", next: "N_u4" }]
    },
    "N_u4": {
        title: "The Buried Truth",
        image: "images/08.jpg",
        text: "Julian hides the truth. Thousands of people die from the poisoned water. Your backup data is erased. Julian wins.",
        theme: "badEnd",
        choices: [{ text: "RESTART LINK", next: "N1" }]
    },
    "N_w27": {
        title: "Finding an Ally",
        image: "images/14.jpg",
        text: "You hide in the shadows. You need help. You remember Harold, the old plant manager. He knows this place.",
        choices: [{ text: "Sneak back into the city.", next: "N_w30" }]
    },
    "N_w30": {
        title: "The Long Walk",
        image: "images/14.jpg",
        text: "You walk along the train tracks in the rain. You head back to the city to find a ride.",
        choices: [{ text: "Arrive at a crosswalk.", next: "N13" }]
    },
    "N_u6": {
        title: "The Arrogance of Power",
        image: "images/05.jpg",
        text: "Julian walks into the room. He looks at you like trash. He demands the password. He doesn't know your hands are free.",
        choices: [{ text: "Lunge at him! Choke the life out of him!", next: "N_u8" }, { text: "Hide the fact that you're free. Play dead.", next: "N_u9" }]
    },
    "N_u8": {
        title: "Mutual Destruction",
        image: "images/05.jpg",
        text: "You jump up and grab his throat. You want to kill him.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Your fingers touch his throat...", next: "N_u10" }]
    },
    "N_u10": {
        title: "A Horrific Price",
        image: "images/05.jpg",
        text: "His guards are too fast. They shock you with a taser. Julian breaks your arms and legs. You are left to die.",
        theme: "danger", effect: "shake",
        choices: [{ text: "You pass out from the pain...", next: "N_u4" }]
    },
    "N_u9": {
        title: "Endurance",
        image: "images/05.jpg",
        text: "You stay still. You let Julian kick you. You act like you are broken.",
        choices: [{ text: "Wait for the right moment.", next: "N_h4" }]
    },
    "N_h4": {
        title: "A Costly Mistake",
        image: "images/06.jpg",
        text: "Julian gets bored. He leaves for his party. Only two guards stay.",
        choices: [{ text: "The moment the door closes...", next: "N_h10" }]
    },
    "N_h10": {
        title: "Counter-Attack",
        image: "images/20.jpg",
        text: "You attack the guards and escape into the server room. You use the drive to get into Julian's system.",
        theme: "hack",
        choices: [{ text: "Short-circuit the power grid to cause an explosion and escape.", next: "N_h14" }, { text: "Use this terminal to contact your ally, Harold.", next: "N_h13" }]
    },
    "N_h14": {
        title: "Trial by Fire",
        image: "images/03.jpg",
        text: "You overload the power. The servers explode. The fire spreads too fast. You are trapped and burn to death.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Burn to ashes.", next: "N_u4" }]
    },
    "N_h13": {
        title: "The Smart Move",
        image: "images/20.jpg",
        text: "You contact Harold. You send him the truth. He is quiet for a long time.",
        theme: "hack",
        choices: [{ text: "Wait for his response.", next: "N_h17" }]
    },
    "N_h17": {
        title: "An Unlikely Ally",
        image: "images/20.jpg",
        text: "'That crazy man...' Harold says. He is angry. He uses an old backdoor to open the doors for you. You can escape.",
        theme: "hack",
        choices: [{ text: "Follow the route and escape the building.", next: "N52" }]
    },
    "N10": {
        title: "Sacrificial Lamb",
        image: "images/02.jpg",
        text: "You take the drive and leave your car. You run into the dark streets.",
        choices: [{ text: "Sprinting through the streets...", next: "N12" }]
    },
    "N12": {
        title: "End of the Line",
        image: "images/04.jpg",
        text: "You run through the slums. Police sirens are everywhere. You stop a cheap rideshare car.",
        choices: [{ text: "Yank the door open.", next: "N13" }]
    },
    "N13": {
        title: "A Fateful Ride",
        image: "images/04.jpg",
        text: "You jump into the car. The driver is Marcus, a tired older man. You throw bloody money at him. 'Drive. Hide me.'\n\nMarcus sees the money. He needs it for his sick sister. He drives away fast.",
        effect: "shake",
        choices: [{ text: "Go to the police. Give the evidence to the feds.", next: "N14" }, { text: "The cops are dirty. Find the old plant manager in the suburbs.", next: "N15" }]
    },
    "N14": {
        title: "Trusting the System",
        image: "images/04.jpg",
        text: "You tell Marcus to drive to the police station. You hope they will help.",
        choices: [{ text: "Hand the drive to the detective.", next: "N16" }]
    },
    "N16": {
        title: "Lamb to the Slaughter",
        image: "images/04.jpg",
        text: "A police officer takes the drive. He puts you in a room. Then you hear him call Julian's men: 'I have them.'",
        theme: "danger",
        choices: [{ text: "Something's wrong.", next: "N_h24" }]
    },
    "N_h24": {
        title: "The Kill Room",
        image: "images/04.jpg",
        text: "You see the cop is wearing a very expensive watch. The police are corrupt. This is a trap.",
        choices: [{ text: "Grab a chair, knock out the cop, and fight our way out.", next: "N_h29" }, { text: "Use the room's blind spot to text Harold for help.", next: "N_h28" }]
    },
    "N_h29": {
        title: "Bloodbath at the Precinct",
        image: "images/12.jpg",
        text: "You attack the cop and take his gun. You and Marcus fight your way out.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Escape into the back alley.", next: "N_h37" }]
    },
    "N_h37": {
        title: "Nowhere to Run",
        image: "images/12.jpg",
        text: "You run into an alley. Swat teams and Julian's men surround you.",
        theme: "danger",
        choices: [{ text: "Find cover.", next: "N_h45" }]
    },
    "N_h45": {
        title: "A Civilian's Sacrifice",
        image: "images/12.jpg",
        text: "Marcus gets shot. He gives you his car keys. 'Save my sister,' he says. He drives his car into the police cars. The explosion blocks them.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Honor his last wish. Escape this city.", next: "N_h47" }, { text: "Stare into the fire. Let the rage consume you.", next: "N_h48" }]
    },
    "N_h47": {
        title: "A Quiet Exit",
        image: "images/02.jpg",
        text: "You run into the sewers. You can't fight them all.",
        choices: [{ text: "Head to the 7th district.", next: "N_h51" }]
    },
    "N_h51": {
        title: "A Promise Kept",
        image: "images/02.jpg",
        text: "You find Marcus's sister. You take her and leave the city on a boat.",
        choices: [{ text: "One year later...", next: "N59" }]
    },
    "N59": {
        title: "The Ghost's Retirement",
        image: "images/08.jpg",
        text: "Julian hides his crimes. The water stays poisoned. You survive, but you feel guilty every day. You ran away.",
        theme: "normalEnd",
        choices: [{ text: "RESTART LINK", next: "N1" }]
    },
    "N_h48": {
        title: "The Fires of Vengeance",
        image: "images/12.jpg",
        text: "Marcus's death makes you furious. You want revenge.",
        theme: "danger",
        choices: [{ text: "Step out of the shadows.", next: "N_h54" }]
    },
    "N_h54": {
        title: "A Moth to the Flame",
        image: "images/17.jpg",
        text: "You drop your gun. You tell the police, 'Take me to Julian, or the data goes public.' They put a bag on your head.",
        theme: "danger",
        choices: [{ text: "They put a hood over your head and take you away.", next: "N_w20_taunt" }]
    },
    "N_h28": {
        title: "A Lifeline",
        image: "images/20.jpg",
        text: "You secretly text Harold for help.",
        theme: "hack",
        choices: [{ text: "Wait for rescue.", next: "N_h34" }]
    },
    "N_h34": {
        title: "Money and Power",
        image: "images/03.jpg",
        text: "Harold works fast. The police chief rushes in and lets you go. A black car picks you up.",
        choices: [{ text: "Driving to the suburbs...", next: "N18" }]
    },
    "N15": {
        title: "Finding the Insider",
        image: "images/04.jpg",
        text: "'The police work for him. Drive to the old reservoir!' you tell Marcus. The car speeds out of the city.",
        choices: [{ text: "Arrive at the reservoir.", next: "N17" }]
    },
    "N17": {
        title: "The Pier",
        image: "images/13.jpg",
        text: "You reach an old pier. Harold is fishing. He looks calm.",
        choices: [{ text: "Confront him.", next: "N18" }]
    },
    "N18": {
        title: "Ambush at the Pier",
        image: "images/14.jpg",
        text: "Harold tells you the valve is in the old slaughterhouse. Suddenly, lasers point at you. 'Get down!' you yell. Snipers shoot at you. You get stabbed in the fight.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Clutching your wound, Marcus drags you to the car.", next: "N22" }]
    },
    "N22": {
        title: "Tess, the Black Market Doctor",
        image: "images/19.jpg",
        text: "You are bleeding badly. Marcus drives you to an illegal doctor named Tess. She doesn't want to help, but you show her the map of the poisoned water. She realizes this is why her patients are dying.",
        choices: [{ text: "You collapse onto the operating table.", next: "N27" }]
    },
    "N27": {
        title: "Crude Stitches",
        image: "images/19.jpg",
        text: "Tess sews up your wound without painkillers. It hurts badly.",
        choices: [{ text: "Just as the surgery finishes...", next: "N28" }]
    },
    "N28": {
        title: "Rats in a Cage",
        image: "images/19.jpg",
        text: "Julian's men surround the clinic. They are going to blow up the door. There is a sewer grate under the table.",
        theme: "danger", effect: "shake",
        choices: [{ text: "\"You two go. I'll hold them off.\" Lock them in the sewer.", next: "N29" }, { text: "No more lone wolf act. We fight our way out as a team.", next: "N30" }]
    },
    "N29": {
        title: "The Lone Wolf",
        image: "images/19.jpg",
        text: "You push Marcus and Tess into the sewer. You lock the grate. You grab a gun and wait by the door.",
        theme: "danger",
        choices: [{ text: "Fight to the last bullet.", next: "N31" }]
    },
    "N31": {
        title: "The Wounded God of War",
        image: "images/19.jpg",
        text: "You fight hard, but they use flashbangs. You are hit in the head and captured.",
        theme: "danger",
        choices: [{ text: "You fall into unconsciousness.", next: "N_w20_beaten" }]
    },
    "N30": {
        title: "The Power of Trust",
        image: "images/18.jpg",
        text: "You give Marcus a weapon. Tess starts a fire. The three of you jump into the sewer as the clinic explodes.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Wading through the sewers...", next: "N33" }]
    },
    "N33": {
        title: "A Choice in the Dark",
        image: "images/18.jpg",
        text: "You are safe in the sewers. The slaughterhouse is nearby.",
        choices: [{ text: "Stop here. Leak the evidence to the media.", next: "N34" }, { text: "The media can't be trusted. We go and shut the valve ourselves.", next: "N35" }]
    },
    "N34": {
        title: "Hope in the Media",
        image: "images/08.jpg",
        text: "Marcus is scared. You agree to stop. You send the evidence to thirty news outlets.",
        choices: [{ text: "Wait for dawn.", next: "N36" }]
    },
    "N36": {
        title: "The Fuse is Lit",
        image: "images/08.jpg",
        text: "The files are sent. You wait for the morning to see the news.",
        choices: [{ text: "The next day...", next: "N_h64" }]
    },
    "N_h64": {
        title: "The Power of Money",
        image: "images/08.jpg",
        text: "Julian buys the media. They say your evidence is fake. He seals the valve bunker with concrete. The proof is gone.",
        theme: "danger",
        choices: [{ text: "It's too late.", next: "N60" }]
    },
    "N60": {
        title: "Incomplete Justice",
        image: "images/08.jpg",
        text: "Julian pays a fine but stays free. The plant closes, but the victims get nothing. You survive, but you feel like you failed.",
        theme: "normalEnd",
        choices: [{ text: "RESTART LINK", next: "N1" }]
    },
    "N35": {
        title: "A Job for Our Own Hands",
        image: "images/18.jpg",
        text: "'We must finish this ourselves,' you say. You keep walking toward the bunker.",
        choices: [{ text: "Approaching the core...", next: "N37" }]
    },
    "N37": {
        title: "The Mouth of Hell",
        image: "images/18.jpg",
        text: "The smell is awful. You climb a ladder and look inside the bunker.",
        choices: [{ text: "Look down.", next: "N38" }]
    },
    "N38": {
        title: "The Source of the Poison",
        image: "images/18.jpg",
        text: "A giant pipe is dumping green poison into the water. Guards are everywhere.",
        theme: "danger",
        choices: [{ text: "Formulate a plan.", next: "N42" }]
    },
    "N42": {
        title: "A Pack of Wolves",
        image: "images/18.jpg",
        text: "Marcus distracts them with a loud machine. Tess cuts the lights. In the dark, you silently take down the guards.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Approach the control console.", next: "N43" }]
    },
    "N43": {
        title: "Cutting the Head off the Snake",
        image: "images/18.jpg",
        text: "You and Marcus turn the heavy valve. The poison stops. You take the main hard drive.",
        theme: "hack",
        choices: [{ text: "Send the evidence to the Attorney General anonymously.", next: "N44" }, { text: "Julian's gala is tonight. We're going to make him famous.", next: "N45" }]
    },
    "N44": {
        title: "Trust in the Law",
        image: "images/07.jpg",
        text: "You send the data to a strict judge on the darknet. Then you hide.",
        choices: [{ text: "Two weeks later...", next: "N46" }]
    },
    "N46": {
        title: "Justice Delayed",
        image: "images/07.jpg",
        text: "The FBI tries to arrest Julian. But he gets a warning. He flies away in a helicopter to a safe country. He keeps his money.",
        theme: "danger",
        choices: [{ text: "A bitter end.", next: "N60" }]
    },
    "N45": {
        title: "Public Execution",
        image: "images/17.jpg",
        text: "'He must pay in public,' Marcus says. You go to Julian's party to expose him.",
        choices: [{ text: "Contact Harold.", next: "N47" }]
    },
    "N47": {
        title: "The Inside Man",
        image: "images/20.jpg",
        text: "Harold hacks into the party's computer system.",
        theme: "hack",
        choices: [{ text: "Infiltrate the gala.", next: "N48" }]
    },
    "N48": {
        title: "The Gilded Cage",
        image: "images/17.jpg",
        text: "Marcus gets you inside. Tess locks the security guards away. Julian is on stage.",
        theme: "hack",
        choices: [{ text: "Signal Harold to broadcast the evidence, then we retreat.", next: "N49" }, { text: "I'm going in. I need to see his face when it all comes down.", next: "N50" }]
    },
    "N49": {
        title: "Mission Accomplished",
        image: "images/17.jpg",
        text: "You decide not to risk your lives. You tell Harold to show the evidence, then you leave.",
        choices: [{ text: "Down on the street...", next: "N51" }]
    },
    "N51": {
        title: "A Near Miss",
        image: "images/06.jpg",
        text: "The evidence plays on the big screens. But you are not there to stop Julian. His guards blow open a door and he escapes.",
        theme: "danger",
        choices: [{ text: "So close.", next: "N60" }]
    },
    "N50": {
        title: "Face to Face",
        image: "images/17.jpg",
        text: "You tell your friends to wait outside. You walk into the ballroom.",
        choices: [{ text: "Let the show begin.", next: "N52" }]
    },
    "N52": {
        title: "The Sword of Damocles",
        image: "images/20.jpg",
        text: "Harold takes control of the party's lights and sound.",
        theme: "hack",
        choices: [{ text: "Inside the gala...", next: "N53" }]
    },
    "N53": {
        title: "The Fall of a God",
        image: "images/17.jpg",
        text: "Julian's speech stops. The screens show videos of the poison and his crimes. Everyone sees the truth.",
        choices: [{ text: "Leave during the chaos.", next: "N54" }, { text: "Walk towards the stage. Towards Julian.", next: "N55" }]
    },
    "N54": {
        title: "A Quiet Exit",
        image: "images/17.jpg",
        text: "You watch Julian panic. You smile and walk away into the crowd.",
        choices: [{ text: "Aftermath...", next: "N56" }]
    },
    "N56": {
        title: "Legal Loopholes",
        image: "images/07.jpg",
        text: "Because you didn't give the police the real hard drive, Julian blames someone else. He pays a fine but stays in power.",
        theme: "danger",
        choices: [{ text: "It's not enough.", next: "N60" }]
    },
    "N55": {
        title: "The Final Judgment",
        image: "images/17.jpg",
        text: "You walk toward Julian. You look terrifying. The crowd moves away. Julian steps back in fear.",
        choices: [{ text: "Corner him.", next: "N57" }]
    },
    "N57": {
        title: "Nothing to Lose",
        image: "images/06.jpg",
        text: "The police surround the building. Julian laughs like a crazy man.",
        theme: "danger", effect: "shake",
        choices: [{ text: "Listen to his last words.", next: "N58" }]
    },
    "N58": {
        title: "Pull the Trigger?",
        image: "images/06.jpg",
        text: "'You change nothing!' Julian yells. 'I will just pay a judge!' The police are breaking in.",
        theme: "danger",
        choices: [{ text: "To hell with the law. Pull the trigger.", next: "N134" }, { text: "Resist the rage. Let the law handle him.", next: "N132" }]
    },
    "N134": {
        title: "Vigilante Justice",
        image: "images/06.jpg",
        text: "You shoot him. He dies instantly. The police break in.",
        theme: "danger", effect: "shake",
        choices: [{ text: "In the smoke...", next: "N135" }]
    },
    "N135": {
        title: "Life on the Run",
        image: "images/02.jpg",
        text: "You become a criminal. Julian's company goes bankrupt. The victims get no money. Your revenge cost them everything.",
        theme: "danger",
        choices: [{ text: "This wasn't the best ending.", next: "N60_shoot" }]
    },
    "N60_shoot": {
        title: "The Pyrrhic Victory",
        image: "images/08.jpg",
        text: "Julian dies a martyr. His lawyers hide his money. You live on the run. You killed the man, but the bad system remains.",
        theme: "normalEnd",
        choices: [{ text: "RESTART LINK", next: "N1" }]
    },
    "N132": {
        title: "True Victory",
        image: "images/06.jpg",
        text: "'You are not worth my bullet,' you say. You lower your gun.",
        choices: [{ text: "SWAT breaches the door.", next: "N140" }]
    },
    "N140": {
        title: "The Reckoning",
        image: "images/07.jpg",
        text: "The police arrest Julian on live TV. With your perfect evidence, he goes to prison for life. His empire falls.",
        choices: [{ text: "A few months later...", next: "N61" }]
    },
    "N_w20_beaten": {
        title: "Dragged In",
        image: "images/17.jpg",
        text: "You wake up tied up. You are hurt badly. You saved Marcus and Tess, but now you are alone.",
        theme: "danger",
        choices: [{ text: "They throw you into the chair.", next: "N_u6" }]
    },
    "N_w20_taunt": {
        title: "Into the Lion's Den",
        image: "images/17.jpg",
        text: "They want you alive. They take you to Julian's office.",
        theme: "danger",
        choices: [{ text: "The door opens. Julian walks in.", next: "N_u6" }]
    },
    "N61": {
        title: "Dawn",
        image: "images/01.jpg",
        text: "The poison is gone. The victims get medical help from Julian's seized money.\n\nYou work at Tess's new clinic. Marcus visits often. You are done fighting in the dark. You are finally at peace.",
        theme: "goodEnd",
        choices: [{ text: "RESTART LINK", next: "N1" }]
    }
};