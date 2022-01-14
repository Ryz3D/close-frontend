@echo off
IF "%CLOSED_PATH%"=="" (
    ECHO Set the environment variable CLOSED_PATH
) ELSE (
    RMDIR %CLOSED_PATH%\setup\addons\close /s /q
    md %CLOSED_PATH%\setup\addons\close
    Xcopy /E build %CLOSED_PATH%\setup\addons\close
)
