@echo off
start powershell -Command "& {cd 'C:\wamp64\www\gutenberg\wp-content\plugins\bergall-wp-blocks'; npm start;}"
timeout /t 2 /nobreak >nul
start powershell -Command "& {cd 'C:\wamp64\www\gutenberg\wp-content\plugins\bergall-wp-blocks'; git status; powershell}"
