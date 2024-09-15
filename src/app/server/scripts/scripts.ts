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

        await model.update({
          where: {id: existingItem.id},
          data: {[valueField]: item[valueField]}
        })
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
      name_en: "Römer",
      description_en:
        "Medieval town hall where German emperors once feasted, now home to a 400-year-old clock and secret underground passages."
    },
    {
      name_en: "Frankfurt Cathedral",
      description_en:
        "Gothic tower where ten kings were crowned, hiding a skullcap relic and a secret 'door to nowhere' 30 meters high."
    },
    {
      name_en: "Palmengarten",
      description_en:
        "Victorian-era garden with a subterranean glow-worm cave and the world's rarest blue rose."
    },
    {
      name_en: "Main Tower",
      description_en:
        "Skyscraper with a hidden time capsule and wind chimes that play a secret melody at specific wind speeds."
    },
    {
      name_en: "Städel Museum",
      description_en:
        "Art museum housing a painting with a real fly trapped in its varnish for over 400 years."
    },
    {
      name_en: "Goethe House",
      description_en:
        "Birthplace of Germany's Shakespeare, featuring a secret room where young Goethe practiced alchemy."
    },
    {
      name_en: "Alte Oper",
      description_en:
        "Resurrected opera house with a phantom organist and a chandelier that once fell during a performance."
    },
    {
      name_en: "Frankfurt Zoo",
      description_en:
        "Home to nocturnal creatures in the Grzimek House and a 150-year-old giant tortoise named Schurli."
    },
    {
      name_en: "Eiserner Steg",
      description_en:
        "Iron footbridge with a hidden message in Morse code and a golden rooster that crows at midnight."
    },
    {
      name_en: "Senckenberg Natural History Museum",
      description_en:
        "Museum where you can touch a real dinosaur footprint and see a giant shark jaw big enough to walk through."
    },
    {
      name_en: "Museum für Moderne Kunst",
      description_en:
        "Triangular 'piece of cake' building housing a room where visitors become part of the art installation."
    },
    {
      name_en: "German Film Museum",
      description_en:
        "Interactive museum where you can dub famous movie scenes and see the original Metropolis robot."
    },
    {
      name_en: "Jewish Museum Frankfurt",
      description_en:
        "Museum complex built over excavated Jewish ritual baths from the 15th century."
    },
    {
      name_en: "Museum Angewandte Kunst",
      description_en:
        "Design museum featuring a chair you're not allowed to sit on and a 400-year-old robot monk."
    },
    {
      name_en: "Historisches Museum Frankfurt",
      description_en:
        "City museum showcasing the 'Frankfurt Kitchen', the mother of all modern kitchens, and a mysterious 16th-century globe."
    },
    {
      name_en: "Deutsches Architekturmuseum",
      description_en:
        "Architecture museum with a to-scale model of Manhattan and a real piece of the Berlin Wall."
    },
    {
      name_en: "Schirn Kunsthalle",
      description_en:
        "Art hall where you can walk on water and see paintings that change color under different lights."
    },
    {
      name_en: "Kleinmarkthalle",
      description_en:
        "Gourmet market where you can taste 'music cheese' and find the secret ingredient of Frankfurt's green sauce."
    },
    {
      name_en: "Berger Strasse",
      description_en:
        "Street where you can find a vending machine for art and a pub with over 300 board games."
    },
    {
      name_en: "Sachsenhausen",
      description_en:
        "District where apple wine flows from fountains during festivals and traditional taverns have tables bolted to the floor."
    },
    {
      name_en: "Grüneburgpark",
      description_en:
        "Park with a hidden Cold War bunker and a tree that 'eats' metal."
    },
    {
      name_en: "Hauptwache",
      description_en:
        "Central square with a Baroque guardhouse turned café, sitting atop a vast underground shopping complex."
    },
    {
      name_en: "Bornheim",
      description_en:
        "Neighborhood where you can find a vending machine that dispenses books and a restaurant where you dine in complete darkness."
    },
    {
      name_en: "Holzhausenpark",
      description_en:
        "Park featuring a moated castle-turned-music-school and a tree older than the United States."
    },
    {
      name_en: "Westend",
      description_en:
        "District home to a building so large it has its own postcode and a hidden rooftop bee colony producing 'skyscraper honey'."
    },
    {
      name_en: "Westend Synagogue",
      description_en:
        "Synagogue that survived WWII thanks to its fire chief, now housing a chandelier with 12,000 crystal pieces."
    },
    {
      name_en: "Nizza Park",
      description_en:
        "Mediterranean garden on the Main, home to banana trees in Germany and a century-old dawn redwood thought extinct until 1944."
    },
    {
      name_en: "St. Paul's Church",
      description_en:
        "Cradle of German democracy, where you can stand on the spot Germany's first freely elected parliament convened."
    },
    {
      name_en: "Römerberg",
      description_en:
        "Medieval square where executions once took place, now home to a fountain said to give fertility to those who drink from it."
    },
    {
      name_en: "Frankfurter Grüngürtel",
      description_en:
        "Green belt featuring a beach in the middle of the city and a forest where wild bison roam."
    },
    {
      name_en: "Zeil",
      description_en:
        "Shopping street with a building that appears to be inside-out and Europe's longest free-standing escalator."
    },
    {
      name_en: "Ebbelwoi Express",
      description_en:
        "Tram where the seats are wine barrels and the ticket is a glass of apple wine."
    },
    {
      name_en: "Main River Cruise",
      description_en:
        "River tour passing seven historic bridges, including one with a built-in movie theater."
    },
    {
      name_en: "Frankfurt Flea Market",
      description_en:
        "Weekly market where you might find Nazi memorabilia next to iPhones, all spread out along the Main's banks."
    },
    {
      name_en: "Deutsche Bank Park",
      description_en:
        "Football stadium with a built-in nightclub and a corner flag from the 1954 'Miracle of Bern' World Cup final."
    },
    {
      name_en: "Apple Wine Taverns",
      description_en:
        "Traditional pubs where apple wine is served in a cryptically marked jug and you might be seated with strangers."
    },
    {
      name_en: "Frankfurt Cooking Classes",
      description_en:
        "Culinary workshops where you learn to make 'hand cheese with music' and decode the seven-herb secret of green sauce."
    },
    {
      name_en: "Chinese Garden",
      description_en:
        "Oriental oasis where the number of stone lions has a hidden meaning and a special echo can be heard under the moongate."
    },
    {
      name_en: "MyZeil Shopping Mall",
      description_en:
        "Futuristic mall with a vortex-like glass facade and a rainwater harvesting system that supplies its toilets."
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
