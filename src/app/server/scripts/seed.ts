import {AttractionTaxonomy} from "@prisma/client"

const {PrismaClient} = require("@prisma/client")
const fs = require("fs")
const {parse} = require("csv-parse")

const prisma = new PrismaClient()

async function loadAttractions() {
    fs.createReadStream("src/app/server/scripts/seed.csv")
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", async (row: any) => {
            const [
                name,
                latitude,
                longitude,
                points,
                cityId,
                description_en,
                description_de,
                isActive
            ] = row

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
                        name,
                        latitude: lat,
                        longitude: lng,
                        points: pts,
                        city: {
                            connect: {id: cityId} // Ensure this ID exists in the City table
                        },
                        description_en,
                        description_de,
                        isActive: active,
                        taxonomy: "ATTRACTION" as AttractionTaxonomy
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
