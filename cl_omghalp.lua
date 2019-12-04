local visible = false
function toggleVisible()
    visible = not visible
    SendNUIMessage({
        type = "visible",
        visible = visible,
        myname = GetCurrentResourceName(),
    })
    SetNuiFocus(visible, visible)
end
RegisterCommand(Config.Command, function(source, args, raw)
    toggleVisible()
end)
RegisterNUICallback('helpVisible', function(data,cb)
    visible = data.visible
    SetNuiFocus(visible, visible)
    cb()
end)

function getChapter(filename)
    local data = LoadResourceFile(GetCurrentResourceName(),'chapters/' .. filename)
    if data then
        while string.match(data,"{%d+}") do
            local number = tonumber(string.match(data,"{(%d+)}"))
            local bind = pBindString(0,number)
            data = string.gsub(data,"{" .. number .. "}", '<span class="hotkey">'..bind..'</span>')
            print(number)
        end
    end
    return data
end

RegisterNUICallback('loadChapter', function(data, cb)
    print('Chapter file: ' .. tostring(data.file))
    if data.file then
        local filename = string.gsub(data.file,"^#","")
        local data = getChapter(filename)
        if data then
            cb({setCurrent=filename,markdown=data})
        else
            cb({markdown='Could not find chapter ' .. filename})
        end
    end
end)
AddEventHandler('onResourceStop',function(resourceName)
    if resourceName == GetCurrentResourceName() then
        if visible then
            SetNuiFocus(false, false);
        end
    end
end)
RegisterNetEvent('omghalp:chapter-list')
AddEventHandler ('omghalp:chapter-list', function(chapters)
    for i,chapter in ipairs(chapters) do
        local name = string.gsub(chapter,"^[0-9]+_?", "");
        name = string.gsub(name,"_", " ");
        name = string.gsub(name,".[mM][dD]$","");
        SendNUIMessage({
            type = "addChapter",
            filename = chapter,
            text = name,
        })
    end
    if Config.CoverPage then
        print('There is a cover page!')
        SendNUIMessage({
            type = "setChapter",
            setCurrent = Config.CoverPage,
            markdown = getChapter(Config.CoverPage),
        })
    end
end)

Citizen.CreateThread(function()
    local ready = false
    local needed = true
    while needed do
        if ready then
            if IsControlJustPressed(0, Config.Hotkey) then
                toggleVisible()
            end
            Citizen.Wait(0)
        else
            if NetworkIsSessionStarted() then
                TriggerServerEvent('omghalp:chapter-list')
                ready = true
                if not Config.Hotkey then
                    needed = false
                end
            end
            Citizen.Wait(1000)
        end
    end
end)