import { GenAICode } from "@/configs/AIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json()
    try {
        const result = await GenAICode(prompt)
        const aiResp = result

        return NextResponse.json({ result: aiResp })
    } catch (error) {
        return NextResponse.json({ error })

    }
}