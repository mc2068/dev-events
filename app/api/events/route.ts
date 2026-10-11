import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/app/lib/mongodb";
import Event from "@/app/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure the database is connected

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON data format" }, { status: 400 });
        }

        const file = formData.get('image') as File;

        if(!file) {
            return NextResponse.json({ error: "Image file is required" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload the image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'events' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url; // Store the Cloudinary URL in the event object

        const createdEvent = await Event.create(event);
        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });

    } catch (e) {
        return NextResponse.json({ message: "Failed to create event" , error: e instanceof Error ? e.message : 'Unknown error'}, {status: 500 });
    }

}

export async function GET() {
    try {
        await connectDB(); // Ensure the database is connected
        const events = await Event.find().sort({ createdAt: -1 }); 
        return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Failed to fetch events" , error: e instanceof Error ? e.message : 'Unknown error'}, {status: 500 });
    }
}    