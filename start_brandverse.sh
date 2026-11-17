#!/usr/bin/env bash
# ==============================================================================
# BRANDVERSE - Fast Startup Script
# Starts PostgreSQL (Port 5433), Django REST API (Port 8001), and Vite (Port 5174)
# ==============================================================================
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=== 1. Starting PostgreSQL on Port 5433 ==="
if ! /usr/lib/postgresql/17/bin/pg_isready -p 5433 >/dev/null 2>&1; then
    /usr/lib/postgresql/17/bin/pg_ctl -D "$DIR/db_data" -l "$DIR/db_data/logfile" start
    echo "PostgreSQL started on port 5433."
else
    echo "PostgreSQL is already running on port 5433."
fi

echo ""
echo "=== 2. Starting Django Backend Server on Port 8001 ==="
source "$DIR/backend/venv/bin/activate"
python "$DIR/backend/manage.py migrate" >/dev/null
python "$DIR/backend/manage.py runserver 0.0.0.0:8001 &"
BACKEND_PID=$!
echo "Backend running on http://127.0.0.1:8001 (PID: $BACKEND_PID)"

echo ""
echo "=== 3. Starting Frontend Server on Port 5174 ==="
cd "$DIR/frontend"
npx vite --port 5174 --host
