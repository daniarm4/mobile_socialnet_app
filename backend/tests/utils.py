from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image


def get_image(id: int):
        bts = BytesIO()
        img = Image.new("RGB", (100, 100))
        img.save(bts, 'jpeg')
        return SimpleUploadedFile(f"test_image{id}.jpg", bts.getvalue())
