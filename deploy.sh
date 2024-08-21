
echo "Pulling latest changes from github repository..."
git pull origin https://github.com/WTMSI/backend-watatrip-dashboard.git

echo "Installing dependencies..."
npm install

echo "Restarting PM2 process..."
pm2 restart watatripAdminBackend