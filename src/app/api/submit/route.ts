import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { TableData } from '../../../types/index';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const data: TableData = await request.json();
    
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    // Insert the data into your Supabase table
    // Replace 'your_table_name' with your actual Supabase table name
    const { data: result, error } = await supabase
      .from('UPA Line')
      .insert([data]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Data submitted successfully',
      data: result
    }, { status: 200 });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}