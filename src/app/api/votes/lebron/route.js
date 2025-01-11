import { connectToDatabase } from '@/utils/db';
import LeBron from '../../../../models/Lebron';

export async function GET() {
    await connectToDatabase();
    const lebronVote = await LeBron.findOne();
    return new Response(
        JSON.stringify({ LeBronJames: lebronVote ? lebronVote.votes : 0 }),
        { status: 200 }
    );
}

export async function POST() {
    await connectToDatabase();
    const lebronVote = await LeBron.findOne();

    if (lebronVote) {
        lebronVote.votes += 1;
        await lebronVote.save();
        return new Response(
            JSON.stringify({
                message: 'Vote counted for LeBron James',
                count: lebronVote.votes,
            }),
            { status: 200 }
        );
    } else {
        return new Response(
            JSON.stringify({ message: 'LeBron James candidate not found' }),
            { status: 400 }
        );
    }
}
