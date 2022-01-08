@echo off
IF "%CLOSED_PATH%"=="" (
    ECHO Set the environment variable CLOSED_PATH
) ELSE (
    RMDIR %CLOSED_PATH%\addons\close\public /s /q
    md %CLOSED_PATH%\addons\close\public
    Xcopy /E build %CLOSED_PATH%\addons\close\public
)
