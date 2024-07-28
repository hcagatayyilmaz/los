const {PrismaClient} = require("@prisma/client")
const fs = require("fs")
const {parse} = require("csv-parse")

const prisma = new PrismaClient()

async function loadAttractions() {
    fs.createReadStream("src/app/server/scripts/seed.csv")
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", async (row: any) => {
            const [
                name_en,
                name_de,
                latitude,
                longitude,
                points,
                cityId,
                description_en,
                description_de,
                isActive
            ] = row
            console.log("Row:", row)
            console.log(latitude, typeof latitude)
            // Validate and parse numerical values
            const lat = parseFloat(latitude)
            const lng = parseFloat(longitude)
            const pts = parseInt(points, 10)
            const active = isActive === "TRUE"

            // Limit the precision to six decimal places and convert back to number
            const latFixed = parseFloat(lat.toFixed(6))
            const lngFixed = parseFloat(lng.toFixed(6))

            // Logging the parsed values
            console.log("Parsed values:", {latFixed, lngFixed, pts, active})

            if (isNaN(latFixed) || isNaN(lngFixed) || isNaN(pts)) {
                console.log("Latitude is NaN:", isNaN(latFixed))
                console.log("Longitude is NaN:", isNaN(lngFixed))
                console.log("Points is NaN:", isNaN(pts))
                console.error("Invalid numerical data:", row)
                return
            }

            try {
                await prisma.attraction.create({
                    data: {
                        name_en,
                        name_de,
                        latitude: latFixed,
                        longitude: lngFixed,
                        points: pts,
                        city: {
                            connect: {id: cityId} // Ensure this ID exists in the City table
                        },
                        description_en,
                        description_de,
                        isActive: active,
                        taxonomy: "ATTRACTION"
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
