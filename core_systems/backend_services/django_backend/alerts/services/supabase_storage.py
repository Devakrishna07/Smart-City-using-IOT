# alerts/services/supabase_storage.py

import os
from supabase import create_client, Client
from datetime import datetime
import uuid

SUPABASE_URL = os.getenv("supabase_url")
SUPABASE_KEY = os.getenv("supabase_key")
SUPABASE_BUCKET = os.getenv("supabase_bucket", "accident_videos")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def upload_video_to_supabase(file_obj, filename=None):
    """
    Uploads video file to Supabase Storage and returns public URL
    """

    if not filename:
        ext = file_obj.name.split('.')[-1]
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex}.{ext}"

    file_path = f"uploads/{filename}"

    try:
        # Upload file
        response = supabase.storage.from_(SUPABASE_BUCKET).upload(
            file_path,
            file_obj.read(),
            {"content-type": file_obj.content_type}
        )

        # Get public URL
        public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_path)

        return public_url

    except Exception as e:
        raise Exception(f"Supabase upload failed: {str(e)}")