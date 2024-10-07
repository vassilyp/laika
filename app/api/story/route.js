export function GET() {
    const data =  JSON.stringify({ text: 'Hello' });
    return Response.json(data)
}
