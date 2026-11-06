@echo off
cd /d "%~dp0"
if not exist .venv\Scripts\python.exe py -3.12 -m venv .venv
if errorlevel 1 goto failed
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 goto failed
.venv\Scripts\python.exe -m streamlit run app.py --server.address 127.0.0.1 --server.headless false
if errorlevel 1 goto failed
exit /b 0
:failed
echo Setup failed. Python 3.12 and network access are required.
pause
exit /b 1
