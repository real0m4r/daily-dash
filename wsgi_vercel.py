import os
import sys
from pathlib import Path

# Add the project directory to the sys.path
base_dir = Path(__file__).resolve().parent
sys.path.append(str(base_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DailyAll.settings')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

# Vercel handler
app = application
