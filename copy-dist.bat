@echo off
setlocal

set "SOURCE_DIR=../Card3D/card-3d/dist"
set "TARGET_DIR=src\components"

if exist "%TARGET_DIR%" (
    rmdir /s /q "%TARGET_DIR%"
    if errorlevel 1 (
        echo Error removing the "components" folder. Please check your permissions.
        exit /b 1
    ) else (
        echo "components" folder removed.
    )
) else (
    echo The "components" folder did not exist, proceeding...
)

xcopy /E /I /Y "%SOURCE_DIR%" "%TARGET_DIR%"
if errorlevel 1 (
    echo Error copying the folder. Please check if the source directory exists.
    exit /b 1
) else (
    echo Folder copied and renamed to "components".
)

call react-scripts start
if errorlevel 1 (
    echo Error starting the React application.
    exit /b 1
)

endlocal
