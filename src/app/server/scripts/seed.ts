const {PrismaClient} = require("@prisma/client")
const fs = require("fs")
const {parse} = require("csv-parse")

const prisma = new PrismaClient()

async function loadAttractions() {
    fs.createReadStream("src/app/server/scripts/seed.csv")
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", async (row: any) => {
            const [taxonomy, name, latitude, longitude, points, cityId, meta, isActive] = row

            // Validate and parse numerical values
            const lat = parseFloat(latitude)
            const lng = parseFloat(longitude)
            const pts = parseInt(points, 10)
            const active = isActive === "TRUE"

            if (isNaN(lat) || isNaN(lng) || isNaN(pts)) {
                console.error("Invalid numerical data:", row)
                return
            }

            try {
                await prisma.attraction.create({
                    data: {
                        taxonomy,
                        name,
                        latitude: lat,
                        longitude: lng,
                        points: pts,
                        city: {
                            connect: {id: cityId} // Assuming cityId corresponds to the City model's primary key
                        },
                        meta: JSON.parse(meta.replace(/""/g, '"')),
                        isActive: active
                    }
                })
            } catch (error) {
                console.error("Error inserting row into database", error)
            }
        })
        .on("end", () => {
            console.log("CSV file successfully processed")
        })
        .on("error", (err: Error) => {
            console.error("Error processing CSV file", err)
        })
}

loadAttractions()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
