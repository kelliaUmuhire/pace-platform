import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role, institution, country, preferredLanguage } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      institution,
      country,
      preferredLanguage: preferredLanguage || 'en',
    });

    // Remove password from response
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      institution: user.institution,
      country: user.country,
      preferredLanguage: user.preferredLanguage,
    };

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Only allow admins to access this endpoint
    // This would be handled by middleware in a real app
    
    const users = await User.find({}).select('-password');
    
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users', error: error.message },
      { status: 500 }
    );
  }
}