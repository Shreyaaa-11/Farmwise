import { supabase } from "../integrations/supabase/client";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  rentalPrice: number;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Equipment API
export const getEquipment = async (): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*');
    
    if (error) throw error;

    // Transform the data to match the original Equipment interface
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: Number(item.price),
      rentalPrice: Number(item.rental_price),
      category: item.category,
      image: item.image || '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png', // Default image
      inStock: item.in_stock,
      featured: item.featured
    }));
  } catch (error) {
    console.error('Error fetching equipment:', error);
    // Fallback to the original mock data (you might want to remove this in production)
    return getMockEquipment();
  }
};

export const getEquipmentById = async (id: string): Promise<Equipment | undefined> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) return undefined;

    // Transform to match the Equipment interface
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      rentalPrice: Number(data.rental_price),
      category: data.category,
      image: data.image || '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png',
      inStock: data.in_stock,
      featured: data.featured
    };
  } catch (error) {
    console.error('Error fetching equipment by ID:', error);
    // Fallback to mock data
    const mockData = await getMockEquipment();
    return mockData.find(item => item.id === id);
  }
};

export const getEquipmentByCategory = async (category: string): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('category', category);
    
    if (error) throw error;

    // Transform to match the Equipment interface
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: Number(item.price),
      rentalPrice: Number(item.rental_price),
      category: item.category,
      image: item.image || '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png',
      inStock: item.in_stock,
      featured: item.featured
    }));
  } catch (error) {
    console.error('Error fetching equipment by category:', error);
    // Fallback to mock data
    const mockData = await getMockEquipment();
    return mockData.filter(item => item.category === category);
  }
};

export const getFeaturedEquipment = async (): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('featured', true);
    
    if (error) throw error;

    // Transform to match the Equipment interface
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: Number(item.price),
      rentalPrice: Number(item.rental_price),
      category: item.category,
      image: item.image || '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png',
      inStock: item.in_stock,
      featured: item.featured
    }));
  } catch (error) {
    console.error('Error fetching featured equipment:', error);
    // Fallback to mock data
    const mockData = await getMockEquipment();
    return mockData.filter(item => item.featured);
  }
};

// User API
export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) return undefined;

    // Get user auth data
    const { data: authData } = await supabase.auth.admin.getUserById(id);
    
    // Transform to match the User interface
    return {
      id: data.id,
      name: data.full_name || '',
      email: authData?.user?.email || '',
      phone: data.phone || '',
      address: data.address || ''
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    // Fallback to mock data
    return {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com'
    };
  }
};

// Helper function to get mock equipment data for fallback
const getMockEquipment = async (): Promise<Equipment[]> => {
  // This is the original mock data that was in this file
  return [
    {
      id: '1',
      name: 'John Deere 5050D Tractor',
      description: 'A powerful 50 HP tractor perfect for medium to large farms. Features a durable design and excellent fuel efficiency.',
      price: 780000,
      rentalPrice: 1200,
      category: 'tractors',
      image: '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png',
      inStock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Mahindra 475 DI Tractor',
      description: '42 HP tractor with excellent performance for various farming applications. Comes with power steering and adjustable seat.',
      price: 650000,
      rentalPrice: 1000,
      category: 'tractors',
      image: '/lovable-uploads/fb2a6eac-1728-47ad-bbfe-3b0f60627495.png',
      inStock: true
    },
    {
      id: '3',
      name: 'Sonalika Disc Harrow',
      description: '16-disc heavy-duty harrow for effective soil preparation. Adjustable angle for different soil conditions.',
      price: 85000,
      rentalPrice: 500,
      category: 'tillageEquipment',
      image: '/lovable-uploads/79b698fb-fc19-494d-b398-4770d1bd0f11.png',
      inStock: true,
      featured: true
    },
    {
      id: '4',
      name: 'VST Shakti Power Weeder',
      description: 'Efficient power weeder for weed control in row crops. Reduces labor costs and improves crop yield.',
      price: 45000,
      rentalPrice: 300,
      category: 'tillageEquipment',
      image: '/lovable-uploads/79b698fb-fc19-494d-b398-4770d1bd0f11.png',
      inStock: true
    },
    {
      id: '5',
      name: 'Kubota Rice Transplanter',
      description: '4-row rice transplanter with high accuracy and speed. Perfect for small to medium rice farms.',
      price: 250000,
      rentalPrice: 1500,
      category: 'seedingEquipment',
      image: '/lovable-uploads/085190d0-91b4-4f9c-8670-0d32aba37dc2.png',
      inStock: true,
      featured: true
    },
    {
      id: '6',
      name: 'Kisan Kraft Seed Drill',
      description: 'Multi-crop seed drill suitable for various seeds. Ensures uniform seed placement and optimal germination.',
      price: 70000,
      rentalPrice: 600,
      category: 'seedingEquipment',
      image: '/lovable-uploads/085190d0-91b4-4f9c-8670-0d32aba37dc2.png',
      inStock: true
    },
    {
      id: '7',
      name: 'TAFE Riding Lawn Mower',
      description: 'Efficient riding mower for landscape maintenance. Features adjustable cutting height and comfortable seat.',
      price: 120000,
      rentalPrice: 800,
      category: 'landscapeEquipment',
      image: '/lovable-uploads/5da313d0-221b-4fde-b53b-145691f7b01c.png',
      inStock: true
    },
    {
      id: '8',
      name: 'Honda Brush Cutter',
      description: 'Powerful brush cutter for clearing tough vegetation. Comes with multiple attachments for versatile use.',
      price: 18000,
      rentalPrice: 200,
      category: 'landscapeEquipment',
      image: '/lovable-uploads/5da313d0-221b-4fde-b53b-145691f7b01c.png',
      inStock: true,
      featured: true
    },
    {
      id: '9',
      name: 'Aspee Tractor Sprayer',
      description: 'High-capacity tractor-mounted sprayer for efficient pest control. Features adjustable nozzles and pressure control.',
      price: 45000,
      rentalPrice: 400,
      category: 'cropProtection',
      image: '/lovable-uploads/085190d0-91b4-4f9c-8670-0d32aba37dc2.png',
      inStock: true
    },
    {
      id: '10',
      name: 'Tirth Agro Rotavator',
      description: 'Heavy-duty rotavator for effective soil preparation. Suitable for various soil types and conditions.',
      price: 95000,
      rentalPrice: 700,
      category: 'tillageEquipment',
      image: '/lovable-uploads/79b698fb-fc19-494d-b398-4770d1bd0f11.png',
      inStock: true
    },
    {
      id: '11',
      name: 'Claas Crop Tiger Harvester',
      description: 'Compact and efficient combine harvester for wheat, rice, and other crops. Reduces harvest time significantly.',
      price: 1500000,
      rentalPrice: 3000,
      category: 'harvestEquipment',
      image: '/lovable-uploads/085190d0-91b4-4f9c-8670-0d32aba37dc2.png',
      inStock: true,
      featured: true
    },
    {
      id: '12',
      name: 'Kartar Tractor Trailer',
      description: 'Durable hydraulic trailer for efficient transport of farm produce. Features tipping mechanism for easy unloading.',
      price: 120000,
      rentalPrice: 500,
      category: 'haulage',
      image: '/lovable-uploads/079b698fb-fc19-494d-b398-4770d1bd0f11.png',
      inStock: true
    }
  ];
};

// Add a function to seed the database with mock data
export const seedEquipmentData = async (): Promise<void> => {
  try {
    // Check if data already exists
    const { count, error: countError } = await supabase
      .from('equipment')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // If data already exists, don't seed
    if (count && count > 0) {
      console.log('Database already has equipment data, skipping seed');
      return;
    }
    
    // Get mock data to seed
    const mockData = await getMockEquipment();
    
    // Transform to match database schema
    const dbData = mockData.map(item => ({
      name: item.name,
      description: item.description,
      price: item.price,
      rental_price: item.rentalPrice,
      category: item.category,
      image: item.image,
      in_stock: item.inStock,
      featured: item.featured
    }));
    
    // Insert data
    const { error } = await supabase
      .from('equipment')
      .insert(dbData);
    
    if (error) throw error;
    
    console.log('Equipment data seeded successfully');
  } catch (error) {
    console.error('Error seeding equipment data:', error);
  }
};

// Call seedEquipmentData on initial load
seedEquipmentData();
