import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as dotenv from 'dotenv';

// Upload the file to blob storage and return the url
const uploadImage = async (file: File) => {
    const supabase = createClientComponentClient();
    // Load environment variables from .env file
    dotenv.config();
    // Now you can access your environment variables using process.env
    const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('images').upload(filePath, file);
    console.log(data)
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    return `${supabaseUrl}/storage/v1/object/public/images/${data.path}`
  }

  // Default export
export default uploadImage;