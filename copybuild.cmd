@echo off
IF "%CLOSED_PATH%"=="" (
    ECHO Set the environment variable CLOSED_PATH
) ELSE (
    RMDIR %CLOSED_PATH%\addons\close /s /q
    md %CLOSED_PATH%\addons\close
    Xcopy /E build %CLOSED_PATH%\addons\close
)
