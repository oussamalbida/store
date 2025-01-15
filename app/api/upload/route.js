import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = Date.now() + '_' + file.name.replace(/\s/g, '_');
    
    // Save to public/uploads directory
    const publicDir = path.join(process.cwd(), 'public', 'uploads');
    await writeFile(path.join(publicDir, filename), buffer);
    
    return NextResponse.json({ 
      success: true,
      path: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: "Error uploading file." }, { status: 500 });
  }
}
