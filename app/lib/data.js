// I know, this is quite the cheat, and would never fly in a real production app.
// Doing some async IO work here (either via filesystem or network) to acquire the data on app start is the right approach,
// but I feel that to be a minor detail in the scope of the challenge,
// and and some point you have to optimize for developer time, right? :)
export default {
   "menuItems":[
      {
         "id":101,
         "checkDesc":"Board Games",
         "basePrice":0,
         "modifierType":"NONE",
         "salesMode":"BUTTON_ONLY",
         "childMenuItems":[
            {
               "id":201,
               "checkDesc":"Dark Souls",
               "basePrice":99.99,
               "modifierType":"NONE",
               "salesMode":"NORMAL",
               "childMenuItems":[
                  {
                     "id":301,
                     "checkDesc":"Dark Souls Mod",
                     "basePrice":0,
                     "modifierType":"OPTIONAL",
                     "salesMode":"MODIFIER_GROUP",
                     "childMenuItems":[
                        {
                           "id":401,
                           "checkDesc":"Painted Miniatures",
                           "basePrice":20.00,
                           "modifierType":"TERMINAL",
                           "salesMode":"MODIFIER"
                        }
                     ]
                  }
               ]
            },
            {
               "id":202,
               "checkDesc":"Monopoly",
               "basePrice":29.99,
               "modifierType":"NONE",
               "salesMode":"NORMAL",
               "childMenuItems":[
                  {
                     "id":302,
                     "checkDesc":"Monopoly Mod",
                     "basePrice":0,
                     "modifierType":"OPTIONAL",
                     "salesMode":"MODIFIER_GROUP",
                     "childMenuItems":[
                        {
                           "id":402,
                           "checkDesc":"Metal Pawns",
                           "basePrice":0.00,
                           "modifierType":"TERMINAL",
                           "salesMode":"MODIFIER"
                        },
                        {
                           "id":403,
                           "checkDesc":"Wooden Property",
                           "basePrice":0.00,
                           "modifierType":"TERMINAL",
                           "salesMode":"MODIFIER"
                        }
                     ]
                  }
               ]
            },
          ]
      },
      {
         "id":102,
         "checkDesc":"Miniature Games",
         "basePrice":0,
         "modifierType":"NONE",
         "salesMode":"BUTTON_ONLY",
         "childMenuItems":[
            {
               "id":203,
               "checkDesc":"X-Wing Core",
               "basePrice":39.99,
               "modifierType":"NONE",
               "salesMode":"NORMAL"
            },
            {
               "id":204,
               "checkDesc":"Warhammer 40K",
               "basePrice":139.99,
               "modifierType":"NONE",
               "salesMode":"NORMAL",
               "childMenuItems":[
                  {
                     "id":303,
                     "checkDesc":"Warhammer 40K Mod",
                     "basePrice":0,
                     "modifierType":"OPTIONAL",
                     "salesMode":"MODIFIER_GROUP",
                     "childMenuItems":[
                        {
                           "id":405,
                           "checkDesc":"Marbel Dice",
                           "basePrice":0.00,
                           "modifierType":"TERMINAL",
                           "salesMode":"MODIFIER"
                        },
                        {
                           "id":406,
                           "checkDesc":"Measuring Tape",
                           "basePrice":0.00,
                           "modifierType":"TERMINAL",
                           "salesMode":"MODIFIER"
                        }
                     ]
                  }
               ]
            }
         ]
      }
   ]
};