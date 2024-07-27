import {PrismaClient} from "@prisma/client"
import fs from "fs"
import {parse} from "csv-parse"

const prisma = new PrismaClient()

async function loadAttractions() {
    fs.createReadStream("data.csv")
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", async (row: any) => {
            const [name, latitude, longitude, points, cityId] = row

            await prisma.attraction.create({
                data: {
                    name,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    points: parseInt(points, 0),
                    cityId
                }
            })
        })
        .on("end", () => {
            console.log("CSV file successfully processed")
        })
        .on("error", (err: any) => {
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
