echo "Pulling latest changes from github repository..."

# public repo
# git pull origin https://github.com/WTMSI/backend-watatrip-dashboard.git

# pivater repo
git remote set-url origin git@github.com:WTMSI/backend-watatrip-dashboard.git

echo "Installing dependencies..."
npm install

echo "Restarting PM2 process..."
pm2 restart watatripAdminBackend