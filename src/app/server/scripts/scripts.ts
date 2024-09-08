import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateItem {
  [key: string]: string
}

export async function updateDescriptionsFromJson(
  jsonData: UpdateItem[],
  targetField: string,
  keyField: string,
  valueField: string
) {
  if (!(targetField in prisma)) {
    console.error(`Error: ${targetField} is not a valid Prisma model`)
    return
  }

  const model = (prisma as any)[targetField]
  let matchCount = 0
  const matchingItems: UpdateItem[] = []

  for (const item of jsonData) {
    try {
      const existingItem = await model.findFirst({
        where: {[keyField]: item[keyField]}
      })

      if (existingItem) {
        matchCount++
        matchingItems.push(item)
        console.log(`Matching item found: ${item[keyField]}`)

        // Uncomment the following lines when you want to update the descriptions
        // await model.update({
        //   where: { id: existingItem.id },
        //   data: { [valueField]: item[valueField] },
        // });
      }
    } catch (error) {
      console.error(`Error processing item ${item[keyField]}:`, error)
    }
  }

  console.log(`Found ${matchCount} matching items in ${String(targetField)}`)
  console.log("Matching items:", matchingItems)
}

async function main() {
  const array = [
    {
      name_en: "Cologne Cathedral",
      description_en:
        "A towering Gothic masterpiece and UNESCO World Heritage site, featuring intricate stained glass windows and the Shrine of the Three Kings, stands as a testament to medieval craftsmanship and enduring faith."
    },
    {
      name_en: "Hohenzollern Bridge",
      description_en:
        "An iconic railway and pedestrian bridge adorned with thousands of love locks, offering panoramic views of the Rhine River, symbolizes both Cologne's industrial heritage and romantic spirit."
    },
    {
      name_en: "Rheinpark",
      description_en:
        "A sprawling riverside park with landscaped gardens and playgrounds, offering scenic Rhine views and outdoor activities, serves as a green oasis for locals and visitors alike."
    },
    {
      name_en: "Old Town (Altstadt)",
      description_en:
        "A charming historic district with cobblestone streets and colorful buildings, featuring the famous Heinzelmännchenbrunnen fountain and traditional brewhouses, transports visitors to medieval Cologne."
    },
    {
      name_en: "Stadtgarten",
      description_en:
        "A lush urban park with a picturesque lake and beer garden, hosting outdoor concerts and cultural events, provides a tranquil escape from the bustling city."
    },
    {
      name_en: "Fischmarkt",
      description_en:
        "A quaint square in the old town lined with colorful houses and outdoor cafes, once a bustling fish market, now captures the essence of Cologne's vibrant atmosphere."
    },
    {
      name_en: "Cologne City Hall (Rathaus)",
      description_en:
        "The historic seat of local government with a stunning Renaissance façade and Gothic tower, featuring intricate stone carvings and a famous Heinzelmännchen statue, showcases Cologne's rich political and architectural heritage."
    },
    {
      name_en: "Volksgarten",
      description_en:
        "A popular park with a serene lake and cozy beer garden, offering recreational activities and seasonal events, serves as a beloved gathering spot for locals and tourists."
    },
    {
      name_en: "Severinstorburg",
      description_en:
        "A well-preserved medieval city gate with a distinctive round tower, offering insights into Cologne's ancient fortifications, stands as a tangible link to the city's medieval past."
    },
    {
      name_en: "Eigelstein Torburg",
      description_en:
        "Another historic gateway to the city with a unique octagonal design, housing a small museum about Cologne's fortifications, illustrates the city's strategic importance throughout history."
    },
    {
      name_en: "Rhine River Cruise",
      description_en:
        "A scenic boat tour along the majestic Rhine River, offering stunning views of Cologne's skyline and historic landmarks, provides a unique perspective on the city's rich history and modern charm."
    },
    {
      name_en: "Chocolate Museum",
      description_en:
        "An interactive museum dedicated to the history and production of chocolate, featuring a tropical greenhouse and a chocolate fountain, delights visitors with its sweet exhibits and hands-on experiences."
    },
    {
      name_en: "Roman-Germanic Museum",
      description_en:
        "A treasure trove of ancient artifacts, including the famous Dionysus mosaic and Roman glassware, offers a fascinating journey through Cologne's Roman and Germanic past."
    },
    {
      name_en: "Cologne Carnival",
      description_en:
        "One of Germany's largest and most vibrant festivals, featuring colorful parades, elaborate costumes, and lively street parties, celebrates Cologne's unique culture and zest for life."
    },
    {
      name_en: "Cologne Cable Car",
      description_en:
        "A thrilling ride across the Rhine River, offering panoramic views of the city skyline and surrounding landscape, provides a memorable and picturesque transportation experience."
    },
    {
      name_en: "Kölsch Beer Tasting",
      description_en:
        "A quintessential Cologne experience at traditional brewhouses, featuring the city's unique top-fermented beer served in small glasses, immerses visitors in local drinking culture and conviviality."
    },
    {
      name_en: "Rheinboulevard",
      description_en:
        "A modern promenade along the Rhine River with expansive steps and seating areas, offering stunning views of the Old Town and cathedral, serves as a popular gathering spot for locals and tourists alike."
    },
    {
      name_en: "Ehrenfeld Street Art",
      description_en:
        "A vibrant district known for its colorful murals and creative atmosphere, featuring works by local and international artists, showcases Cologne's contemporary urban culture and artistic spirit."
    },
    {
      name_en: "Museum Ludwig",
      description_en:
        "A world-renowned modern and contemporary art museum, housing works by Picasso, Warhol, and other iconic artists, offers a journey through 20th and 21st-century artistic movements."
    },
    {
      name_en: "Wallraf-Richartz Museum",
      description_en:
        "One of the oldest museums in Germany, featuring an extensive collection of European art from medieval to early 20th century, provides a comprehensive overview of Western art history."
    },
    {
      name_en: "NS Documentation Center",
      description_en:
        "A thought-provoking museum located in a former Gestapo headquarters, documenting Cologne's history during the Nazi era, serves as a powerful memorial and educational resource."
    },
    {
      name_en: "Museum of Applied Arts (MAKK)",
      description_en:
        "A diverse collection of decorative arts and design from various periods and cultures, housed in a modernist building, showcases the evolution of craftsmanship and aesthetics through the ages."
    },
    {
      name_en: "Schnütgen Museum",
      description_en:
        "A unique museum of medieval art housed in a Romanesque church, featuring religious artifacts and sculptures, offers a spiritual and artistic journey through the Middle Ages."
    },
    {
      name_en: "Odysseum",
      description_en:
        "An interactive science and adventure museum with hands-on exhibits and experiments, catering to visitors of all ages, makes learning about science and technology a fun and engaging experience."
    },
    {
      name_en: "Cologne City Museum",
      description_en:
        "A comprehensive museum chronicling Cologne's history from Roman times to the present day, featuring artifacts and multimedia displays, provides insight into the city's rich cultural heritage."
    },
    {
      name_en: "Museum of East Asian Art",
      description_en:
        "The only museum in Germany dedicated exclusively to East Asian art, showcasing exquisite pieces from China, Japan, and Korea, offers a serene journey through Asian aesthetics and culture."
    },
    {
      name_en: "Sports and Olympic Museum",
      description_en:
        "An engaging museum celebrating sports history and the Olympic spirit, featuring interactive exhibits and memorabilia, inspires visitors with stories of athletic achievement and fair play."
    },
    {
      name_en: "EL-DE Haus",
      description_en:
        "A former Gestapo headquarters turned memorial and museum, preserving prisoner inscriptions and documenting Nazi atrocities, serves as a poignant reminder of the darkest chapter in Cologne's history."
    },
    {
      name_en: "St. Gereon's Basilica",
      description_en:
        "An impressive Romanesque church with a unique decagonal nave, featuring stunning mosaics and a crypt, stands as one of Cologne's oldest and most architecturally intriguing religious sites."
    },
    {
      name_en: "Belgian Quarter",
      description_en:
        "A trendy neighborhood known for its eclectic mix of boutiques, cafes, and nightlife spots, offering a vibrant atmosphere and diverse culinary scene, embodies Cologne's modern, cosmopolitan spirit."
    },
    {
      name_en: "St. Agnes Church",
      description_en:
        "A striking example of Gothic Revival architecture, featuring soaring spires and beautiful stained glass windows, stands as a testament to Cologne's rich religious heritage and artistic tradition."
    },
    {
      name_en: "Flora and Botanical Garden",
      description_en:
        "A lush oasis in the heart of the city, featuring diverse plant collections, themed gardens, and greenhouses, offers a tranquil retreat and educational experience for nature lovers."
    },
    {
      name_en: "Südstadt",
      description_en:
        "A charming district known for its beautiful Art Nouveau buildings, diverse restaurants, and lively nightlife, captures the essence of Cologne's laid-back yet vibrant urban lifestyle."
    },
    {
      name_en: "St. Ursula Church",
      description_en:
        "A Romanesque church famous for its Golden Chamber filled with elaborate reliquaries and bones, offers a unique and somewhat macabre glimpse into medieval religious practices."
    },
    {
      name_en: "Aachener Weiher",
      description_en:
        "A popular urban lake and park area, offering recreational activities and a relaxing atmosphere, serves as a beloved outdoor gathering spot for locals and visitors alike."
    },
    {
      name_en: "St. Kunibert's Basilica",
      description_en:
        "One of Cologne's twelve Romanesque churches, featuring beautiful stained glass windows and a serene interior, stands as a hidden gem of medieval architecture and spirituality."
    },
    {
      name_en: "Melaten Cemetery",
      description_en:
        "A historic cemetery known for its elaborate tombs and peaceful tree-lined paths, serving as both a final resting place for notable Cologne citizens and a serene park-like setting for contemplation."
    },
    {
      name_en: "Cologne Triangle",
      description_en:
        "A modern skyscraper with a public observation deck, offering 360-degree panoramic views of Cologne and its surroundings, provides a unique perspective on the city's blend of historic and contemporary architecture."
    }
  ]

  await updateDescriptionsFromJson(
    array,
    "attraction", // This should be the name of your Prisma model
    "name_en",
    "description_en"
  )
}

// Make sure to call the main function
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

const array = [
  {
    name: "Englischer Garten",
    description:
      "This big park has it all: sports, surfing on a river, beautiful nature, and beer gardens. It's a fun place where you can relax or be active in the middle of the city."
  },
  {
    name: "Eisbach Wave",
    description:
      "Watch people surf on a river in the city. It's unusual and exciting to see surfing far from the ocean."
  },
  {
    name: "Marienplatz",
    description:
      "The main square of Munich. Watch the famous clock show with moving figures. It happens twice a day and many people come to see it."
  },
  {
    name: "Frauenkirche",
    description:
      "The big church with two tall towers. You can see these towers from many places in Munich. Inside, it's very big and beautiful."
  },
  {
    name: "Deutsches Museum",
    description:
      "A huge science and technology museum. You can see and touch many interesting machines and inventions here. It's fun for both adults and kids."
  },
  {
    name: "Nymphenburg Palace",
    description:
      "A very big and beautiful old palace. It has lovely gardens too. Long ago, kings and queens lived here."
  },
  {
    name: "Sendlinger Tor",
    description:
      "An old city gate that's still standing. It's one of the few left from Munich's old city walls. It's pretty and historic."
  },
  {
    name: "Viktualienmarkt",
    description:
      "A big outdoor market in the city center. You can buy fresh food, flowers, and taste local foods here. It's colorful and busy."
  },
  {
    name: "Olympiapark",
    description:
      "The park built for the 1972 Olympics. Now you can do many sports here, go up a tall tower, or even ride a zip line."
  },
  {
    name: "Allianz Arena",
    description:
      "The big football stadium that changes color at night. It looks like a giant colorful balloon. Famous football matches happen here."
  },
  {
    name: "Alte Pinakothek",
    description:
      "An old and famous art museum. It has many important paintings from long ago. You can see art from different parts of Europe here."
  },
  {
    name: "Neue Pinakothek",
    description:
      "Another art museum, but with newer paintings than the Alte Pinakothek. The art here is from the 1800s and early 1900s."
  },
  {
    name: "Pinakothek der Moderne",
    description:
      "A museum for modern art. The art here is very new and sometimes unusual. The building itself looks very modern too."
  },
  {
    name: "Lenbachhaus",
    description:
      "A museum in a beautiful old house. It's famous for paintings by a group of artists called the Blue Rider group."
  },
  {
    name: "Hofgarten",
    description:
      "A pretty garden near the city center. It used to be the garden of the king's palace. Now everyone can enjoy it."
  },
  {
    name: "Hirschgarten",
    description:
      "The biggest beer garden in Europe. You can drink beer and eat while watching deer in a nearby park. It's a special Munich experience."
  },
  {
    name: "Residenz",
    description:
      "The old palace of Bavaria's kings in the city center. It's very big and full of beautiful rooms. You can see how royalty lived long ago."
  },
  {
    name: "Asam Church",
    description:
      "A small church that's very decorated inside. Every part of it is covered in art. It's small but very impressive."
  },
  {
    name: "St. Peter's Church",
    description:
      "The oldest church in Munich. You can climb to the top of its tower. From there, you can see all of Munich."
  },
  {
    name: "Bavarian National Museum",
    description:
      "A museum about the history and culture of Bavaria. You can see many old and interesting things from this region here."
  },
  {
    name: "Westpark",
    description:
      "A park with gardens from different parts of the world. You can see a Chinese garden and even a Thai temple here."
  },
  {
    name: "Glyptothek",
    description:
      "A museum of old Greek and Roman statues. The building is beautiful and looks like an old Greek temple."
  },
  {
    name: "Museum Brandhorst",
    description:
      "A museum for very modern art. The building has a colorful outside. Inside, you'll see art that's new and different."
  },
  {
    name: "Jewish Museum",
    description:
      "A museum about Jewish history and culture in Munich. It tells important stories about Jewish people in this city."
  },
  {
    name: "Botanical Garden",
    description:
      "A big garden with plants from all over the world. You can see tropical plants, cactuses, and flowers from many countries."
  },
  {
    name: "Museum of Man and Nature",
    description:
      "A museum about humans and the natural world. It's interesting for all ages and has many things to see and do."
  },
  {
    name: "Hofbräuhaus",
    description:
      "A very famous old beer hall. It's always busy and fun. You can drink beer, eat traditional food, and listen to Bavarian music here."
  },
  {
    name: "Karlsplatz (Stachus)",
    description:
      "A busy square in the city center. There's a big fountain here. It's a good place for shopping and watching people."
  },
  {
    name: "Isartor",
    description:
      "Another old city gate. It has paintings on it that tell old stories about Munich. It's a piece of history in the middle of the city."
  },
  {
    name: "Feldherrnhalle",
    description:
      "A big arch-shaped monument. It's in a square where important things happened in Munich's history. Many people take photos here."
  },
  {
    name: "Siegestor",
    description:
      "A big arch that looks like a gate. It was built to celebrate winning wars, but now it stands for peace."
  },
  {
    name: "NS-Dokumentationszentrum",
    description:
      "A place to learn about Munich's difficult history during Nazi times. It's serious but important to understand."
  },
  {
    name: "Luitpoldpark",
    description:
      "A park with a hill made from old war ruins. You can climb the hill for a good view of the city."
  },
  {
    name: "Justizpalast",
    description:
      "The big, beautiful building where courts of law are. It looks like a palace but it's where justice happens."
  },
  {
    name: "Maximilianeum",
    description:
      "A grand building where Bavaria's parliament meets. It stands high above the river and looks very impressive."
  },
  {
    name: "Bier- und Oktoberfestmuseum",
    description:
      "A museum about beer and Oktoberfest. Learn the history of Munich's famous beer festival and beer-making traditions."
  },
  {
    name: "Gärtnerplatz",
    description:
      "A round square with a theater in the middle. It's a nice place to sit in cafes and watch the world go by."
  },
  {
    name: "Prinzregententheater",
    description:
      "A beautiful old theater. Many important plays and operas are performed here. The building itself is very pretty."
  },
  {
    name: "Nymphenburg Canal",
    description:
      "A long, straight canal that leads to Nymphenburg Palace. In winter, people ice skate on it."
  },
  {
    name: "BMW Museum",
    description:
      "A museum all about BMW cars and motorcycles. See old and new BMWs and learn about how they're made."
  }
]
