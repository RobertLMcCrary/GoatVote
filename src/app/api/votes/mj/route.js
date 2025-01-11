import { connectToDatabase } from '@/utils/db';
import MJ from '../../../../models/MJ';

export async function GET() {
    await connectToDatabase();
    const mjVote = await MJ.findOne();
    return new Response(
        JSON.stringify({ MichaelJordan: mjVote ? mjVote.votes : 0 }),
        { status: 200 }
    );
}

export async function POST() {
    await connectToDatabase();
    const mjVote = await MJ.findOne();

    if (mjVote) {
        mjVote.votes += 1;
        await mjVote.save();
        return new Response(
            JSON.stringify({
                message: 'Vote counted for Michael Jordan',
                count: mjVote.votes,
            }),
            { status: 200 }
        );
    } else {
        return new Response(
            JSON.stringify({ message: 'Michael Jordan candidate not found' }),
            { status: 400 }
        );
    }
}
