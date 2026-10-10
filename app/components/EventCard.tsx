interface props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
import Image from 'next/image';
import Link from 'next/link';
const EventCard = ({title, image, slug, location, date, time}: props) => {
    return (
        <div id="event-card">
            <Link href={`/event/${slug}`}>
                <Image src={image} alt={title} width={410} height={300} className="poster" />
                <p className="title">{title}</p>
                <div className="flex flex-row gap-2">
                    <Image src="/icons/pin.svg" alt="location" width={16} height={16} />
                    <p className="location">{location}</p>
                </div>
                <div className="datetime">
                    <div>
                        <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                        <p className="date">{date}</p>
                    </div>
                    <div>
                        <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                        <p className="time">{time}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default EventCard
