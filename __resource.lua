resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'
description "Demonen's help text script for FiveM"

client_scripts {'config.lua','bindstring.lua','cl_omghalp.lua'}
server_script 'sv_omghalp.js'

ui_page 'NUI/index.html'

files {
    'NUI/*',
    'chapters/*.md',
}